import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col text-center">
                    <h1>Welcome to Ayakshma</h1>
                </div>
                <div className="row mt-5">
                    <div className="col text-center">
                    <Link to="/patients" style={{fontSize: "32px"}} className="btn btn-primary m-2">
                        Patient
                    </Link>
                    <Link to="/doctors" style={{fontSize: "32px"}} className="btn btn-success m-2">
                        Doctor
                    </Link>
                    </div>
              </div>
            </div>
        </div>
    )
}

export default Home;