import React, { useContext, useState, useEffect } from 'react'
import '../Cart/Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { IoTrashBin } from "react-icons/io5";
import {Link} from 'react-router-dom'
import BottomSets from './BottomSets/Bottomsets';
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPopup from '../../components/LoginPopup.jsx/Loginpop';
import RefreshIcon from '@mui/icons-material/Refresh';



export default function Cart(){

const {productDetails,removeItem,cartAdder,deliveryFee,totals, showDeliveryFee,setShowDeliveryFee,ifLoggedIn,setOrderTypePDF} = useContext(StoreContext)
const [toggleBottom, setToggle] = useState(false)
const[showCollMsg, setShowCollMsg]= useState(false)
const[revertToLogin, setRevert] = useState(false)
const [deliverySelected, setDeliverySelected] = useState(false)
const [collectionSelected, setCollectionSelected] = useState(false)



function handleBottom(){
    setToggle(prev=> !prev)
    setShowCollMsg(false)
    setOrderTypePDF("Delivery")
    setDeliverySelected(true)
}

function showColl(){
    setShowCollMsg(prev=> !prev)
    setToggle(false)
    setShowDeliveryFee(false)
    setOrderTypePDF("Collection")
    toast.success( `Collection Selected`)
    setCollectionSelected(true)
}

const revertToLoginPop =()=>{
    setRevert((prev)=> !prev)
}

const resetDeliveryType = ()=>{
    setCollectionSelected(false) 
    setDeliverySelected(false)  
}


    return(
        <>
        {revertToLogin ? <LoginPopup setRevert={setRevert}/> : <></>}
        {showCollMsg ?
        <div className='collection-message-shop'>
        <p>Since you have chosen the order as Collection, Please collect it from
        <abbr title="Location">
        <a href="https://www.google.com/maps/place/FOODHUB/@52.994576,-2.153979,15z/data=!4m6!3m5!1s0x487a69430f86e549:0x5b62e5a6fae1fe1e!8m2!3d52.9945761!4d-2.153979!16s%2Fg%2F11p3mks83z?hl=en&entry=ttu" target='/blank'> Our Warehouse</a> </abbr></p>
        <span onClick={()=>setShowCollMsg(false)}><AiTwotoneCloseCircle /></span>
        </div>:<></>
        }
        <ToastContainer/>
        <div className='cartContainer'>
        <div className='type-of-order'>
            <button onClick={()=>handleBottom()} 
            className={collectionSelected && "buttonRemover"}
            >
            Delivery
            </button>
            <button onClick={()=>showColl()}
            className={deliverySelected && "buttonRemover"}>Collection</button>
            {collectionSelected || deliverySelected ? <span><RefreshIcon onClick={resetDeliveryType}/></span>  : <></>}
            </div>
            <div className='cart-items-container'>
            <div className="cart-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
            </div >
            <hr/>
            <div className='cart-items' key={cartAdder}>
            {productDetails.map((elem,index)=>{
                if(cartAdder[elem.id]>0){
                    return(<>
                        <div className='rendered' key={index}>   
                            <img src={elem.image} alt="selectedItem" className='img-cart-render'/>
                            <p>{elem.name}</p>
                            <p>£{(elem.price).toFixed(2)}</p>
                            <p>{(cartAdder[elem.id])}</p>
                            <p>£{(cartAdder[elem.id]*elem.price).toFixed(2)}</p>
                            <IoTrashBin onClick={()=>removeItem(elem.id)}className='removerFromCart'/>
                        </div>
                        <hr />
                        </>
                    )
                }
            })}
                </div>
            </div>

                <div className="cart-container">
                <div className="cart-wrapper">
                    <h2>Cart Totals</h2>
                    {showDeliveryFee ? <p className='red-indi'>Delivery Selected</p> : <p className='red-indi'> ( Selected Collection as defaut )</p>}
                    <div className="allCartTotals">
                        <h3>Subtotal</h3>
                        <h3>{(totals.subTotalCart)?.toFixed(2)}</h3>
                    </div>
                    {showDeliveryFee ?
                    <>
                    <hr /> 
                    <div className="allCartTotals">
                        <h3>Delivery Fee</h3>
                        <h3>£ {(deliveryFee)?.toFixed(2)}</h3>
                    </div></> : <></>}
                    
                    <hr />
                    <div className="allCartTotals">
                        <h3><b>Totals</b></h3>
                        <h3><b>{showDeliveryFee ? (totals.totals)?.toFixed(2) :(totals.subTotalCart)?.toFixed(2) }</b></h3>
                    </div>  
                
                {Number(totals.subTotalCart) > 1 ?  
                <div>
                {!ifLoggedIn ?
                <button onClick={revertToLoginPop}>Please Login to Checkout</button>
                :
                <Link to="/cardPage" ><button>Proceed to Checkout</button></Link>
                }
                </div>
                :
                <></>}
                
              
                </div>
                 
                <div className="cart-promocode">
                    <h4>If you have promo code, <br />Enter it here !!</h4>
                    <input type="text" placeholder='promo code' />
                    <button>Submit</button>
                    </div>
                </div>
                
          
                

            </div>

            {toggleBottom ? <BottomSets  setToggle={setToggle} /> : <></>}
        </>
    )
    
}