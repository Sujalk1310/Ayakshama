// Sidebar.js
import React, { useEffect } from 'react';
import { PiHeartbeatFill } from "react-icons/pi";
import { GiStomach } from "react-icons/gi";
import { LiaBoneSolid } from "react-icons/lia";
import { TiPlus } from "react-icons/ti";
import { IoCloseCircleOutline } from "react-icons/io5";

const Sidebar = ({ mobile, toggle, selectedForm, setSelectedForm, setToggle }) => {

  useEffect(() => { 
  }, [])

  const sidebarStyle = {
    width: '250px',
    height: '100vh',
    zIndex: "999999",
    position: mobile ? "absolute" : "",
    transform: mobile ? (toggle ? "translateX(0px)" : "translateX(-250px)") : "none",
    backgroundColor: '#4455b8',
    color: 'white',
    padding: '20px 0 10px 0',
    transition: 'transform 0.3s cubic-bezier(0.215, 0.610, 0.355, 1)',
  };

  return (
  <>
      <div id={mobile ? (toggle ? 'sidebar' : '') : 'sidebar'} className="d-flex flex-column" style={sidebarStyle}> 
        <div>
          <h3 className='mx-auto'>अयक्ष्म</h3>
          <hr className='mx-3 mb-1' style={{ borderTop: "2px solid white" }} />
          <div className='d-flex flex-column justify-content-center align-item-center'>
            <button className={`butt-nav ${selectedForm === 'cardiac' ? 'butt-selected' : ''}`} onClick={() => setSelectedForm('cardiac')}><PiHeartbeatFill /> Cardiac</button>
            <button className={`butt-nav ${selectedForm === 'ortho' ? 'butt-selected' : ''}`} onClick={() => setSelectedForm('ortho')}><LiaBoneSolid /> Orthopaedic</button>
            <button className={`butt-nav ${selectedForm === 'gastro' ? 'butt-selected' : ''}`} onClick={() => setSelectedForm('gastro')}><GiStomach /> Gastro</button>
            <button className={`butt-nav ${selectedForm === 'gen' ? 'butt-selected' : ''}`} onClick={() => setSelectedForm('gen')}><TiPlus /> General</button>
          </div>
          <span onClick={() => {setToggle(false)}} style={{ fontSize: '30px', color: "white", backgroundColor: "transparent", display: toggle ? "block" : "none", position: "absolute", top: "-2px", right: "-40px"}}><IoCloseCircleOutline /></span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
