import React, { useState, useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// We wrap the entire app in this component to show the cookie consent banner
export default function Root({ children }): JSX.Element {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        if (ExecutionEnvironment.canUseDOM) {
            const consent = localStorage.getItem('cookie-consent');
            if (!consent) {
                setShowBanner(true);
            } else if (consent === 'accepted') {
                // If already accepted in previous session, ensure gtag is updated
                // though the default is denied, we should update if they already consented
                updateGtagConsent(true);
            }
        }
    }, []);

    const updateGtagConsent = (accepted: boolean) => {
        if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('consent', 'update', {
                'ad_storage': accepted ? 'granted' : 'denied',
                'ad_user_data': accepted ? 'granted' : 'denied',
                'ad_personalization': accepted ? 'granted' : 'denied',
                'analytics_storage': accepted ? 'granted' : 'denied'
            });
        }
    };

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        updateGtagConsent(true);
        setShowBanner(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        updateGtagConsent(false);
        setShowBanner(false);
    };

    return (
        <>
            {children}
            {showBanner && (
                <div className="cookie-banner">
                    <div className="cookie-banner-content">
                        <p>
                            We use cookies to improve your experience and analyze our traffic.
                            By clicking "Accept All", you consent to our use of cookies.
                            Read our <a href="/-AI-Educator-Toolkit/docs/privacy-policy">Privacy Policy</a>.
                        </p>
                        <div className="cookie-banner-buttons">
                            <button onClick={handleDecline} className="button button--secondary button--sm">
                                Decline
                            </button>
                            <button onClick={handleAccept} className="button button--primary button--sm">
                                Accept All
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
