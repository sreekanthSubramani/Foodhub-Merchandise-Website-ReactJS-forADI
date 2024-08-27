import React, { useContext, useState, useEffect } from 'react'
import '../Cart/Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { IoTrashBin } from "react-icons/io5";
import {Link, useNavigate} from 'react-router-dom'
import BottomSets from './BottomSets/Bottomsets';
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPopup from '../../components/LoginPopup.jsx/Loginpop';
import RefreshIcon from '@mui/icons-material/Refresh';
import { FaRegLightbulb } from "react-icons/fa";
import { RiInformation2Line } from "react-icons/ri";
import { auth } from '../../components/FirebaseConfig/FirebaseConfig';


export default function Cart(){

const {productDetails,removeItem,cartAdder,deliveryFee,totals, showDeliveryFee,setShowDeliveryFee,ifLoggedIn,setOrderTypePDF,walletFundsCont,setTotals} = useContext(StoreContext)
const [toggleBottom, setToggle] = useState(false)
const[showCollMsg, setShowCollMsg]= useState(false)
const[revertToLogin, setRevert] = useState(false)
const [deliverySelected, setDeliverySelected] = useState(false)
const [collectionSelected, setCollectionSelected] = useState(false)
const [underLine, setUnderLine] = useState(false)           
const [showWalletFunds, setShowWalletFunds] = useState(true)
const [showTotalsDiv, setShowTotalsDiv] = useState(false)
const [showNegative, setShowNegative] = useState(false)


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
    setUnderLine((prev)=> !prev)
}

const resetDeliveryType = ()=>{
    setCollectionSelected(false) 
    setDeliverySelected(false)  
    setToggle(false)
}

let firstName = auth?.currentUser?.displayName;
firstName = firstName?.split(" ").slice(0, 1);

const navigateToWallet = useNavigate()

const walletRemover =()=>{
    setShowWalletFunds(false)
    localStorage.setItem("currentWallet", walletFundsCont)
    toast.success(`£${walletFundsCont}.00 is added back to wallet`)
    setShowTotalsDiv(true)
    setShowNegative(false)
}
 

console.log(totals.subTotalCart, walletFundsCont)


useEffect(()=>{
        if(totals.totals < walletFundsCont && showWalletFunds  && walletFundsCont){
            setShowNegative(true)
            localStorage.setItem("currentWallet", ((totals.subTotalCart - Number(walletFundsCont)).toFixed(2) * -1))
            toast.success(`${((totals.subTotalCart - Number(walletFundsCont)).toFixed(2) * -1)} has been settled in your wallet now !!`)
        }
},[totals.totals,walletFundsCont])


    return(
        <>
        <ToastContainer />
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
        <div className="order-type-buttons">
            <h3 className={underLine ? "underliner" : null}>
            Select your order type 
            {underLine ? <FaRegLightbulb style={{background : "yellow", padding: "2px", borderRadius : "40px", fontSize : "24px"}}/> : <></>}
            </h3>
            <button onClick={()=>handleBottom()} 
            className={collectionSelected && "buttonRemover"}
            >
            Delivery
            </button>
            <button onClick={()=>showColl()}
            className={deliverySelected && "buttonRemover"}>Collection</button>
            {collectionSelected || deliverySelected ? <span ><RefreshIcon onClick={resetDeliveryType}/></span>  : <></>}
            </div>
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
                    <h2>Cart Totals  
                        <abbr title="Use yout Wallet to pay by clicking on My Profile"><RiInformation2Line /></abbr></h2>
                    {showDeliveryFee && <p className='red-indi'>Delivery Selected</p>}
                    {collectionSelected && <p className='red-indi'>Collection Selected</p>}
                    <div className="allCartTotals">
                        <h3>Subtotal</h3>
                        <h3>{(totals.subTotalCart)?.toFixed(2)}</h3>
                    </div>
                    <>
                    {
                    totals.totals < walletFundsCont && showWalletFunds  && walletFundsCont ?
                    <>
                    <p style={{color:"red", fontStyle:"italic"}}> Your remaining { ((totals.subTotalCart - Number(walletFundsCont)).toFixed(2) * -1) } will be added in your wallet. </p>
                    </>
                    :
                    totals.subTotalCart > walletFundsCont && walletFundsCont && !showTotalsDiv ?
                    <p style={{color:"red", fontStyle:"italic"}}> - Wallet Funds  {(walletFundsCont).toFixed(2)}</p> : <></>} 

                    </>
                    {showDeliveryFee ?
                    <>
                    <hr /> 
                    <div className="allCartTotals">
                        <h3>Delivery Fee   </h3>
                        <h3>£ {(deliveryFee)?.toFixed(2)}</h3>
                    </div></> : <></>}
                    
                    <hr />

                    {showNegative  ?
                    <div className="allCartTotals">
                    <h3><b>Totals</b></h3>
                    <h3><b>0.00</b></h3>
                    </div>
                    :
                    <div className="allCartTotals">
                    <h3><b>Totals</b></h3>
                    <h3><b>
                    {showTotalsDiv  && !showNegative ?
                    showDeliveryFee ? (totals.subTotalCart + deliveryFee)?.toFixed(2) : (totals.subTotalCart)?.toFixed(2)
                    :
                    !showTotalsDiv &&  !showNegative &&
                    showDeliveryFee ? 
                    ((totals.totals)?.toFixed(2) - Number((walletFundsCont)).toFixed(2)).toFixed(2):
                    ((totals.subTotalCart)?.toFixed(2)- Number((walletFundsCont)).toFixed(2)).toFixed(2) 
                    }
                
                    </b></h3>
                    </div>}  
                
                {Number(totals.subTotalCart) > 1 ?  
                <div>
                {!ifLoggedIn && !deliverySelected || !collectionSelected ?
                <>
                <button onClick={revertToLoginPop}>
                    {!ifLoggedIn &&  <button>Please Login to Checkout</button> }  
                    {!deliverySelected || !collectionSelected}
                    Please select the order type
                    </button>
              
                </>
                :
                <>
                <Link to="/cardPage" ><button>Proceed to Checkout</button></Link>
                </>
                }
                </div>
                :
                <></>}
                
              
                </div>
                 {ifLoggedIn ?
                 <> 
                <div className="cart-promocode">
                    <h4>Hey <span style={{color:"black"}}>{firstName} !!</span> </h4>
                    <h4>Click  <span onClick={()=>navigateToWallet("/wallet")}style={{color:"blue", cursor: "pointer"}}>here</span>  to redeem your Wallet.</h4>
                    <br />
                    <div>
                        <h4>To remove the Wallet Funds click here !</h4>
                        <button onClick={walletRemover}>Remove</button>
                    </div>
                    </div>
                    </> 
                    :
                    <div className="cart-promocode">
                    <h4>Hey <span style={{color:"black"}}>{firstName} !!</span> </h4>
                    <h4>You may have your funds in Wallet.</h4>
                    <button onClick={revertToLoginPop}>Click here to Login</button>
                    </div>
                    }


                </div>
                
          
                

            </div>

            {toggleBottom ? <BottomSets  setToggle={setToggle} /> : <></>}
        </>
    )
    
}