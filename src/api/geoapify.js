import axios from 'axios';

const API_KEY = import.meta.env.VITE_GEOAPIFY_PLACE_API_KEY;

export const fetchPlaces = async (query) => {
    try {
        const response = await axios.get('https://api.geoapify.com/v1/geocode/autocomplete', {
            params: {
                text: query,
                apiKey: API_KEY,
                limit: 5,
            },
        });
        return response.data.features;
    } catch (error) {
        console.error('Error fetching places:', error);
        return [];
    }
};