import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";

const Patients = () => {
    const [selectedForm, setSelectedForm] = useState('cardiac');
    const [notiData, setNotiData] = useState([]);
    const [recData, setRecData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
        (window.innerWidth < 800) ? true : false
    ]);

    useEffect(() => {
        let url = "http://localhost:8080/notifications";
        fetch(url)
        .then((response) => {
            response.json()
            .then((result) => {
                console.log(result);
                setNotiData(result);
                localStorage.setItem("notiData", JSON.stringify(result));
            })
        })
        .catch((error) => {
            let collection = localStorage.getItem("notiData");
            setNotiData(JSON.parse(collection));
        });

        let url2 = "http://localhost:8080/recommendations";
        fetch(url2)
        .then((response) => {
            response.json()
            .then((result) => {
                console.log(result);
                setRecData(result);
                localStorage.setItem("recData", JSON.stringify(result));
            })
        })
        .catch((error) => {
            let collection = localStorage.getItem("recData");
            setRecData(JSON.parse(collection));
        });

        const handleWindowResize = () => {
            var mobile = false
            if (window.innerWidth <= 800) {
                mobile = true;
            }
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
                <div className="d-flex flex-column shadow p-3 rounded">
                    <h2 className="align-self-start">Patient Details</h2>
                    <div className="d-flex mt-4 bg-white p-5 pt-4 p-md-4 pb-2 justify-content-evenly flex-wrap gap-y-3 gap-md-5 rounded">
                        <div className="d-flex flex-column">
                            <h4>Name:</h4>
                            <p className="info">John Doe</p>
                        </div>
                        <div className="d-flex flex-column">
                            <h4>Age:</h4>
                            <p className="info">30</p>
                        </div>
                        <div className="d-flex flex-column">
                            <h4>Gender:</h4>
                            <p className="info">Male</p>
                        </div>
                        <div className="d-flex flex-column">
                            <h4>Height:</h4>
                            <p className="info">180 cm</p>
                        </div>
                        <div className="d-flex flex-column">
                            <h4>Weight:</h4>
                            <p className="info">75 kg</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center justify-content-md-start">
                        {(selectedForm === 'cardiac') &&
                        <Link to="/cardiac-form">
                            <button className="mt-3 d-flex bg-success rounded create-butt justify-content-between">
                                <span className="create">Create Report</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="text-white"
                                >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </Link>
                        }
                        {(selectedForm === 'ortho') &&
                        <Link to="/ortho-form">
                            <button className="mt-3 d-flex bg-success rounded create-butt justify-content-between">
                                <span className="create">Create Report</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="text-white"
                                >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </Link>
                        }
                        {(selectedForm === 'gastro') &&
                        <Link to="/gastro-form">
                            <button className="mt-3 d-flex bg-success rounded create-butt justify-content-between">
                                <span className="create">Create Report</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="text-white"
                                >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </Link>
                        }
                        {(selectedForm === 'gen') &&
                        <Link to="/gen-form">
                            <button className="mt-3 d-flex bg-success rounded create-butt justify-content-between">
                                <span className="create">Create Report</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="text-white"
                                >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </Link>
                        }
                    </div>
                </div>

                <div className="mt-3 d-flex flex-column flex-md-row gap-5">
                    <div className="shadow flex-fill p-3 rounded bg-light">
                        <h1>Notifications</h1>
                        <hr/>
                        {notiData && notiData.length > 0 ? (
                            notiData.map((item, key) => (
                                <div className="" key={key}>
                                    {item.message}
                                </div>
                            ))
                        ) : (
                            <p>No notifications available</p>
                        )}
                    </div>
                    <div className="shadow flex-fill p-3 mb-5 rounded bg-light">
                        <h1>Doctor's Recommendation</h1>
                        <hr/>
                        {/* Doctor's recommendation content */}
                        {recData && recData.length > 0 ? (
                            recData.map((item, key) => (
                                <div className="" key={key}>
                                    {item.message}
                                </div>
                            ))
                        ) : (
                            <p>No recommendation available</p>
                        )}
                    </div>
                </div>
            </div>
          </div>
        </div>
    )
}

export default Patients;
