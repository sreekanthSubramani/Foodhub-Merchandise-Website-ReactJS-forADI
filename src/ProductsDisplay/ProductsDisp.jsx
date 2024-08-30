import React, { useContext, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import ProdDisplay from "../ProdItem/ProdDisplay";
import "../ProductsDisplay/ProductsDisp.css";
import PaginationRounded from "./PaginationMUI";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useNavigate } from "react-router-dom";
import LazyLoad from 'react-lazy-load';
import { RiDiscountPercentLine } from "react-icons/ri";
import { FaHandHoldingHeart } from "react-icons/fa";
import Bookacall from './../Pages/FAQpage/Bookacall/Bookacall'



const ProductsDisp = ({ category }) => {
  const { productDetails } = useContext(StoreContext);
  const { pageCounter,setBreadCrumbName } = useContext(StoreContext);
  const [useSmartFeature, setUseSmartFeature] = useState(false)
  const [budgetFilter, setBudgetFilter] = useState(parseInt(parseFloat(0)))
  const [showBook, setShowBook] = useState(false)



  const navigate = useNavigate()
  const max = 1000
  const min = 10
  
  const itemsPerPage = 6
  const filteredProducts = productDetails.filter(item => category === "Selected" || category === item.category)
  const paginatedProducts = filteredProducts.slice((pageCounter * itemsPerPage) - itemsPerPage, pageCounter * itemsPerPage) 

  const handleBudget = (e) =>{
    const valueFilter = parseInt(parseFloat(e.target.value), 10)
    if(valueFilter <= max && valueFilter <= min ){
      setBudgetFilter(valueFilter)
    }else{
      setBudgetFilter(valueFilter)
    }
  }
  

    const filterAccordingly = productDetails.filter(item=> parseInt(parseFloat(item.price)) <= parseInt(parseFloat(budgetFilter)))

  
  const checkedFeature =(e)=>{
    setUseSmartFeature(e.target.checked)
    }

    const handleDecrement = ()=>{
      if(budgetFilter > 0){
        setBudgetFilter((prev) => prev - 50)
      }else{
        setBudgetFilter(0)
      }
    }

    const handleIncrement = () => {
     if(budgetFilter < 1000){
      setBudgetFilter((prev) => prev + 50)
     }else{
      setBudgetFilter(50)
     }
    };
  
    function redirectToItem(e){
      const selectedProduct = e.target.value
      let toSetUntilProdName = selectedProduct.slice(0, selectedProduct.indexOf("-"))
      toSetUntilProdName = toSetUntilProdName.trimEnd()
      console.log(toSetUntilProdName)
      setBreadCrumbName(toSetUntilProdName)
      return navigate(`/product/item/${toSetUntilProdName}`)
    }


  return (
    <div className="prod-display" id="prod-display-menu1">
      {showBook && <Bookacall setShowBook={setShowBook}/>}
      <p>Products for you...</p> 
       
       
       <marquee>
      <div style={{display :"flex", padding: "10px", gap:"150px", color: "red"}}>
       <div> <h4>Love <FaHandHoldingHeart color="black"/> Local</h4></div>
        <div> <h4>Be a supersaver <RiDiscountPercentLine className="discount-Tag"/></h4></div>
        <div><h4>Queries Helpdesk - <span style={{color: "black"}}>hello@foodhub.com</span></h4></div>
        <div><h4>Make use of your <span style={{color: "black"}}>Wallet funds</span></h4></div>
        <div><h4>Sign up with Foodhub by clicking <span style={{color: "black", textDecoration:"underline", cursor:"pointer"}} onClick={()=>setShowBook(prev=> !prev)}>Sign Up Form </span></h4></div>
        </div>
        </marquee>
     
      
      <div className="smartFilter">
        <h3>Smart Filter</h3>
        <div className="new-feature-div" id="smartFilter">
      <input type="checkbox" onChange={checkedFeature} checked={useSmartFeature}/>
      <h4>Use this feature</h4> 
      </div>
      {useSmartFeature ? 
        <>
        <h6>(Filter according to your budget)</h6>
        <input type="range" onChange={handleBudget} max={1000} min={10} value={budgetFilter}  />
        <div className="arrows-to-filter">
        <KeyboardDoubleArrowLeftIcon onClick={handleDecrement} />
        <span>£ {(parseInt(budgetFilter)).toFixed(2)}</span>
        <KeyboardDoubleArrowRightIcon onClick={handleIncrement} />
        </div>
        <h3>Showing you all products under {budgetFilter} GBP</h3>
        {budgetFilter > 0 &&
                <select className="option-listers" name="select-product"onChange={(e)=>redirectToItem(e)}> 
                <option value=""> Select your product</option>
                {filteredProducts.map((elem,index)=>{
                  if(elem.price <= budgetFilter)
                    return(  
              <option className="option-listers-1" 
                key={index}
                name={elem.name}
                id="dataList"> 
                {elem.name} - £{(elem.price).toFixed(2)}
                </option>
            )
          })}  
          </select>}
        </>
      :
      <></>
      }
    
      </div>


      
      {!useSmartFeature ?
        <div className="prod-display-list">
        {paginatedProducts.map((item, index) => (
          <LazyLoad key={index}>
          <ProdDisplay
            key={index}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
          </LazyLoad>
        ))}
        </div>
        :
  <>
  {budgetFilter < 0 && <h4 className="filt-showpop"> " Increase or decrease for 50GBP on above slider or use above arrows " </h4>}
<div className="prod-display-list">
{filterAccordingly.map((item, index) => (
          <LazyLoad>
          <ProdDisplay
            key={index}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
          </LazyLoad>
        ))}
</div>
</>      
}


{!useSmartFeature &&
      <div className="pagination-style">
        <PaginationRounded itemsPerPage={itemsPerPage} totalCount = {filteredProducts.length} category={category}/>
      </div>}
    </div>
  );
};

export default ProductsDisp;
