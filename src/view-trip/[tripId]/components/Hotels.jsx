import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
    const [hotelImages, setHotelImages] = useState({});
    const unsplashAccessKey = '_es3Byyisu3GRvHAiv4eqy6wvfAOqWuYq6Az0jJOVOA'; // Your Unsplash Access Key

    useEffect(() => {
        async function fetchHotelImages() {
            if (!trip?.tripData?.hotelOptions) return;

            const promises = trip.tripData.hotelOptions.map(async (hotel) => {
                try {
                    // Combine hotel name and address for the query
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
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <Link
                        key={index} // Add this key prop
                        to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + "," + hotel?.hotelAddress}
                        target='_blank'
                    >
                        <div className='hover:scale-110 transition-all cursor-pointer'>
                            <img
                                src={hotelImages[hotel?.hotelName] || '/placeholder.jpg'}
                                className='rounded-xl w-full h-48 object-cover' // Fixed size
                                alt='Hotel'
                            />
                            <div className='my-2 flex flex-col gap-2'>
                                <h2 className='font-medium'>{hotel?.hotelName}</h2>
                                <h2 className='text-xs text-gray-500'>{hotel?.hotelAddress}</h2>
                                <h2 className='text-sm'>{hotel?.price}</h2>
                                <h2 className='text-sm'>{hotel?.rating}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}

export default Hotels;
