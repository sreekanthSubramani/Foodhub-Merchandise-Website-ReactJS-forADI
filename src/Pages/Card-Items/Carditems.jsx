import "./CardItems.css";
import { FaGooglePay } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function CardItems() {
  const [cardField, setCardField] = useState({
    cardNumber: "",
    cvvNumber: "",
    holderName: "",
  });


  const locateStepper = useNavigate() 

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove all non-numeric characters
    let formattedValue = value.replace(/(.{4})/g, "$1 ").trim(); // Add space every 4 digits
    setCardField((prev) => ({ ...prev, cardNumber: formattedValue }));
  };
  

const handleCardFieldChange = (e)=>{
    const {name,value} = e.target
    setCardField({...cardField, [name]: value})
}
const handleCVVChange  = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove all non-numeric characters
    if (value.length > 6) {
      value = value.slice(0, 6); // Limit to 6 digits
    }
    setCardField((prev) => ({ ...prev, cvvNumber: value }));
  };
console.log(cardField)


const navigateToStepper = (e)=>{
    e.preventDefault()
    console.log("Submit")
    return locateStepper("/orderCompletion")
}



  return (
    <div className="height-cardpage">
      <div className="card-details">
        <form onSubmit={navigateToStepper} >
          <h3>Pay using Card</h3>
          <input
            name="cardNumber"
            type="text"
            placeholder="1234 1234 1234 1234"
            onChange={handleCardNumberChange}            
            value={cardField.cardNumber}
            maxLength={19}        
            required
          />
          <input
            name="cvvNumber"
            type="number"
            placeholder="enter your CVV"
            onChange={handleCVVChange}      
            value={cardField.cvvNumber}
            maxLength={6}
            required
            />

          <input
            name="holderName"
            type="text"
            placeholder="Enter Account Holder Name"
            onChange={handleCardFieldChange}      
            value={cardField.holderName.toUpperCase()}
            required
            />

          <button >Pay</button>
        </form>
        <div className="gpay-div">
          <span>
            <FaGooglePay />
          </span>
          <button>Use Gpay</button>
        </div>
      </div>
    </div>
  );
}
