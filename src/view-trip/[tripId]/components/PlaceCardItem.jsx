import React from 'react';
import { Link } from 'react-router-dom';
import './PlaceCardItem.css';

function PlaceCardItem({ place }) {
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target='_blank' className='place-card'>
            <div className='place-card'>
                <img src={place.imageUrl || "/placeholder.jpg"} alt={place.placeName} />
                <div className='place-card-content'>
                    <h2 className='place-card-title'>{place.placeName}</h2>
                    <p className='place-card-details'>{place?.placeDetails}</p>
                    <h2 className='place-card-time'>{place.travelTime}</h2>
                </div>
            </div>
        </Link>
    );
}

export default PlaceCardItem;
