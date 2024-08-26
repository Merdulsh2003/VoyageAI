import React from 'react';
import './TermsAndConditions.css';


function TermsAndConditions() {
    return (
        <div className="terms-container">
            <div className="background"></div>
            <header className="terms-header">
                <h1>Terms and Conditions</h1>
            </header>
            <section className="terms-content">
                <h2>1. Welcome to VoyageAI</h2>
                <p>Thank you for choosing VoyageAI. These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, please do not use our services.</p>

                <h2>2. Intellectual Property Rights</h2>
                <p>All content, including text, images, logos, and software, available on VoyageAI is the exclusive property of VoyageAI or our licensors. You may not reproduce, distribute, or create derivative works from any of our content without prior written permission.</p>

                <h2>3. Use of Our Services</h2>
                <p>Our platform is designed to assist you in planning your trips. You agree to use our services in a lawful manner, and not for any illegal activities. We reserve the right to suspend or terminate your access if you violate these terms.</p>

                <h2>4. User Responsibilities</h2>
                <p>You are responsible for the accuracy of any information you provide on our site. This includes ensuring that your personal details and trip information are up to date. Misuse of our platform, including fraudulent activities, is strictly prohibited.</p>

                <h2>5. Limitation of Liability</h2>
                <p>While we strive to provide accurate and reliable services, VoyageAI is not liable for any direct, indirect, or incidental damages that may result from using our platform. Your use of our services is at your own risk.</p>

                <h2>6. Updates to These Terms</h2>
                <p>We may revise these Terms and Conditions from time to time. Any changes will be effective immediately upon posting. We encourage you to review this page periodically to stay informed about our terms.</p>

                <h2>7. Contact Information</h2>
                <p>If you have any questions or concerns about these Terms and Conditions, feel free to reach out to us at <a href="mailto:merdulsharma2003@gmail.com">support@voyageai.com</a>. We're here to help!</p>
            </section>
            <a href="/" className="back-button">Back to Home</a>
            
        </div>
    );
}

export default TermsAndConditions;
