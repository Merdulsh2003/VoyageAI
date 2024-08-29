import React, { useState } from 'react';
import { Button } from '../ui/button';
import './Header.css';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

const Header = () => {
  const users = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false); 
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json' 
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false); 
      window.location.reload();
    });
  };

  return (
    <div className='header'>
      <a href="/">
      <img src="/logo.png" alt="Logo" className='logo'/>
      </a>
      
      <div>
        {users ?
          <div className='user-options'>
            <a href='/my-trips'>
              <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={users?.picture} className='profile-pic' alt="User Profile" />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='logout' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
          :
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button> 
        }
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogDescription>
            <img src="/logo.svg" alt="App Logo" />
            <h2 className='sign-in-title'>Sign In with Google</h2>
            <p>Sign in to the App with Google authentication securely</p>
            <Button
              onClick={login}
              className="google-signin-btn"
            >
              <FcGoogle className='google-icon' /> Sign In With Google
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
