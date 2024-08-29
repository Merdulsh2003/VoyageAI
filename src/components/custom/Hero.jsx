import React from 'react';
import './Hero.css';
import { Link, useNavigate } from 'react-router-dom';
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoFileTrayStackedOutline } from "react-icons/io5";
import { TbCloudDataConnection } from "react-icons/tb";
import tripPic1 from '../../assets/trip-pic.png';
import tripPic2 from '../../assets/trip-pic-2.png';

function Hero() {

   return (
    <div className="hero">
      <div className="hero-background"></div>
      <div className="side-adjust">
        <div className="hero-content">
          <h1>
            <span>Discover Your Next Adventure With AI:</span> Personalized Itineraries at Your Fingertips
          </h1>
          <p>Build, personalize, and optimize your itineraries with our free VoyageAI. Designed for vacations, workations, and everyday adventures.</p>
        </div>

        <Link to={'/create-trip'}>
          <button className='started-button'>
            <VscGitPullRequestCreate />
            Get Started, It's Free
          </button>
        </Link>
      </div>

      <div className="features">
        <div className="feature-item">
          <MdOutlineAddLocationAlt className="feature-icon" />
          <h3>Get Personalized Recs with AI</h3>
        </div>
        <div className="feature-item">
          <CiHeart className="feature-icon" />
          <h3>Save Hotels, Restaurants, and More</h3>
        </div>
        <div className="feature-item">
          <IoFileTrayStackedOutline className="feature-icon" />
          <h3>See Your Saves on Your Custom Map</h3>
        </div>
        <div className="feature-item">
          <TbCloudDataConnection className="feature-icon" />
          <h3>Share and Collab with Your Travel Buds</h3>
        </div>
      </div>

      <div className="content1">
        <div className="heading1">
          <h1>Your <span>AI-Powered</span> Trip</h1>
        </div>
        <div className="content-top">
          <div className="content-top-1">
            <h1>Create Your Perfect Itinerary <br />with VoyagerAI</h1>
            <p>Our advanced algorithms consider your chosen sights, dining spots, and lodging preferences to craft the most optimal travel plan, uniquely tailored just for you.</p>
          </div>
          <img src={tripPic1} alt="Travel" />
        </div>
        <div className="content-top">
          <img src={tripPic2} alt="Travel Inspiration" />
          <div className="content-top-1">
            <h1>Get Inspired</h1>
            <p>Dive into travel insights from Instagram Reels and TikToks, explore featured sights, and effortlessly add them to your adventure with Trip Planner AI.</p>
          </div>
        </div>
      </div>


      <div className="customized-itineraries">
        <h1>Tailored <span>Itineraries </span>for Every Travel Dream</h1>
        <p className='special-p'>VoyageAI is your ultimate travel companion, designed for solo adventures, family vacations, and group expeditions. Experience travel planning like never before with:</p>
        <div className="paragraphs">
          <div className="para1">
            <h2><span>AI-Powered</span> Itinerary <br />Optimization</h2>
            <p>Leverage our advanced AI to craft the perfect travel routes. VoyageAI calculates the best paths, travel times, and distances, ensuring smooth and efficient journeys whether you're exploring the city or embarking on a cross-country adventure.</p>
          </div>
          <div className="para2">
            <h2>Comprehensive <span>Travel <br /> Organizer</span></h2>
            <p>Streamline your travel planning with VoyageAI. Our all-in-one platform consolidates hotel and flight details, manages bookings, and provides valuable tips and guides, keeping all your trip information in one convenient place.</p>
          </div>
          <div className="para3">
            <h2>Effortless <span>Group <br /> Planning</span></h2>
            <p>Simplify collaborative travel planning with our real-time features. VoyageAI makes it easy for you and your companions to create and adjust itineraries together, ensuring everyone is up-to-date and involved in the planning process.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
