import React, { useState } from 'react';
import './ContactUs.css'
import contactus from '../assets/contactus.png'

function ContactUs() {
    const [reason, setReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [showOtherReason, setShowOtherReason] = useState(false);

    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
        setShowOtherReason(value === 'Other');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            name: event.target.name.value,
            email: event.target.email.value,
            number: event.target.number.value,
            reason: reason === 'Other' ? otherReason : reason,
        });
    };

    return (
        <div className='contactUs'>
            <div className="contactus-left">
                <div className="contactus-head">
                    <h2>Contact Us</h2>
                </div>
                <div className="contactus-heading">
                    <h1>We’d Love to Hear From You</h1>
                </div>
                <div className="contactus-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" id="name" name="name" placeholder="Name" required />
                        </div>
                        <div className="form-group">
                            <input type="email" id="email" name="email" placeholder="Email" required />
                        </div>
                        <div className="form-group">
                            <input type="tel" id="number" name="number" placeholder="Phone Number" required />
                        </div>
                        <div className="form-group">
                            <select id="reason" name="reason" value={reason} onChange={handleReasonChange} required>
                                <option value="" disabled>Select Reason for Contacting</option>
                                <option value="Support">Support</option>
                                <option value="Sales">Sales Inquiry</option>
                                <option value="Feedback">Feedback</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        {showOtherReason && (
                            <div className="form-group">
                                <textarea
                                    id="other-reason"
                                    name="other-reason"
                                    placeholder="Please specify"
                                    rows="4"
                                    value={otherReason}
                                    onChange={(e) => setOtherReason(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        <div className="form-group">
                            <button type="submit" className="submit-btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="contact-right">

            <img src="/logo.png" alt="logo" className='img2' />
                <img src={contactus} alt="Contact Us" />
                
            </div>
        </div>
    );
}

export default ContactUs;
