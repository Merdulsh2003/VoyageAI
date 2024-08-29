import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Hotels.css'; // Import the CSS file

function Hotels({ trip }) {
    const [hotelImages, setHotelImages] = useState({});
    const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY; 

    useEffect(() => {
        async function fetchHotelImages() {
            if (!trip?.tripData?.hotelOptions) return;

            const promises = trip.tripData.hotelOptions.map(async (hotel) => {
                try {
                    const query = `${hotel?.hotelName || 'hotel'} ${hotel?.hotelAddress || 'address'}`;
                    const response = await axios.get('https://api.unsplash.com/search/photos', {
                        params: {
                            query: query,
                            client_id: unsplashAccessKey,
                            per_page: 1
                        }
                    });
                    return {
                        ...hotel,
                        imageUrl: response.data.results[0]?.urls?.regular || '/placeholder.jpg'
                    };
                } catch (error) {
                    console.error('Error fetching hotel image from Unsplash', error);
                    return {
                        ...hotel,
                        imageUrl: '/placeholder.jpg'
                    };
                }
            });

            const hotelsWithImages = await Promise.all(promises);
            const imageMap = hotelsWithImages.reduce((acc, hotel) => {
                acc[hotel.hotelName] = hotel.imageUrl;
                return acc;
            }, {});

            setHotelImages(imageMap);
        }

        fetchHotelImages();
    }, [trip, unsplashAccessKey]);

    return (
        <div>
            <h2 className='hotel-container'>Hotel Recommendation</h2>

            <div className='grid-container'>
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <Link
                        key={index}
                        to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + "," + hotel?.hotelAddress}
                        target='_blank'
                    >
                        <div className='hotel-card'>
                            <img
                                src={hotelImages[hotel?.hotelName] || '/placeholder.jpg'}
                                className='hotel-image'
                                alt='Hotel'
                            />
                            <div className='hotel-info'>
                                <h2 className='hotel-name'>{hotel?.hotelName}</h2>
                                <h2 className='hotel-address'>{hotel?.hotelAddress}</h2>
                                <h2 className='hotel-price'>{hotel?.price}</h2>
                                <h2 className='hotel-rating'>{hotel?.rating}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}

export default Hotels;
