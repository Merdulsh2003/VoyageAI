import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import { fetchPlaces } from '../api/geoapify';
import './create-trip.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SelectBudgetOptions, SelectTravelsList, AI_PROMPT } from './constants/options';
import { toast } from 'react-toastify';
import { chatSession } from '@/service/AIModel';
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import trip from '../assets/trip.png'
function CreateTrip() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    location: null,
    days: null,
    budget: null,
    travelMode: null,
  });
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTravelMode, setSelectedTravelMode] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const globeRef = useRef();
  const [markers, setMarkers] = useState([]);
  const markerSvg = `<svg viewBox="0 0 24 24" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FF0000" d="M12 2C8.14 2 5 5.14 5 9c0 4.29 7 11 7 11s7-6.71 7-11c0-3.86-3.14-7-7-7zm0 12.4a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8z"></path>
    <circle fill="#FFFFFF" cx="12" cy="9" r="3.4"></circle>
  </svg>`;
  const [openDailog, setOpenDaillog] = useState(false);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false)
  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    if (inputValue.length > 2) {
      const places = await fetchPlaces(inputValue);
      setSuggestions(places);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (place) => {
    const { lat, lon, formatted } = place.properties;
    setQuery(formatted);
    setSuggestions([]);
    setFormData({
      ...formData,
      location: formatted,
    });
    setMarkers([{ lat, lng: lon }]);
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat, lng: lon, altitude: 2 }, 1000);
    }
  };

  const handleInputChangeField = (name, value) => {
    if (name === 'days' && value > 9) {
      toast.error('Please enter days less than 10');
      return;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleBudgetSelect = (budget) => {
    setFormData({ ...formData, budget });
    setSelectedBudget(budget);
  };

  const handleTravelModeSelect = (travelMode) => {
    setFormData({ ...formData, travelMode });
    setSelectedTravelMode(travelMode);
  };

  const validateForm = () => {
    const { location, days, budget, travelMode } = formData;
    setIsFormValid(location && days && budget && travelMode);
  };

  const handleSubmit = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDaillog(true)
      return;
    }

    console.log('Form Data:', formData);
    
    navigate('/loading-page')
    const aiPrompt = AI_PROMPT
      .replace('{location}', formData.location || 'N/A')
      .replace('{days}', formData.days || 'N/A')
      .replace('{travelMode}', formData.travelMode || 'N/A')
      .replace('{budget}', formData.budget || 'N/A')
      .replace('{days}', formData.days || 'N/A');

    const result = await chatSession.sendMessage(aiPrompt);
    console.log(result?.response?.text());
    SaveAiTrip(result?.response?.text())
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDaillog(false);
      handleSubmit();
    })
  }

  const SaveAiTrip = async (TripData) => {
    setloading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    
    const parsedTripData = JSON.parse(TripData);
  
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: parsedTripData,
      userEmail: user?.email,
      id: docId
    });
  
    navigate('/view-trip/' + docId);
    setloading(false);
  };
  


  useEffect(() => {
    validateForm();
  }, [formData]);

  useEffect(() => {
    if (globeRef.current) {
      const globe = globeRef.current;
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.9;
      globe.controls().enableZoom = false;

      const CLOUDS_IMG_URL = './clouds.png';
      const CLOUDS_ALT = 0.004;
      const CLOUDS_ROTATION_SPEED = -0.006;

      new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
        const clouds = new THREE.Mesh(
          new THREE.SphereGeometry(globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
          new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
        );
        globe.scene().add(clouds);

        (function rotateClouds() {
          clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
          requestAnimationFrame(rotateClouds);
        })();
      });
    }
  }, []);



  return (
    <div className='create-trip'>
      <div className="adjustment">
        <div className="create-trip-head">
          <h2>Share Your <span>Travel</span> Preferences 🌍✨</h2>
          <p>Tell us a bit about what you love, and let our smart VoyageAI craft a personalized itinerary just for you.</p>
        </div>
        <div className="hr-tag">
          <hr />
        </div>

        <div className="page-mid">
          <div className="page-mid-left">
            <div className='form-trip-destination'>
              <h2>Where do you want to go?</h2>
              <Input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter a place"
              />
              {suggestions.length > 0 && (
                <ul>
                  {suggestions.map((place, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(place)}>
                      {place.properties.formatted}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className='form-trip-days'>
              <h2>How many days are you planning your trip?</h2>
              <Input
                placeholder='Ex. 3'
                type="number"
                value={formData.days || ''}
                onChange={(e) => handleInputChangeField('days', e.target.value)}
              />
            </div>

            <div className="girl-image">
              <img src={trip} alt="image" />
            </div>
          </div>

          <div className="page-mid-right">
            <div className='globe-background'>
              <Globe
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                showAtmosphere={true}
                atmosphereColor="rgb(63, 178, 255)"
                atmosphereAltitude={0.15}
                width={500}
                height={500}
                backgroundColor="rgba(0, 0, 0, 0)"
                htmlElementsData={markers}
                htmlElement={(d) => {
                  const el = document.createElement('div');
                  el.innerHTML = markerSvg;
                  el.style.color = 'black';
                  el.style.width = '50px';
                  el.style.height = '50px';
                  el.style['pointer-events'] = 'auto';
                  el.style.cursor = 'pointer';
                  el.onclick = () => console.info(d);
                  return el;
                }}
              />
            </div>
          </div>

        </div>


        <div className="create-trip-background"></div>

        <div className='form-trip-budget'>
          <h2>What is Your Budget?</h2>
          <div className='form-trip-budget-containers'>
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`form-trip-budget-container ${selectedBudget === item.title ? 'selected' : ''}`}
                onClick={() => handleBudgetSelect(item.title)}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <h1>{item.icon}</h1>
                <h2>{item.title}</h2>
                <h3>{item.desc}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className='form-trip-mode'>
          <h2>What Mode of Travel Do You Prefer?</h2>
          <div className='form-trip-mode-containers'>
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                className={`form-trip-mode-container ${selectedTravelMode === item.title ? 'selected' : ''}`}
                onClick={() => handleTravelModeSelect(item.title)}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <h1>{item.icon}</h1>
                <h2>{item.title}</h2>
                <h3>{item.desc}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className='generate-trip-button'>
          <Button
            disabled={loading}
            onClick={handleSubmit}>
            {loading ?
              <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Itinerary'
            }

          </Button>
        </div>
      </div>
      <Dialog open={openDailog}>
        <DialogContent>

          <DialogDescription>
            <img src="/logo.svg" alt="App Logo" />
            <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
            <p>Sign in to the App with Google authentication securely</p>
            <Button
              onClick={login}
              className="w-full mt-5 flex gap-4 items-center"
            >

              <FcGoogle className='h-7 w-7' /> Sign In With Google

            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>




    </div>
  );
}

export default CreateTrip;
