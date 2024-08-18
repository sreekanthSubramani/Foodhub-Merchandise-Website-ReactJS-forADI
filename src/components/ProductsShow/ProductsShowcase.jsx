import React, {useState} from "react";
import "./ProductsShowCase.css";
import { cover_list } from "../../assets/assets";
import toast from "react-hot-toast";
import LazyLoad from "react-lazy-load";



export default function ProdcutsShow({ activeState, setActiveState }) {




  
  return (
    <div className="productsShow" id="productsShow">
      <h2> Explore our products</h2>
      <div className="explore-product">
        {cover_list.map((elem, index) => {
          return (
            <div
              onClick={() => setActiveState((prev) =>prev === elem.category_name ? "Selected" : elem.category_name)}
              className="products-circle"
              key={index}
            >
              <LazyLoad >
              <img
                src={elem.category_image}
                onClick={()=>handleToast(elem.category_name)}
                loading="lazy"
                className={
                  activeState === elem.category_name && toast.success(`${elem.category_name} Selected. Click again to view all` )
                    ? "Active"  
                    : elem.category_name 
                }
              />
              </LazyLoad>

              
              <p> {elem.category_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
