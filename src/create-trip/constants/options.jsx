import solotrip from '../../assets/solo_trip.jpg'
import coupletrip from '../../assets/couple_trip.jpg'
import familytrip from '../../assets/family_trip.jpg'
import friendstrip from '../../assets/friend_trip.jpeg'
import cheapPrice from '../../assets/cheap_price.avif'
import mediumprice from '../../assets/medium_price.avif'
import richprice from '../../assets/rich_price.avif'

export const SelectTravelsList = [
  {
      id: 1,
      title: 'Just Me',
      desc: 'A sole traveler in exploration',
      icon: '✈️',
      people: '1',
      image: solotrip, // Path to the image
  },
  {
      id: 2,
      title: 'A Couple',
      desc: 'Two travelers in tandem',
      icon: '🥂',
      people: '2',
      image: coupletrip // Path to the image
  },
  {
      id: 3,
      title: 'Family',
      desc: 'A group of fun-loving adventurers',
      icon: '🏡',
      people: '3 to 5 People',
      image: familytrip, // Path to the image
  },
  {
      id: 4,
      title: 'Friends',
      desc: 'A bunch of thrill-seekers',
      icon: '⛵',
      people: '5 to 10 People',
      image: friendstrip // Path to the image
  },
]

  
export const SelectBudgetOptions = [
  {
      id: 1,
      title: 'Cheap',
      desc: 'Stay conscious of costs',
      icon: '💵',
      image: cheapPrice, // Path to the image
  },
  {
      id: 2,
      title: 'Moderate',
      desc: 'Keep cost on the average side',
      icon: '💰',
      image: mediumprice, // Path to the image
  },
  {
      id: 3,
      title: 'Luxury',
      desc: 'Don’t worry about cost',
      icon: '💸',
      image: richprice, // Path to the image
  },
  
]

export const AI_PROMPT = `Generate Travel Plan for Location: {location}, for {days} Days for {travelMode} with a {budget} budget.Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {days} days with each day plan with best time to visit and time taken to reach that place in JSON format.`;


  