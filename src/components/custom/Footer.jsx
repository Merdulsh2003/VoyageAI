import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="upperline">
            <hr />
            <div className='footer'>
                <div className="footer-right">
                    <img src="/logo.png" alt="VoyageAI Logo" />
                    <p>Turn your next trip into a hassle-free experience with VoyageAI.</p>
                </div>

                <div className="footer-left">
                    <div className="legal">
                        <h2>Legal</h2>
                        <a href="/terms-and-conditions">
                            <p>Terms and Conditions</p>
                        </a>
                        <a href="/privacy-policy">
                            <p>Privacy Policy</p>
                        </a>
                    </div>

                    <div className="support">
                        <h2>Support</h2>
                        <a href="/contact-us">
                            <p>Contact Us</p>
                        </a>
                    </div>

                    <div className="connect">
                        <h2>Let’s Connect</h2>
                        <a href="https://www.linkedin.com/in/merdul-sharma-962324292/">
                            <p>LinkedIn</p>
                        </a>
                        <a href="https://github.com/Merdulsh2003">
                            <p>Github</p>
                        </a>
                        <a href="https://www.instagram.com/mridulsh2003_21/?hl=en">
                            <p>Instagram</p>
                        </a>
                        <a href="https://www.facebook.com/merdul.sharma.3/">
                            <p>Facebook</p>
                        </a>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <p>© 2024 VoyageAI. All rights reserved</p>
            </div>
        </div>
    );
}

export default Footer;
