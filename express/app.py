from flask import Flask, request
from keras.models import load_model
from flask_cors import CORS
import keras
from tensorflow.keras.preprocessing import image
import tensorflow
import numpy as np
from joblib import load
import os
import google.generativeai as genai

os.environ['GOOGLE_API_KEY'] = "AIzaSyDqwCJlVvtYjNsq-59W5FA-H4tQO7gBxmc"
genai.configure(api_key = os.environ['GOOGLE_API_KEY'])
model = genai.GenerativeModel('gemini-pro')

genai.configure(api_key = os.environ['GOOGLE_API_KEY'])

model = genai.GenerativeModel('gemini-pro')

def gemini(q):
    return model.generate_content(q)

# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)
CORS(app, origins=['*'])

model2 = load_model("Ortho_Model.h5")
loaded_model = load_model('heart_disease_model.h5')
scaler = load('scaler.joblib')

class_names_dict = {
    0: 'Avulsion fracture',
    1: 'Comminuted fracture',
    2: 'Fracture Dislocation',
    3: 'Greenstick fracture',
    4: 'Hairline Fracture',
    5: 'Impacted fracture',
    6: 'Longitudinal fracture',
    7: 'Oblique fracture',
    8: 'Pathological fracture',
    9: 'Spiral Fracture'
}

def preprocess_test_image(image_path, target_size=(256, 256)):
    img = image.load_img(image_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    return img_array

def predict_image(model, image_path):
    test_image = preprocess_test_image(image_path)
    predictions = model.predict(test_image)
    predicted_class_index = np.argmax(predictions[0])
    predicted_class = class_names_dict[predicted_class_index]
    return predicted_class

def predict_ortho(path):
    test_image_path = path
    predicted_class = predict_image(model2, test_image_path)
    return predicted_class

def predict_heart(data):
    test_input = data
    scaled_test_input = scaler.transform([test_input])
    prediction = loaded_model.predict(scaled_test_input)
    print(f'Predicted Probability of Heart Disease: {prediction[0][0]}')
    if  prediction[0][0] > 0.5: 
        return "There are high chances of heart disease"
    else :
        return "Less risk of heart disease"
 
@app.route('/ortho-ai', methods=['POST'])
def ortho():
    try:
        data = request.json["data"]
        print(data)
        chances = f'There is a lot of chance that the person might be suffering from {predict_ortho(data["img"])}'
        print(chances)
        message = llm2(data["desc"])
        fin = chances + '\n\n' + message
        return {"data": fin}
    except Exception as e:
        print(e)

@app.route('/heart-ai', methods=['POST'])
def heart():
    try:
        data = request.json["data"]
        chances = predict_heart(data)
        return {"data": chances}
    except Exception as e:
        return e

def llm2(q):
    response = gemini(q + "dont use markdown")
    print(response)
    return response.text

@app.route('/llm') 
def llm():
    q = request.args.get('q')
    print(q)
    response = gemini(q + "dont use markdown")
    print(response)
    return {"data": response.text}
 
# main driver function
if __name__ == '__main__':
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run()
