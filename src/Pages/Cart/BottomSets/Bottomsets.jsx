import './Bottomsets.css';
import { AiOutlineClose } from "react-icons/ai";
import { useState, useContext, useEffect } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { StoreContext } from '../../../Context/StoreContext';

export default function BottomSets({ setToggle }) {

    const {setShowDeliveryFee,setDeliveryAddressPDF} = useContext(StoreContext)


    const [deliveryFields, setDeliveryFields] = useState({
        door: "",
        street: "",
        town: "",
        postcode: ""
    });


    
    const copiedDeliveryObj = Object.assign({},deliveryFields)

    useEffect(()=>{
        setDeliveryAddressPDF({
            door : copiedDeliveryObj.door,
            street : copiedDeliveryObj.street,
            town : copiedDeliveryObj.town,
            postcode : copiedDeliveryObj.postcode
        })    
    },[deliveryFields])



    

    const [errors, setErrors] = useState({});
    


    function closeDel() {
        setToggle(prev => !prev);
    }

    const validationSchema = Yup.object({
        door: Yup.string().min(2, "At least enter 2 characters please").required("Please enter the door number / flat number"),
        street: Yup.string().min(2, "At least enter 4 characters please").required("Please enter the street (or) any reference lane"),
        town: Yup.string().min(2, "At least enter 2 characters required").required("Please enter town / city"),
        postcode: Yup.string().min(4, "At least enter 4 characters required").required("Please enter the postcode")
    });

    const handleChangeFields = async (e) => {
        const {name,value} = e.target
        setDeliveryFields({...deliveryFields, [name]:value})
    
        try{
            await validationSchema.validateAt(name,{[name]:value})
            setErrors((prev)=>({...prev, [name] : ""}))
            }catch(e){
            setErrors((prev)=> ({...prev, [name] :e.message}))
        }
    
    };

    const letToast = (del) => toast.success( `${del} Selected`)

  

    const handleSubmitDelivery = async (e) => {
        e.preventDefault();
        try{    
            await validationSchema.validate(deliveryFields, {abortEarly: false})
            setErrors({})
            letToast("Delivery")
            setToggle(false)
            setShowDeliveryFee(true) 
            setOrderCompletionFields(deliveryFields)
        }catch(e){
            const newErrors ={}
            e.inner.forEach(err=> [err.path] = err.message)
            setErrors(newErrors)
        }
    };





    return (
        <div className='from-btm'>
           
            <span className='close-btn-config' onClick={closeDel}><AiOutlineClose /></span>
            <div className='del-details-btm'>
                <h1>Please Enter your Delivery Details....</h1>
            </div>
            <div className='deliveryFields'>
                <div className='delivery-inputs'>
                    <form onSubmit={handleSubmitDelivery}>
                        <div className='gridder'>
                            <div className='field-holder'>
                                <input
                                    type="text"
                                    name="door"
                                    value={deliveryFields.door}
                                    onChange={handleChangeFields}
                                />
                                <label>Door / Flat No</label>
                                {errors.door && <div className='error-disp'>{errors.door}</div>}
                            </div>
                            <div className='field-holder'>
                                <input
                                    type="text"
                                    name="street"
                                    value={deliveryFields.street}
                                    onChange={handleChangeFields}
                                />
                                <label>Street / Lane / Colony</label>
                                {errors.street && <div className='error-disp'>{errors.street}</div>}
                            </div>
                            <div className='field-holder'>
                                <input
                                    type="text"
                                    name="town"
                                    value={deliveryFields.town}
                                    onChange={handleChangeFields}
                                />
                                <label>Town / City</label>
                                {errors.town && <div className='error-disp'>{errors.town}</div>}
                            </div>
                            <div className='field-holder'>
                                <input
                                    type="text"
                                    name="postcode"
                                    value={deliveryFields.postcode}
                                    onChange={handleChangeFields}
                                />
                                <label>Post Code</label>
                                {errors.postcode && <div className='error-disp'>{errors.postcode}</div>}
                            </div>
                        </div>
                        <div className='button-submit-gridder'>
                            <button type='submit' >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
