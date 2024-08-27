import "./Nav.css";
import React from "react";
import { assets } from "../../assets/assets";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useContext,useMemo } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { Toaster } from "react-hot-toast";
import BasicCard from './ProfileSection'



const Nav = ({setLogin, setSearchToggle})=>{
  const [currentSelection, setCurrentSelection] = useState("home")

  function handleFilterBar(){
    setSearchToggle(prev=>!prev)
  }

  const{ifLoggedIn} = useContext(StoreContext)


  return(
    <>
      <div><Toaster /></div>
    <div className="navBar">
      <Link to='/'><img src={assets.foodhubLogo} alt="foodhubLogo" className="logo" /></Link>
      <ul className="navBar-menu">
        <li
          onClick={() => setCurrentSelection("home")}
          className={currentSelection === "home" ? "active" : ""}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          onClick={() => setCurrentSelection("app")}
          className={currentSelection === "app" ? "active" : ""}  
        >
            <Link to="cart">Cart</Link>
        </li>
        <li
          onClick={() => setCurrentSelection("contactUs")}
          className={currentSelection === "contactUs" ? "active" : ""}
        >
          <a href="#footerDivUpdated">Contact Us</a>
        </li>
        <li
          onClick={() => setCurrentSelection("menu")}
          className={currentSelection === "menu" ? "active" : ""}
        >
         <Link to="/faqPage"> FAQ </Link>
        </li>
      </ul>
      <div className="navbar-right">
        <FaSearch className="searchLogo" onClick={handleFilterBar}/>
        <div className="navBar-searchIcon">
          <Link to="cart"><FaShoppingCart className="cartLogo"/></Link>
          <div className="dot"></div>
        </div>
    {!ifLoggedIn ?
         <div className="signin-btn">
        <button onClick={()=>setLogin(prev=>!prev)}>Sign in</button>
        </div>
        :
        <BasicCard />}
        
        
      </div>

    </div>
    </>
  );

}

export default Nav;
