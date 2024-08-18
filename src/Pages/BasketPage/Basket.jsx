import React, { Profiler, useCallback } from "react"
import { BsCart4 } from "react-icons/bs";
import { FiMinimize2 } from "react-icons/fi";
import { useState, useContext, useEffect, } from "react"
import {StoreContext} from "../../Context/StoreContext";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import './Basket.css'
import { Link } from "react-router-dom";

export default function Basket(){
    
    const {productDetails,addItem,removeItem,cartAdder,deliveryFee, totals,setTotals,showDeliveryFee} = useContext(StoreContext)
    const [showFullCart, setFullCart] = useState(false)
    const [totalCart, setTotalCart] = useState(0)
    const [subTotal, setSubTotal] = useState(0)

    var valuesRender = Object.values(cartAdder)


    const ObjectCart = useCallback(()=>{
        var summed = valuesRender.reduce((accum,succ)=> accum + succ, 0)
        return summed
    },[valuesRender])

    const calculateSubTotal = useCallback(()=>{
        return productDetails.reduce((accum,product)=>{
            if(cartAdder[product.id] > 0){
                return accum + (cartAdder[product.id] * product.price)
            }
            return accum
        },0)
    
    })
    



useEffect(()=>{
    if(valuesRender.length > 0){
        setTotalCart(ObjectCart())
    }
},[ObjectCart()])

useEffect(()=>{
    if(valuesRender.length > 0){
        setSubTotal(calculateSubTotal());
    }
},[setTotals,calculateSubTotal()])


useEffect(()=>{
    setTotals({
        subTotalCart : subTotal,
        totals : subTotal + deliveryFee 
    })
},[subTotal,calculateSubTotal()])




        
    return(
        <> 

{showFullCart ?
    <div className="top-stack-adder">
    <div className="top-stack-header">
        <h5>Your products</h5>
        <span className="minimise-btn" onClick={()=> setFullCart(prev=> !prev)}><FiMinimize2 /></span>
    </div>
    <div className="scroller-y-axis">
    {productDetails.map((elem,index)=>{
            if(cartAdder[elem.id] > 0)
                return(
                <>
                <div className="main-div-Basket" key={index}>
                <div className="image-det-basket">
                <img src={elem.image} ></img>
                <p className="name-basketer">{elem.name}</p>
                <div className="total-item-count"> {cartAdder[elem.id]} </div>
                <p >£ {(cartAdder[elem.id] * elem.price).toFixed(2)} </p>
                </div>
                </div>
                <div className="plusser-minus"><span className="plusser"><FaMinus onClick={()=>removeItem(elem.id)} /></span><span className="minuser"> <FaPlus onClick={()=>addItem(elem.id)} /></span> </div>
                <hr className="line-under"/>
                </>
                
            )
        })}
        {!totalCart && <p className="no-display">No items to show</p>}
  </div>
  
<div>
  <div className="place-bottom">     
  <div>
    <div className="displayer-carter">
        <div className="space-around">
            <div className="sp-ar">
            <p>Sub total</p>  <span> £ {(subTotal).toFixed(2)} </span> 
            </div>
            {showDeliveryFee ?
             <div className="sp-ar">
             <p>Delivery Fee </p>   <span>£ {(deliveryFee).toFixed(2)} </span>   
             </div> : <></> }
            <div className="sp-ar">
            <p>Total</p>  <span>£{showDeliveryFee  ? (subTotal + deliveryFee).toFixed(2) : subTotal.toFixed(2) }  </span> 
            </div>
            <Link to="/cart"><button className="btn-final-cart">Cart Page</button></Link>
            </div>
        </div>
    </div>
  </div>
  </div>
  </div>



:

<div className="cart-logo-container" onClick={()=> setFullCart(prev=> !prev)}>

                <div>
                    <div className="dot-rep-count">{totalCart}</div>
                   <span className="cart-logo"> <BsCart4 className="lo-cart"/> </span>
      
                </div>
                </div>
}

        </>
    )}