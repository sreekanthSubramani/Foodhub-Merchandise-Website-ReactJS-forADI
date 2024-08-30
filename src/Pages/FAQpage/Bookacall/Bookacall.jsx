import './Bookacall.css'
import { RiCloseLine } from "react-icons/ri";
import { useState, useRef, useEffect } from 'react';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_red.css";



export default function Bookacall({setcallDisplay,setShowBook}){

    const [showTick, setShowTick] = useState(false)

    
const ref = useRef(null)

useEffect(()=>{
    ref.current.focus()
},[ref])



        const [formState, setFormState] = useState({
            name : "",
            storeName : "",
            number : "+44",
            type:[],
            storeAddress : "",
            callbackDate : "",
            comments : ""
        })

        const disableWeekends =(date)=>{
            const day = date.getDay()
            return (day === 0 || day === 6)
        }
        const disableTimeRange = (date) => {
            const hours = date.getHours();
            return (hours >= 11 && hours < 8); // Disable 11:00 AM to 8:00 PM
          };
        


        const handleSignUpForm = (e)=>{ 
            const {name, value} = e.target
            setFormState({...formState, [name]: value})
        }


   

        const handleSignUpFormChecked =(e)=>{
            const {name, checked} = e.target
            let typeCopy = [...formState.type]

            if(checked){
                typeCopy.push(name)
            }else{
                typeCopy = typeCopy.filter((type)=> type !== name)
            }
            setFormState({...formState.type,type:typeCopy})
        }
        console.log(formState)

        const handleFlatPickr = (selectedDate)=>{
            setFormState({...formState.callbackDate, callbackDate: selectedDate[0]})
        }


        const handleOnSubmitSignUpForm =(e)=>{
            e.preventDefault()
            setShowTick((prev)=> !prev)
        }


        const closureBookaCall = ()=>{
            setShowBook(prev=> !prev)
            setcallDisplay(prev=>!prev)
        }


    
    return(
        <div className='bookaCall-display'>
            <div className='bookaCall-disp'>
          
                <div className="content-inside-bookaCall" style={{display: showTick ? "none" : "flex"}}>
                <span className='flex-letus'>
                <h3>Please let us know more...</h3>
                    <div className='welcome-foodhub'>
                    <h1>Welcome to Foodhub !</h1>
                    <p>Please spend a minute for us to know you better</p>
                    </div>
                </span>
                <span onClick={closureBookaCall}><RiCloseLine /></span>
                </div>


                {showTick && <div className='content-inside-bookaCall'>
                     
                        <div className="content-inside-bookaCall">
                            <div className="flex-letus">
                            <span onClick={()=>setcallDisplay(prev=>!prev)}><RiCloseLine /></span>
                            <h1>Thanks again !!</h1>
                            <br />
                            <div className="afterFinishSignUp">
                            <h2>{formState.storeName} - for the Store,</h2>
                            <h3 style={{color: "red"}}>A Sales Enquiry has been initiated</h3>
                            </div>
                            <p>Click here to <span style={{color:'blue', cursor:"pointer"}} onClick={()=>setShowTick((prev)=> !prev)}>edit</span>  details if needed !!</p>
                            </div>
                        </div>
                     
                     </div>}





                <form onSubmit={handleOnSubmitSignUpForm}>
                    <div className="flex-inside-from" style={{display: showTick ? "none" : "flex"}}>
                    
                    <div className='content-flex'>
                    <h3>Your Name : </h3>
                    <input type="text" name="name" value={formState.name} onChange={handleSignUpForm} ref={ref}/>
                    </div>
                    
                    <div className="content-flex">
                    <h3> Store Name :  </h3>
                    <input type="text" name="storeName" value={formState.storeName} onChange={handleSignUpForm}/>
                    </div>

                    <div className="content-flex-check">
                    <h3> Type : </h3>
                    
                    <div className='checks-form'>
                    <span> 
                    <input type="checkbox" name="delivery" checked={formState.type?.includes("delivery")} onChange={handleSignUpFormChecked}/>
                    Delivery
                    </span>

                    <span> 
                    <input type="checkbox" name="collection"  checked={formState.type?.includes("collection")} onChange={handleSignUpFormChecked}/>
                    Collection
                    </span>

                    <span> 
                    <input type="checkbox" name="restaurant"  checked={formState.type?.includes("restaurant")} onChange={handleSignUpFormChecked}/>
                    Restaurant
                    </span>
                    </div>
                    </div>

                    <div className='content-flex'>
                    <h3>Your Number : </h3>
                    <input type="text" name='number' value={formState.number} onChange={handleSignUpForm}/>
                    </div>

                    <div className='content-flex'>
                    <h3>Store address : </h3    >
                    <input type="text" name="address" value={formState.address} onChange={handleSignUpForm}/>
                    </div>

                    <div className='content-flex'>
                    <h3>Preferance : </h3>
                    <Flatpickr
                    name='callbackDate'
                    data-enable-time
                    onChange={handleFlatPickr} 
                    options={{
                        enableTime: true,
                        disable: [disableWeekends,disableTimeRange],
                        dateFormat: "Y-m-d H:i", 
                        minTime: "11:00",
                        maxTime : "19:3 0"
                    }}/>
                    </div>


                    <div className='content-flex'>
                    <h3>Comments : </h3    >
                    <input type="text" name="comments" value={formState.comments} onChange={handleSignUpForm}/>
                    </div>

                        <div className='submit-btn-bookaCall'>
                        <button type="submit">Submit</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

