import { StoreContext } from '../../Context/StoreContext'
import './FAQpage.css'
import { useState, useContext } from "react"
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import Bookacall from './Bookacall/Bookacall';

export default function FAQPage(){

const {FAQPageContent} = useContext(StoreContext)
const [showPointers, setShowPointers] = useState("")
const [arrowState, setArrowState] = useState(false)
const [callDisplay, setcallDisplay] = useState(false)

function handleDropDown(id){
 setShowPointers(id === showPointers || id)
 setArrowState((prev)=> !prev)
}
    

    return(
        <>
        {callDisplay && <Bookacall setcallDisplay={setcallDisplay}/>}
        <div className="Faq-container">
            <div className='Faq-insider'>
                <h3>Frequently asked questions</h3>
            {FAQPageContent.map((elem,index)=>{
                return(
                    <>
                    <div className='qa-faq' key={index} onClick={()=>handleDropDown(elem.id)}>
                        <li>{elem.question}</li>
                        {!arrowState ? <FaArrowAltCircleDown /> : <FaArrowAltCircleUp /> }
                    </div>
                    <div>
                    {showPointers === elem.id ?
                    <div key={elem.id} className='ans-faq'>{elem.answer}</div>
                        :
                        ""
                }
                    </div>
                    </>
                )
            })}
            </div>
        </div>
        <div className='signUp-FAQ'>
            <div className="signUp-Block">
                <h2>If you want to sign up with Foodhub! Click on the button below to book a call from our sales team.</h2>
        <button className='signUp-btn-faq' onClick={()=>setcallDisplay(prev=> !prev)}> Book a Call <span className='call-logo-faq'><BiSolidPhoneCall /></span></button>
        </div>
        </div>
        
        </>
    )
}