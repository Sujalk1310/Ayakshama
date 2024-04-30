import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";
import { Card } from 'react-bootstrap';
import Dictaphone from "./Speech";
import axios from 'axios'; // Import axios here

const Doctors = () => {
    const [selectedForm, setSelectedForm] = useState('cardiac');
    const [orthoData, setOrthoData] = useState([]);
    const [Data, setVoiceData] = useState();
    const [gastroData, setGastroData] = useState([]);
    const [genData, setGenData] = useState([]);
    const [heartData, setHeartData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [aiBox, setAIBox] = useState('');
    const [message, setMessage] = useState('');
    const [viewToggle, setViewToggle] = useState(false);
    const [ind, setInd] = useState(null);
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
        window.innerWidth < 800
    ]);

    const handleViewHeart = (index) => {
        setInd(index);
        setViewToggle(true);
        setAIBox('');
        const selectedHeartData = heartData[index]; // Get the selected heart data
        const keysToExtract = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'];
        var values_list = keysToExtract.map(key => {
            const value = selectedHeartData[key];
            return value !== undefined ? value : 100;
          });
        console.log(values_list);
        axios.post("http://localhost:5000/heart-ai", {"data": values_list}) // Send the selected heart data to the server
            .then((response) => {
                setAIBox(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching AI response:', error);
            });
    };

    const handleViewOrtho = (index) => {
        setInd(index);
        setViewToggle(true);
        setAIBox('');
        const selectedOrthoData = orthoData[index];
        const data = {
            "desc": selectedOrthoData.desc,
            "img": selectedOrthoData.img
        };
        console.log(data);
        axios.post("http://localhost:5000/ortho-ai", {"data": data})
            .then((response) => {
                setAIBox(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching AI response:', error);
            });
    };

    const handleViewGastro = (index) => {
        setInd(index);
        setViewToggle(true);
        setAIBox('');
        const selectedGastroData = gastroData[index]; // Get the selected heart data
        console.log(encodeURIComponent(selectedGastroData.desc));
        axios.get(`http://localhost:5000/llm?q=${encodeURIComponent(selectedGastroData.desc)}`) // Send the selected heart data to the server
            .then((response) => {
                console.log(response.data.data);
                setAIBox(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching AI response:', error);
            });
    };

    const handleViewGen = (index) => {
        setInd(index);
        setViewToggle(true);
        setAIBox('');
        const selectedGenData = genData[index]; // Get the selected heart data
        console.log(encodeURIComponent(selectedGenData.desc));
        axios.get(`http://localhost:5000/llm?q=${encodeURIComponent(selectedGenData.desc)}`) // Send the selected heart data to the server
            .then((response) => {
                console.log(response.data.data);
                setAIBox(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching AI response:', error);
            });
    };

    const notify = () => {
        axios.post("http://localhost:8080/notifications", {"message": message})
            .then((response) => {
                console.log("done");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const recommend = () => {
        axios.post("http://localhost:8080/recommendations", {"message": message})
            .then((response) => {
                console.log("done");
            })
            .catch((error) => {
                console.error('Error fetching recommendation:', error);
            });
    }

    useEffect(() => {
        let url = "http://localhost:8080/heart";
        axios.get(url)
            .then((response) => {
                setHeartData(response.data);
                localStorage.setItem("heartData", JSON.stringify(response.data));
            })
            .catch((error) => {
                let collection = localStorage.getItem("heartData");
                setHeartData(JSON.parse(collection));
            });

            let url2 = "http://localhost:8080/ortho";
            axios.get(url2)
                .then((response) => {
                    setOrthoData(response.data);
                    localStorage.setItem("orthoData", JSON.stringify(response.data));
                })
                .catch((error) => {
                    let collection = localStorage.getItem("orthoData");
                    setOrthoData(JSON.parse(collection));
                });

                let url3 = "http://localhost:8080/gastro";
                axios.get(url3)
                    .then((response) => {
                        setGastroData(response.data);
                        localStorage.setItem("gastroData", JSON.stringify(response.data));
                    })
                    .catch((error) => {
                        let collection = localStorage.getItem("gastroData");
                        setGastroData(JSON.parse(collection));
                    });

                    let url4 = "http://localhost:8080/general";
                    axios.get(url4)
                        .then((response) => {
                            setGenData(response.data);
                            localStorage.setItem("genData", JSON.stringify(response.data));
                        })
                        .catch((error) => {
                            let collection = localStorage.getItem("genData");
                            setGenData(JSON.parse(collection));
                        });

        const handleWindowResize = () => {
            const mobile = window.innerWidth <= 800;
            setWindowSize([window.innerWidth, window.innerHeight, mobile]);
        };
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <div className='d-flex' style={{ height: "100vh" }}>
            <Sidebar mobile={windowSize[2]} selectedForm={selectedForm} setSelectedForm={setSelectedForm} toggle={toggle} setToggle={setToggle} />
            <div className='position-absolute' style={{ display: toggle ? "block" : "none", height: "100vh", width: "100vw", opacity: "0.7", backgroundColor: "black"}}></div>
            <div id="mainboard" className='flex-grow-1 d-flex flex-column'>
                <nav id="nav" className={`w-100 ${windowSize[2] ? "d-flex align-items-center" : "d-none"}`}>
                    <button
                        className="text-white btn d-flex align-items-center"
                        style={{ borderRadius: "0" }}
                        onClick={() => { if (windowSize[2]) setToggle(!toggle)}}
                    >
                        <GiHamburgerMenu />
                    </button>
                    <span className="vr text-white"></span>
                    <span className='mx-3 text-white d-flex flex-grow-1 justify-content-between align-items-center'>
                        <span>अयक्ष्म</span>
                    </span>
                </nav>
                <div id="whiteboard" className='h-100 d-flex flex-column position-relative'>
                    {selectedForm === 'cardiac' && heartData && heartData.length > 0 && (
                        heartData.map((item, index) => (
                            <Card key={index} className="m-2">
                                <Card.Body>
                                    <Card.Title>Cardiac Data #{index + 1}</Card.Title>
                                    <Card.Text className="d-flex gap-4 justify-content-evenly">
                                        <p>Age: {item.age}</p>
                                        <p>Sex: {item.sex}</p>
                                        <p>CP: {item.cp}</p>
                                        <p>trestbps: {item.trestbps}</p>
                                        <p>chol: {item.chol}</p>
                                        <p>fbs: {item.fbs}</p>
                                        <p>restecg: {item.restecg}</p>
                                        <p>thalach: {item.thalach}</p>
                                        <p>exang: {item.exang}</p>
                                        <p>oldpeak: {item.oldpeak}</p>
                                        <p>slope: {item.slope}</p>
                                        <p>ca: {item.ca}</p>
                                        <p>thal: {item.thal}</p>
                                        <button onClick={() => handleViewHeart(index)}>View</button>
                                    </Card.Text>
                                    {viewToggle && ind === index && (
                                        <>
                                            <Card.Text>{aiBox}</Card.Text>
                                            <input type="text" className="form-control" value={Data} onChange={(e) => setMessage(e.target.value)} name="message" />
                                            <button onClick={notify}>Notify</button>
                                            <button onClick={recommend}>Recommend</button>
                                            <Dictaphone Data={Data} setVoiceData={setVoiceData} />
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        ))
                    )}
                    {selectedForm === 'ortho' && orthoData && orthoData.length > 0 && (
                        orthoData.map((item, index) => (
                            <Card key={index} className="m-2">
                                <Card.Body>
                                    <Card.Title>Ortho Data #{index + 1}</Card.Title>
                                    <Card.Text className="d-flex gap-4 justify-content-evenly">
                                        <p>Description: {item.desc}</p>
                                        <p>Img URL: {item.img}</p>
                                        <button onClick={() => handleViewOrtho(index)}>View</button>
                                    </Card.Text>
                                    {viewToggle && ind === index && (
                                        <>
                                            <Card.Text>{aiBox}</Card.Text>
                                            <input type="text" className="form-control" value={Data} onChange={(e) => setMessage(e.target.value)} name="message" />
                                            <button onClick={notify}>Notify</button>
                                            <button onClick={recommend}>Recommend</button>
                                            <Dictaphone Data={Data} setVoiceData={setVoiceData} />
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        ))
                    )}
                    {selectedForm === 'gastro' && gastroData && gastroData.length > 0 && (
                        gastroData.map((item, index) => (
                            <Card key={index} className="m-2">
                                <Card.Body>
                                    <Card.Title>Gastro Data #{index + 1}</Card.Title>
                                    <Card.Text className="d-flex gap-4 justify-content-evenly">
                                        <p>Description: {item.desc}</p>
                                        <button onClick={() => handleViewGastro(index)}>View</button>
                                    </Card.Text>
                                    {viewToggle && ind === index && (
                                        <>
                                            <Card.Text>{aiBox}</Card.Text>
                                            <input type="text" className="form-control" value={Data} onChange={(e) => setMessage(e.target.value)} name="message" />
                                            <button onClick={notify}>Notify</button>
                                            <button onClick={recommend}>Recommend</button>
                                            <Dictaphone Data={Data} setVoiceData={setVoiceData} />
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        ))
                    )}
                    {selectedForm === 'gen' && genData && genData.length > 0 && (
                        genData.map((item, index) => (
                            <Card key={index} className="m-2">
                                <Card.Body>
                                    <Card.Title>General Data #{index + 1}</Card.Title>
                                    <Card.Text className="d-flex gap-4 justify-content-evenly">
                                        <p>Description: {item.desc}</p>
                                        <button onClick={() => handleViewGen(index)}>View</button>
                                    </Card.Text>
                                    {viewToggle && ind === index && (
                                        <>
                                            <Card.Text>{aiBox}</Card.Text>
                                            <input type="text" className="form-control" value={Data} onChange={(e) => setMessage(e.target.value)} name="message" />
                                            <button onClick={notify}>Notify</button>
                                            <button onClick={recommend}>Recommend</button>
                                            <Dictaphone Data={Data} setVoiceData={setVoiceData} />
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Doctors;
