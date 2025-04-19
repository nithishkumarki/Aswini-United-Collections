import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import AUCLogo from '../Assets/AUCLogo.png'
const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-logo'>
        <img src={AUCLogo} alt="" />
        <p>AUC</p>
        </div>

        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>

        <div className='footer-social-icon'>
            <div className="footer-icons-container">
                <a href="https://www.instagram.com/ashwini_united_collections?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                 <img src={instagram_icon} alt="" />
                </a>
                
            </div>
            <div className="footer-icons-container">
            <a href="https://www.instagram.com/ashwini_united_collections?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">

                <img src={pintester_icon} alt="" />
                </a>
            </div>
            <div className="footer-icons-container">
                <a href="https://www.instagram.com/ashwini_united_collections?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">

                <img src={whatsapp_icon} alt="" />
                </a>
            </div>
            
        </div>
        <div className="footer-copyright">
              <hr />
                <p>Copyright @ 2025 - All Right Reserverd</p>
             </div>

    </div>
  )
}

export default Footer