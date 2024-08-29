import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceCardItem from './PlaceCardItem';
import './PlacesToVisit.css'; 

function PlacesToVisit({ trip }) {
    const [placeImages, setPlaceImages] = useState({});
    const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

    useEffect(() => {
        async function fetchPlaceImages() {
            const queries = trip.tripData?.itinerary.flatMap(day =>
                day.plan.map(place => place.placeName)
            );

            if (!queries) return;

            const fetchPromises = queries.map(query =>
                axios.get('https://api.unsplash.com/search/photos', {
                    params: {
                        query,
                        client_id: unsplashAccessKey,
                        per_page: 1
                    }
                }).then(response => response.data.results[0]?.urls?.regular || '/placeholder.jpg')
            );

            const images = await Promise.all(fetchPromises);
            const imageMap = queries.reduce((map, query, index) => {
                map[query] = images[index];
                return map;
            }, {});

            setPlaceImages(imageMap);
        }

        fetchPlaceImages();
    }, [trip, unsplashAccessKey]);

    return (
        <div className='places-to-visit'>
            <h2 className='places-to-visit-title'>Places to Visit</h2>

            <div>
                {trip.tripData?.itinerary.map((item, index) => (
                    <div key={index} className='mt-5'>
                        <h2 className='places-to-visit-day'>{item.day}</h2>
                        <div className='places-to-visit-grid'>
                            {item.plan.map((place, index) => (
                                <div key={index} className='place-card-item'>
                                    <h2 className='place-card-time'>{place.time}</h2>
                                    <PlaceCardItem 
                                        place={{ 
                                            ...place, 
                                            imageUrl: placeImages[place.placeName] || '/placeholder.jpg' 
                                        }} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlacesToVisit;
