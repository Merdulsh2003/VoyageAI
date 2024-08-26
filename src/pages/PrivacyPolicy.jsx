import React from 'react';
import './PrivacyPolicy.css';


function PrivacyPolicy() {
    return (
        <div className="privacy-container">
            <div className="background"></div>
            <header className="privacy-header">
                <h1>Privacy Policy</h1>
            </header>
            <section className="privacy-content">
                <h2>1. Introduction</h2>
                <p>At VoyageAI, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our website and services.</p>

                <h2>2. Information We Collect</h2>
                <p>We collect information that you provide directly to us, such as when you create an account, plan a trip, or contact our support team. This information may include your name, email address, travel preferences, and other details relevant to your travel planning experience.</p>

                <h2>3. How We Use Your Information</h2>
                <p>We use the information we collect to enhance your experience with VoyageAI, including personalizing trip recommendations, improving our services, and communicating with you about updates or promotional offers. We may also use your information for analytical purposes to better understand our users' needs.</p>

                <h2>4. Sharing Your Information</h2>
                <p>VoyageAI does not sell, trade, or rent your personal information to third parties. We may share your information with trusted partners who assist us in providing our services, but only to the extent necessary for them to perform their functions.</p>

                <h2>5. Data Security</h2>
                <p>We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please be aware that no method of transmitting data over the internet is completely secure, and we cannot guarantee absolute security.</p>

                <h2>6. Your Rights</h2>
                <p>You have the right to access, correct, or delete your personal information at any time. If you wish to exercise these rights, please contact us at <a href="mailto:privacy@voyageai.com">privacy@voyageai.com</a>. We will respond to your request as promptly as possible.</p>

                <h2>7. Changes to This Policy</h2>
                <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We encourage you to review this page regularly to stay informed about how we are protecting your information.</p>

                <h2>8. Contact Us</h2>
                <p>If you have any questions or concerns regarding this Privacy Policy, please reach out to us at <a href="mailto:privacy@voyageai.com">privacy@voyageai.com</a>. Your privacy is our priority, and we are here to address any issues you may have.</p>
            </section>
            <a href="/" className="back-button">Back to Home</a>
        </div>
    );
}

export default PrivacyPolicy;
