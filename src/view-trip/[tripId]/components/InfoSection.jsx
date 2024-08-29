import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { BsFillSendFill } from "react-icons/bs";
import './InfoSection.css'; // Import the CSS file

function InfoSection({ trip }) {
    const [locationImage, setLocationImage] = useState('/placeholder.jpg');
    const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

    useEffect(() => {
        async function fetchLocationImage() {
            if (!trip?.userSelection?.location) return;

            try {
                const response = await axios.get(`https://api.unsplash.com/search/photos`, {
                    params: {
                        query: trip.userSelection.location,
                        client_id: unsplashAccessKey,
                        per_page: 1
                    }
                });
                const imageUrl = response.data.results[0]?.urls?.regular || '/placeholder.jpg';
                setLocationImage(imageUrl);
            } catch (error) {
                console.error('Error fetching image from Unsplash', error);
                setLocationImage('/placeholder.jpg');
            }
        }

        fetchLocationImage();
    }, [trip, unsplashAccessKey]);

    return (
        <div>
            <img src={locationImage} className='info-image' alt='Destination' />

            <div className='info-container'>
                <div className='info-details'>
                    <h2 className='info-location'>{trip?.userSelection?.location}</h2>
                    <div className='info-tags'>
                        <h2 className='info-tag info-tag-md'>{trip?.userSelection?.days} Day</h2>
                        <h2 className='info-tag info-tag-md'>{trip?.userSelection?.budget} Budget</h2>
                        <h2 className='info-tag info-tag-md'>Travel With: {trip?.userSelection?.travelMode}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoSection;
