import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserTripCard.css'; // Import UserTripCard specific CSS

function UserTripCard({ trip }) {
  const [tripImage, setTripImage] = useState('/placeholder.jpg');
  const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    async function fetchTripImage() {
      if (!trip?.userSelection?.location) return;

      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: trip.userSelection.location,
            client_id: unsplashAccessKey,
            per_page: 1
          }
        });
        setTripImage(response.data.results[0]?.urls?.regular || '/placeholder.jpg');
      } catch (error) {
        console.error('Error fetching trip image from Unsplash', error);
      }
    }

    fetchTripImage();
  }, [trip, unsplashAccessKey]);

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className='trip-card'>
        <img src={tripImage} className='trip-card-img' alt='Trip Location' />
        <div className='trip-card-content'>
          <h2>{trip?.userSelection?.location}</h2>
          <p>{trip?.userSelection?.days} Days trip with {trip?.userSelection?.travelMode} Budget</p>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCard;
