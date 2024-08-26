import React from 'react';
import './Loading.css';

export const Loading = () => {
    return (
        <div className="loading-screen">
            <div className="loading-header">
                <h1>
                    <span className="highlight">VoyageAI</span> is Crafting Your Personalized Adventure...
                </h1>
            </div>
            <div className="spinner-container">
                <div className="spinner">
                    <div className="inner-circle"></div>
                </div>
                <div className="loading-text">
                    <p>Analyzing Your Preferences</p>
                    <p>Optimizing Destinations</p>
                    <p>Designing Your Perfect Itinerary</p>
                </div>
            </div>
            <div className="loading-footer">
                <p>Get ready to embark on a journey like never before...</p>
            </div>
        </div>
    );
};
