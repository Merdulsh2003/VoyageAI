import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip/create-trip.jsx';
import Header from './components/custom/Header.jsx';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index.jsx';
import MyTrips from './my-trips/my-trips.jsx';
import Footer from './components/custom/Footer.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import ContactUs from './pages/ContactUs.jsx';
import LoadingPage from './view-trip/[tripId]/components/LoadingPage.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreateTrip />
  },
  {
    path: '/view-trip/:tripId',
    element: <Viewtrip />
  },
  {
    path: '/my-trips',
    element: <MyTrips />
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditions />
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy/>
  },
  {
    path: '/contact-us',
    element:<ContactUs/>
  },
  {
    path: '/loading-page',
    element: <LoadingPage/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <RouterProvider router={router} />
      <ToastContainer />
      <Footer/>
    </GoogleOAuthProvider>
  </StrictMode>,
);
