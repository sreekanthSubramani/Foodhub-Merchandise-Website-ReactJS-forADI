import './Footer.css'
import { assets } from '../../assets/assets'
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { LiaCopyrightSolid } from "react-icons/lia";
import { LuPhoneCall } from "react-icons/lu";
import { IoMailOutline } from "react-icons/io5";

export default function Footer(){

    const date = new Date()
    const year = date.getFullYear()
    

    return(
        <>
            <hr />
            <div className="containerFooter">
                <div className='services-div' id="footerDivUpdated">
                    <div>
                    <h4>Services</h4>
                    <li><a href="https://foodhubforbusiness.com/foodhub-support">Foodhub Support</a></li>
                    <li> <a href="https://foodhubforbusiness.com/marketing">Marketing</a></li>
                    <li><a href="https://foodhubforbusiness.com/payments"> Payment</a></li>
                    <li> <a href="https://foodhubforbusiness.com/table-ordering-system">Table Ordering System</a></li>
                    </div>
                <div className='logoeditor11'>
                <img src={assets.foodhub_logo_footer} alt="foodhub-logo" loading="lazy" />
                </div>
                </div>

                <div className='support-div'>
                    <h4>Support</h4>
                    <ul>
                        <li><a href="https://foodhubforbusiness.com/downloads">Downloads</a></li>
                        <li> <a href="https://foodhubforbusiness.com/contact-us">Contact Us</a></li>
                        <li> <a href="https://foodhubforbusiness.com/terms">Terms and Conditions</a></li>
                        <li> <a href="https://foodhubforbusiness.com/privacy-policy-eu">EU Privacy Policy</a></li>
                        <li> <a href="https://foodhub.com/privacy">US Privacy Policy</a></li>
                        <li> <a href="https://foodhubforbusiness.com/privacy-policy">Privacy Policy</a></li>
                    </ul>
                </div>

                <div>
                        <p><LiaCopyrightSolid />{year} All Rights Reserved</p>
                        <h3><LuPhoneCall /> 01782-444-282</h3>
                        <h3><IoMailOutline /> <a href="mailto:updates@foodhub.com">updates@foodhub.com </a></h3>
                        <br />
                        <p>Follow Us </p>
                        <div className='followusLogo'>
                        <span> <a href="https://www.instagram.com/foodhub.co.uk/?hl=en"><FaInstagramSquare /></a></span>
                        <span> <a href="https://x.com/FoodhubUK?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"><FaSquareXTwitter /></a></span>
                        <span> <a href="https://www.facebook.com/Foodhub.co.uk/"><FaFacebook /></a></span>
                        </div>
                </div>
                <div className='paymentLogos'>
                    <h4>We accept </h4>
                    <img src={assets.amex} alt="amex" loading='lazy' />
                    <img src={assets.dinersclub} alt="amex" loading='lazy'/>
                    <img src={assets.gpay} alt="gpay" loading='lazy'/>
                    <img src={assets.shoppay} alt="shopPay" loading="lazy" />
                    <img src={assets.maestro} alt="maestro" loading="lazy"/>
                    <img src={assets.visa} alt="visa" loading="lazy"/>
                    <img src={assets.mastercard} alt="mastercard" loading="lazy"/>
                    <img src={assets.unionpay} alt="unionPay" loading="lazy"/>
                    <img src={assets.discover} alt="discover" loading="lazy"/>
                
                <div>
        
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2401.4376214198405!2d-2.153798622113751!3d52.9945152097692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a69430f86e549%3A0x5b62e5a6fae1fe1e!2sFOODHUB!5e0!3m2!1sen!2sin!4v1720370718045!5m2!1sen!2sin" width="300" height="250"></iframe>
               
                </div>
        
                </div>
            </div>
             
          </>              
    )
}