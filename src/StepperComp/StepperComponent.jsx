import './StepperComp.css'
import * as React from 'react';
import { useContext, useMemo, useRef} from 'react'
import { StoreContext } from '../Context/StoreContext';
import VerticalLinearStepper from './VerticalStepper';
import { useCountUp } from 'react-countup';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ThePDF from './PDFRenderer';



export default function StepperComponent() {    
  const {userMetaData,cartAdder, productDetails, orderTypePDF,deliveryAddressPDF,deliveryFee}  = useContext(StoreContext)
  const refvalue = useRef(null)
  const monthValue = useRef(null)



const randomOrderIDGenerator = useMemo(()=>{
  let getOrderID = localStorage.getItem("orderIDP")

  if(!getOrderID){
    let randomGenerator = "#1".concat(Math.floor(Math.random() * 99999 ))
    localStorage.setItem("orderIDP", randomGenerator)
    getOrderID = randomGenerator 
  }

  return getOrderID
},[])
console.log(cartAdder)
    
useCountUp({
    ref : refvalue,
    start : 0,
    end : 4500,
    duration : 5,
    suffix : " +"
  })

  useCountUp({
    ref : monthValue,
    start : 0,
    end : 235,
    duration : 5,
    suffix : " +"
  })

  console.log(deliveryAddressPDF)



  return (
        <div className='stepperComp-ht'>
          
        <div className='pdf-downloader'>
        <h2>Click to download your order copy</h2>
        
        <PDFDownloadLink document={<ThePDF orderIDProp={randomOrderIDGenerator} cartAdder={cartAdder} productDetails={productDetails} orderTypePDF={orderTypePDF} deliveryFee={deliveryFee} deliveryAddressPDF={deliveryAddressPDF} />} fileName="Foodhub-Order-Invoice" >
        {({loading})=> loading ? (<button>Loading Document</button>) : (<button>Download</button>) } 
        </PDFDownloadLink>
        
        </div>


          <div className="info-stepper">
          <h3>Thank you for placing an order with us... </h3>
          <h4><span className='step-name'> Hi, </span>{userMetaData?.metaName } 👋</h4>
          <p>Your order ID : {randomOrderIDGenerator} </p>
          <VerticalLinearStepper orderIdStep = {randomOrderIDGenerator}/>
          </div>

        
        
        <div className='order-div-count'>
        <h3> Foodhub Merchandise Orders Overview   </h3>
        
          <div className='orderCountup'>
            
            <div className='refCountUp'>
            <div ref={refvalue} className='countUp-first' ></div>
            <p>Merchandise Orders so far</p>
            </div>
        
        </div>

          <div className='refCountUp'>
            <div ref={monthValue} className='countUp-first'></div>
            <p>Merchandise orders for the month</p>
          </div>
        </div>



        
        </div>
  );
}