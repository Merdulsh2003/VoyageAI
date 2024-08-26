import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { BsFillSendFill } from "react-icons/bs";

function InfoSection({ trip }) {
    const [locationImage, setLocationImage] = useState('/placeholder.jpg');
    const unsplashAccessKey = '_es3Byyisu3GRvHAiv4eqy6wvfAOqWuYq6Az0jJOVOA'; // Your Unsplash Access Key

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
            <img src={locationImage} className='h-[348px] w-full object-cover rounded-xl' alt='Destination' />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{trip?.userSelection?.days} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>Travel With: {trip?.userSelection?.travelMode}</h2>
                    </div>
                </div>
                <Button><BsFillSendFill /></Button>
            </div>
        </div>
    );
}

export default InfoSection;
