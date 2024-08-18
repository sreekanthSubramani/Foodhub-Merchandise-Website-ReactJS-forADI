import React, { useContext, useState, useEffect } from "react";
import { VscVerifiedFilled } from "react-icons/vsc";
import "../ProdItem/ProdDisp.css";
import { RxPlusCircled } from "react-icons/rx";
import { PiMinusCircleBold } from "react-icons/pi";
import { StoreContext } from "../Context/StoreContext";
import { MdOpenInNew } from "react-icons/md";
import {Link} from 'react-router-dom'



export default function ProdDisplay({ id, name, price, description, image }) {
  const { cartAdder, addItem, removeItem } = useContext(StoreContext);
  const [Truncate, setTruncate] = useState("");
  const [toggleList, setToggleList] = useState(false);
  const [fullList, setFullList] = useState([]);
  const {setBreadCrumbName} = useContext(StoreContext)




  const truncator = (str, num) => {
    return str[0].slice(0, num) + "(read more...)";
  };  

  useEffect(() => {
    setTruncate(truncator(description, 45));
  }, [description]);

  useEffect(() => {
    setFullList(description);
  }, [description]);


  function handleName(name){
    setBreadCrumbName(name)
  }
  
  function handleFullList() {
    setToggleList((prev) => !prev);
  } 




  return (
    <div className="pr-item" >
       <Link to={`/product/item/${name}`}><abbr title="Open in New Tab" className="re-direct-span"><MdOpenInNew onClick={(()=>handleName(name))}/></abbr></Link>
      <div className="pr-item-container">
        <img className="prodImag" src={image} loading="lazy"/>
      </div>
      <div className="pr-name-info">
        <h3>{name}</h3> 
      </div>
      <div>
      <span ><VscVerifiedFilled className="ticker" /> Pickup Available at Fenn House Warehouse </span> 
      </div>
      <div className="pr-descp">
        <h4>Description : </h4>
        <div onClick={() => handleFullList()} className="changePointer">
          {toggleList ? (
            <div key={name}>
              {fullList.map((elem) => {
                return <li className="slowerElem">{elem}</li>;
              })}
            </div>
          ) : (
            <li>{Truncate}</li>
          )}
        </div>
      </div>
      <div className="pr-price">
        <h3>
          Price : <span> £ {(parseFloat(price))} </span>
          <div>
      
          </div>
          <div id="counterFunc">
            {!cartAdder[id] ? (
              <span>
                <button onClick={() => addItem(id)} id="plusIcon">
                  Add to cart
                </button>
              </span>
            ) : (
              <span id="bgAdder" >
                <PiMinusCircleBold
                  onClick={() => removeItem(id)}
                  id="minusOne"
                />
                <h3 id="total-nums-cart">{cartAdder[id]}</h3>
                <RxPlusCircled
                  onClick={() => addItem(id)}
                  id="plusOne"
                />
              </span>
            )}
          </div>
        </h3>
      </div>
    </div>
  );
}
