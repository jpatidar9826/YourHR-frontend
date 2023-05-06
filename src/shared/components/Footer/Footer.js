import React from "react";

import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter, faGooglePlay} from '@fortawesome/free-brands-svg-icons'; 

import "./Footer.css";

const Footer = props => {

    return(
        <div className="footer-wrapper">
            <h2>YourHR</h2>
            <div className="footer-brand-bar"> 
                <span className="footer-brand-wrapper"><a href=" " ><FontAwesomeIcon icon={faFacebookF} /></a></span>
                <span className="footer-brand-wrapper"><a href=" " ><FontAwesomeIcon icon={faInstagram} /></a></span>
                <span className="footer-brand-wrapper"><a href=" " ><FontAwesomeIcon icon={faTwitter} /></a></span>
                <span className="footer-brand-wrapper"><a href=" " ><FontAwesomeIcon icon={faGooglePlay} /></a></span>
            </div>
            <div className="footer-copy"><p>© Copyright Blogr</p></div>
        </div>
    );

};

export default Footer;