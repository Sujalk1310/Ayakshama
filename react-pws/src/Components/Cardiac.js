import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cardiac = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    age: '',
    sex: '1', // Male: 1, Female: 0
    cp: '0', // Low: 0, Moderate: 1, High: 2, Very High: 3
    trestbps: '',
    chol: '',
    fbs: '0', // False: 0, True: 1
    restecg: '0',
    thalach: '',
    exang: '0', // False: 0, True: 1
    oldpeak: '',
    slope: '0',
    ca: '0',
    thal: '0', // Normal: 0, Fixed Defect: 1, Reversible Defect: 2
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const convertedData = {};
        for (let [key, value] of Object.entries(formData)) {
            convertedData[key] = Number(value);
        }
        const response = await axios.post('http://localhost:8080/heart', convertedData);
        console.log(response.data);
        navigate("/patients");
    } catch (error) {
        console.error(error);
    }
};

  return (
    <div className="background d-flex mt-4 justify-content-center align-items-center h-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Header>
                <h3 className="text-center">Cardiac Disease Report Form</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="sex">
                    <Form.Label>Sex</Form.Label>
                    <Form.Control
                      as="select"
                      name="sex"
                      value={formData.sex}
                      onChange={handleChange}
                      required
                    >
                      <option value="1">Male</option>
                      <option value="0">Female</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="cp">
                    <Form.Label>Chest Pain Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="cp"
                      value={formData.cp}
                      onChange={handleChange}
                      required
                    >
                      <option value="0">Low</option>
                      <option value="1">Moderate</option>
                      <option value="2">High</option>
                      <option value="3">Very High</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="trestbps">
                    <Form.Label>Resting Blood Pressure</Form.Label>
                    <Form.Control
                      type="number"
                      name="trestbps"
                      value={formData.trestbps}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="chol">
                    <Form.Label>Serum Cholestoral (mg/dl)</Form.Label>
                    <Form.Control
                      type="number"
                      name="chol"
                      value={formData.chol}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="fbs">
                    <Form.Label>Fasting Blood Sugar greater than 120 mg/dl</Form.Label>
                    <Form.Control
                      as="select"
                      name="fbs"
                      value={formData.fbs}
                      onChange={handleChange}
                      required
                    >
                      <option value="0">False</option>
                      <option value="1">True</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="restecg">
                    <Form.Label>Resting Electrocardiographic Results</Form.Label>
                    <Form.Control
                      as="select"
                      name="restecg"
                      value={formData.restecg}
                      onChange={handleChange}
                      required
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="thalach">
                    <Form.Label>Maximum Heart Rate Achieved</Form.Label>
                    <Form.Control
                      type="number"
                      name="thalach"
                      value={formData.thalach}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="exang">
                    <Form.Label>Exercise Induced Angina</Form.Label>
                    <Form.Control
                      as="select"
                      name="exang"
                      value={formData.exang}
                      onChange={handleChange}
                      required
                    >
                      <option value="0">False</option>
                      <option value="1">True</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="oldpeak">
                    <Form.Label>Oldpeak</Form.Label>
                    <Form.Control
                      type="number"
                      name="oldpeak"
                      value={formData.oldpeak}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="slope">
                    <Form.Label>Slope</Form.Label>
                    <Form.Control
                      as="select"
                      name="slope"
                      value={formData.slope}
                      onChange={handleChange}
                      required
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="ca">
                    <Form.Label>CA</Form.Label>
                    <Form.Control
                      as="select"
                      name="ca"
                      value={formData.ca}
                      onChange={handleChange}
                      required
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="thal">
                    <Form.Label>Thal</Form.Label>
                    <Form.Control
                      as="select"
                      name="thal"
                      value={formData.thal}
                      onChange={handleChange}
                      required
                    >
                      <option value="0">Normal</option>
                      <option value="1">Fixed Defect</option>
                      <option value="2">Reversible Defect</option>
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100 mt-3">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cardiac;
