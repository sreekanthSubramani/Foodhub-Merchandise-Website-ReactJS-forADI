import { createContext, useState, useEffect } from "react";
import {productDetails} from '../assets/assets';
import{searchFilter} from '../assets/assets';
import { forProductInfo } from "../assets/assets";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{
    const deliveryFee = 2
    const [cartAdder, setCartAdder] = useState({})
    const [pageCounter, setPageCounter] = useState(1)
    const [breadCrumbName, setBreadCrumbName] = useState("")
    const [totals, setTotals] = useState({})
    const[showDeliveryFee, setShowDeliveryFee] = useState(false)
    const [ifLoggedIn, setIfLoggedIn] = useState(false)
    const [userMetaData, setUserMetaData] = useState({})
    const[orderCompletionFields, setOrderCompletionFields] = useState(null)
    const[orderTypePDF, setOrderTypePDF] = useState("Collection") 
    const [deliveryAddressPDF, setDeliveryAddressPDF] = useState({})
    const [walletFundsCont, setWalletFundsCont] = useState(0)
    
    const addItem = (itemID) =>{
        if(!cartAdder[itemID]){
            setCartAdder((prev)=>({...prev,[itemID]:1}))
        }else{
            setCartAdder((prev)=>({...prev,[itemID]:prev[itemID]+1}))
        }
    }   

    const removeItem = (itemID)=>{
        setCartAdder((prev)=>({...prev,[itemID]:prev[itemID]-1}))
    }

    useEffect(()=>{
        console.log(cartAdder)

    },[cartAdder])

    const FAQPageContent =  [
        {
            id : 1,
            question : "Where is my Order ?",
            answer : "You may contact the customer service line i.e., +44 01782444282 or drop us an email to hello@foodhub.com"
        },
        {
            id : 2,
            question : "I have chosen Collection Order ? Where should I pick my Order ? ",
            answer : ["If it is a collection order, Please visit our Warehouse to collect the Order", "Address : Foodhub Logistics, Bay 3 Deliveries , Old Tramway, Stoke on Trent, ST4 3NR"],
        },
        {
            id : 3,
            question : "Where can I check my wallet funds ?",
            answer : "After you logged in with your account, In the My Profile Section - Please Click on Foodhub Wallet to see your balance",
        },
        {
            id : 4,
            question : " How does this wallet works ?",
            answer : ["In most cases, the funds in the wallet are provided by Foodhub Management Team for any referrals , for any uncertain issues caused.", "If you already have wallet funds you can top up the wallet to use the next time."],
        },
        {
            id : 5,
            question : "My payment got debited ? But the Order ID not generated ?",
            answer : ["If you face this scenario, Please check with your wallet if the funds are back.", "If not, you can expect your funds to be back in your bank account within 3 - 5 business working days", "Still if you are unsure, Please call us at +4401782444282 or send an email to hello@foodhub.com"],
        },
        {
            id : 6,
            question : "How to sign up with foodhub ?",
            answer : ["Thank you for showing interest on us, Please call us at +44 01782444282 and Press 1 to connect with our sales team."],
        }
    ]



    const contextValue = {
        productDetails,
        cartAdder,
        setCartAdder,
        addItem,
        removeItem,
        searchFilter,
        pageCounter, 
        setPageCounter,
        breadCrumbName, 
        setBreadCrumbName,
        forProductInfo,
        deliveryFee,
        totals,
        setTotals,
        showDeliveryFee, 
        setShowDeliveryFee,
        ifLoggedIn, 
        setIfLoggedIn,
        userMetaData, 
        setUserMetaData,
        orderCompletionFields, 
        setOrderCompletionFields,
        orderTypePDF, 
        setOrderTypePDF,
        setDeliveryAddressPDF,
        deliveryAddressPDF,
        setWalletFundsCont,
        walletFundsCont,
        FAQPageContent
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider