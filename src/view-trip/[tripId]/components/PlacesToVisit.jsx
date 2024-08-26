import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
    const [placeImages, setPlaceImages] = useState({});
    const unsplashAccessKey = '_es3Byyisu3GRvHAiv4eqy6wvfAOqWuYq6Az0jJOVOA'; // Your Unsplash Access Key

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
        <div>
            <h2 className='font-bold text-lg'>Places to Visit</h2>

            <div>
                {trip.tripData?.itinerary.map((item, index) => (
                    <div key={index} className='mt-5'>
                        <h2 className='font-medium text-lg'>{item.day}</h2>
                        <div className='grid md:grid-cols-2 gap-5'>
                            {item.plan.map((place, index) => (
                                <div key={index} className='my-3'>
                                    <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
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
