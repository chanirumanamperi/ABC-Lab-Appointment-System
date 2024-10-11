import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../utils/WelcomePage.css';

function WelcomePage() {
    useEffect(() => {
        document.title = 'NestNet';
    }, []);

    const [descriptionIndex, setDescriptionIndex] = useState(0);
    const [fade, setFade] = useState(true);

    const descriptions = [
        "Revolutionize medical test management with our user-friendly Lab Appointment System.",
        "Efficiently manage test records, billing, and secure access for a seamless experience.",
        "Generate insightful reports to support operational and managerial decision-making.",
        "Experience the future of medical test management with ABC Laboratories' innovative system."
    ];
    

    useEffect(() => {
        const timer = setInterval(() => {
            setFade(false); 
            setTimeout(() => {
                setDescriptionIndex((prevIndex) => (prevIndex + 1) % descriptions.length); 
                setFade(true); 
            }, 500); 
        }, 10000); 
        return () => clearInterval(timer); 
    }, []);

    return (
        <div className="landing-page">
            <div className="overlay">
                <h1 className="title">
                    <span>A</span>
                    <span>B</span>
                    <span>C</span>
                </h1>
                {/* <p style={{ fontSize: '34px', fontWeight: 'bold', color: '#fff', textAlign: 'center', }}>
    Laboratories
</p> */}

                <p className={`description ${fade ? "fade-in" : "fade-out"}`}>
                    {descriptions[descriptionIndex]}
                </p>
                <div className="buttons">
                    <Link to="/register" className="btn register-btn">Register</Link>
                    <Link to="/login" className="btn login-btn">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;
