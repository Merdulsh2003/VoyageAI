import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCard from './components/UserTripCard';
import './my-trip.css'; 

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    fetchUserTrips();
  }, []);

  const fetchUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/');
      return;
    }

    setUserTrips([]);
    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);

    const trips = [];
    querySnapshot.forEach((doc) => {
      const tripData = doc.data();
      if (Object.keys(tripData).length > 0) {
        trips.push(tripData);
      }
    });

    setUserTrips(trips);
  };

  const handleCreateTrip = () => {
    navigate('/create-trip'); 
  };

  return (
    <div className='my-trips-container'>
      <h2 className='my-trips-title'>My <span>Trips</span></h2>
      <p className='my-trips-title-quote'>Revisit your experiences and get inspired for future trips.</p>
      <div className='grid-container'>
        {userTrips.length > 0 ? (
          userTrips.map((trip, index) => (
            <UserTripCard key={index} trip={trip} />
          ))
        ) : (
          <button className='create-trip-button' onClick={handleCreateTrip}>
            + Create Your First Trip
          </button>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
