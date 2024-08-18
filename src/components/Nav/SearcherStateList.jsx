import { useState, useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import './SearchState.css'
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useNavigate,Link } from 'react-router-dom';



export default function SearcherState({ stateSelected,setSearchToggle }) {
    const { searchFilter,setBreadCrumbName } = useContext(StoreContext);
    const navigate = useNavigate()

    

    const selectedItem = searchFilter.find(item => item.name === stateSelected);



    function handleToItem(){
        setBreadCrumbName(stateSelected)
        navigate(`product/item/${stateSelected}`)
        setSearchToggle(prev=> !prev)
    }


    return (
        <div className='searchState-wrapper'>
            <h4>{stateSelected}</h4>
            <div className='sub-wrapper-searchState'>
                {selectedItem ? (
                    <>
                    <div className='grid-temp-searchState'>
                        <img src={selectedItem.img} alt={selectedItem.name} className='images-css' />
                        <div className='gapper'> 
                            <div>
                                <div className='stock-status'>
                                    <h3>Status : </h3>
                                    <h3>{selectedItem.stock}</h3>
                                    <span><MdOutlineVerifiedUser className='instock'/></span>
                                </div>
                                <div className='price-state'>
                                <div>
                                    <h3>Price : </h3>
                                </div>
                                <div>
                                    <h3>£ {selectedItem.price}</h3>
                                </div> 
                                </div>
                                <div>
                                </div>
                            </div>
                         </div>     
                         <div className='button-container'>
                         <div className='navigate-btn'>
                         <button onClick={()=>handleToItem()}>Navigate to the Item</button>
                         </div>
                    </div>
                         
                         </div>
                        
                         
                    
                    </>
                ) : (
                    <p>No matching item found.</p>
                )}
            </div>
        </div>
    );
}