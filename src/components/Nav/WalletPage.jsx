import { useState, useEffect, useContext} from "react";
import "./FoodhubWallet.css";
import { auth } from "../FirebaseConfig/FirebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import numWords from 'num-words'
import { StoreContext } from "../../Context/StoreContext";



export default function FoodhubWallet() {
  const [redeemUI, setRedeemUI] = useState(false);
  const [afterRedeemedValue, setRedeemedValue] = useState(0);
  const [topUpUI, setTopUpUI] = useState(false);
  const [numWordsPara, setNumWordsPara] = useState("")
  const [topUpFields, setTopUpFields] = useState({
    topUpValue: "",
    topUpName: "",
    topUpCard: "",
    topUpCVV: "",
  });
  const {ifLoggedIn,setWalletFundsCont,walletFundsCont} = useContext(StoreContext)

  const [wallet, setWalletFunds] = useState(()=>{
    return  parseInt(localStorage.getItem("currentWallet"),10)
  })

  useEffect(() => {
    if (ifLoggedIn && !localStorage.getItem("currentWallet")) {  // Only set if wallet is null (first load)
      setWalletFunds(10);
      localStorage.setItem("currentWallet", 10);
    }
  }, [auth, ifLoggedIn, wallet]);

  useEffect(()=>{

    let storedValue = localStorage.getItem("afterRedeem")
    if(storedValue !== null)
    setRedeemedValue(parseInt(storedValue, 10))
  },[redeemUI])
  
  console.log(afterRedeemedValue)

  const navigatetoCart = useNavigate()
 


  let firstName = auth?.currentUser?.displayName;
  firstName = firstName?.split(" ").slice(0, 1);

  const handleRedeemButton = () => {
    let userInput = "";
    while (userInput !== "yes") {
      userInput = window.prompt(
        `Enter 'yes' to redeem £ ${wallet} Wallet Funds `
      );
    }
    alert("You have successfully redeemed your wallet balance");
    setTopUpUI(false)
    setWalletFundsCont(wallet)
    setRedeemUI(true);
    setRedeemedValue(0);
    toast.success(` £ ${wallet} funds can now be used in your order `);
    localStorage.setItem("afterRedeem", 0)
    localStorage.setItem("currentWallet", 0)
  };

  const handleTopUpButton = () => {
    setTopUpUI(true);
  };


  const topUpFormSubmit = (e) => {
    e.preventDefault();
    toast.success(`£ ${topUpFields.topUpValue} Topped up Successfully...`)

    const newWallet = wallet + parseInt(topUpFields.topUpValue,10)
    setWalletFunds(newWallet)
    localStorage.setItem('currentWallet', newWallet.toString())

    setNumWordsPara(`Top Up Successful of ${topUpFields.topUpValue}`)
    return (
        topUpFields.topUpCVV = "",
        topUpFields.topUpCard = "",
        topUpFields.topUpName = "",
        topUpFields.topUpValue = ""
      )
      };





  const handleTopUpValue =(e)=>{
        const {name,value} = e.target
        setTopUpFields({...topUpFields, [name]:value })
        const numSentence =  numWords(value);
        setNumWordsPara(numSentence)
        
  }

  const handleTopUpName = (e)=>{
    const {name, value} = e.target
    setTopUpFields({...topUpFields,[name]:value })
  }

  const handleCardDetails = (e)=>{
    let value = e.target.value.replace(/\D/g, ""); // Remove all non-numeric characters
    let formattedValue = value.replace(/(.{4})/g, "$1 ").trim(); // Add space every 4 digits
    setTopUpFields((prev) => ({ ...prev, topUpCard: formattedValue }));
  }

  const handleCVVDetails = (e)=>{
    const {name, value} = e.target
    setTopUpFields({...topUpFields,[name]:value })
  }

  console.log(wallet)

  console.log(walletFundsCont)
 

  
  return (
    <>
      <ToastContainer />
      <div className="wallet-height">
        <div>
          <h2>Hi {firstName} 👋 </h2>
          <div className="ptag-denote">
            <p>Your Foodhub Wallet Balance...</p>
          </div>
          <div className="available-wallet">
            <h1>£</h1>
            <div className="wallet-fund">
              <h1>
                {!redeemUI ? (Number(wallet).toFixed(2  )) : afterRedeemedValue.toFixed(2)}
                </h1>
            </div>
            <div className="methods-wallet">
              {!redeemUI && (
                <button className="redeem-btn" onClick={handleRedeemButton}>
                  Redeem
                </button>
              )}
              {!redeemUI ?
              <button className="topup-btn" onClick={handleTopUpButton}>
                Top Up  
              </button>
              :
              <p style={{color: "red"}}>Please use redeemed funds in any order to, Top up your wallet !! </p>}
            </div>
          </div>
        </div>

        <div className="second-Grid">
          {redeemUI ?(
            <div className={!topUpUI ? "congo-redeem" : "display-none"}>
              { 
              <div className="redeemer-UI">
                <h2>
                  Congratulations !!! You have redeemed <br />
                   £ {wallet} Funds for this Order !!
                </h2>
                <button onClick={()=> navigatetoCart("/cart")}>Take me to the Cart</button>
              </div>
              }
            </div>
          ):<></> }

          {topUpUI && !redeemUI ? (
            <div>
              <div>
                <h3>Please enter the details....</h3>
                <form className="form-cardDetails" onSubmit={topUpFormSubmit}>
                  <span> Topup Value : </span>
                  <input
                    type="text"
                    name="topUpValue"
                    value={(Number(topUpFields.topUpValue).toFixed(2))}
                    onChange={handleTopUpValue}
                    maxLength={5}
                    required
                  />
                    <p style={{color:"red", fontStyle: "italic"}}>{numWordsPara} pounds</p>
                  <span> Enter Card Holder Name : </span>
                  <input
                    type="text"
                    placeholder="John Doe"
                    name="topUpName"
                    onChange={handleTopUpName}
                    value={topUpFields.topUpName}
                    required
                  />

                  <span> Enter Card Details</span>
                  <input
                    type="text"
                    placeholder="xxxx xxxx xxxx xxxx"
                    name="topUpCard"
                    value={topUpFields.topUpCard}
                    onChange={handleCardDetails}
                    maxLength={19}
                    required
                  />

                  <span> Enter CVV : </span>
                  <input
                    type="text"
                    placeholder="xxx"
                    name="topUpCVV"
                    onChange={handleCVVDetails}
                    value={topUpFields.topUpCVV}
                    maxLength={3}
                    required
                  />

                  <button
                    type="submit"
                    className="topup-btn-tp"
                  >
                    Top Up Wallet
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
