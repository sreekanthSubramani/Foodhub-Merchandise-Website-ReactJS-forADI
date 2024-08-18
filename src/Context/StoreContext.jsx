import { createContext, useState, useEffect } from "react";
import {productDetails} from '../assets/assets';
import{searchFilter} from '../assets/assets';
import { forProductInfo } from "../assets/assets";

export const StoreContext = createContext(null)

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
        deliveryAddressPDF
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider