import { useParams } from "react-router-dom";
import IconBreadcrumbs from "./Breadcrumbs";
import {useState,useContext, useEffect, useRef, useCallback} from 'react';
import { StoreContext } from "../../Context/StoreContext";
import './ProductInfo.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import StarIcon from '@mui/icons-material/Star';
import TextRating from "./StarRating";
import { Link } from "react-router-dom";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'; 


export default function ProductInfo(){
    const{breadCrumbName} = useContext(StoreContext)  
    const {forProductInfo} = useContext(StoreContext)
    const [recommendedProducts, setRecommendedProd] = useState([])
    const { cartAdder, addItem, removeItem } = useContext(StoreContext);

    const productFinder = forProductInfo.find(item=> breadCrumbName === item.name)
    
    const {setBreadCrumbName} = useContext(StoreContext)

    const focus = useRef(null)



    let min = 0
    let max = 500

    useEffect(()=>{
        handleRangeBar()
        focus.current.focus()
    },[productFinder,breadCrumbName])
    
    


    function handleRangeBar(){
        const rangeBar = document.getElementById("range-bar")
        const percent = ((min - productFinder?.productsLeft) / (min - max) * 100)
        rangeBar.style.background = `linear-gradient(to right, red ${percent}%, #ddd ${percent}%`
        rangeBar.style.animation = "mover"
    }
 
    function youMightAlsoLike(arr, count){
        for(let i=arr.length -1; i >0; i--){
            var j = Math.floor(Math.random() * (i * 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.slice(0,count)
    }

    const randomElementsDiv = youMightAlsoLike([...forProductInfo], 3)
  

    useEffect(()=>{
        setRecommendedProd(randomElementsDiv)
    },[])



    function handleLinkProd(theProdName){
        console.log(theProdName)
        setBreadCrumbName(theProdName)
    }


    return(
        <div>
            <IconBreadcrumbs />
            
            <div className="height-occupancy" >
                    
                <div className="carousel-images" >
                <Carousel>
                <div>
                    <img src={productFinder?.image} />
                </div>
                <div>
                <img src={productFinder?.image} />
                </div>
                <div>
                    <img src={productFinder?.image} />
                </div>
            </Carousel>
            <div className="amazon-content">
                            <h4>If the items are out of stock, or if you would like to compare the prices :-</h4>
                            <p>Amazon Finder : {productFinder?.amazonLink ? <a href={productFinder?.amazonLink} target="_blank"><span style={{color : "blue", textDecoration : "underline"}}>{productFinder?.amazonLink}</span></a>: <span>Oops not available !!</span> }</p> 
                        </div>
                    
                </div>


                    <div className="product-info-details-anim" key={productFinder?.id} >
                    <h2>{breadCrumbName}</h2>
                    <hr />
                    <br />
                    <div className='stock-status'>
                    <h3>{productFinder?.stock} </h3> <span className="veri"><VerifiedIcon /></span>
                    <span><TextRating rating={productFinder?.ratings}/></span>
                    </div>
                    <div id="productInfo-rangebar">
                        <input type="range" id="range-bar" min={min} max={max} value={productFinder?.productsLeft}ref={focus}  readOnly/>                       
                        <p>{productFinder?.productsLeft} Items Left in stock </p>
                    </div>
                    <br />
                    
                    <div className="add-Cart-prInfo">
                    <h3>Price : £ {productFinder?.price}</h3>
                    {!cartAdder[productFinder?.id] ?
                    <div>
                        <button onClick={() => addItem(productFinder.id)}>Add to Cart</button>
                    </div> : 
                <div className="afterCartAdder">    
                <span className="bgAdder-flex" >
                <span className="plusOne-prod">
                <ArrowCircleUpIcon 
                  onClick={() => addItem(productFinder.id)}
                  fontSize="large"
                />
                <h3>{cartAdder[productFinder.id]}</h3>
                <ArrowCircleDownIcon
                  onClick={() => removeItem(productFinder.id)}
                fontSize="large"
                />
                </span>
              </span>
              </div> }
                    
                    </div>
                    
                    <div className="anim-del-pay">
                    <span> <LocalShippingIcon/> </span>
                    <p>Fast Delivery </p> 
                    <span><CreditScoreIcon/></span>
                    <p>Safe Payment</p>  
                    <span><StarIcon/></span>
                    <p>Best Quality</p>
                    </div>

                    <div className="productDescription-prInfo">
                        <h3>Details : </h3>
                    </div>
                        {productFinder?.description.map((elem,index)=>{
                            return(
                                <div className="listBold">
                                <li key={index}>
                                    {elem}
                                </li>
                                </div>
                            )
                        })}
                        <br />
                        <h3>You may also like :</h3> 
                        <br />
                        <div className="youMightLike-products"  >
                            {recommendedProducts.map(items=>{
                                return(
                                <Link to={`/product/item/${items.name}`} key={`${items.id}-${items.name}`}> 
                                <div className="like-products" onClick={()=>handleLinkProd(items.name)} >
                                    <div className="itemName-like">
                                    <p className="itemName-like">{items.name}</p>
                                    </div>
                                    <br />
                                    <div className="imagePic-like">
                                    <img  src={items.image} alt={items.name} />
                                    </div>
                                    <div className="slightup-price">
                                    <p className="pFavProd">Price : £{items.price} </p> 
                                    </div>
                                    <div className="stock-like-prod">
                                    {items.description.map(it=>{
                                        return(
                                            <li key={it}>{it}</li>
                                        )
                                    })}
                                    </div>
                                    </div></Link>
                                )
                            })}
                        </div>

                    </div>
                        
            </div>
            
            
                
             
        </div>
    )
}