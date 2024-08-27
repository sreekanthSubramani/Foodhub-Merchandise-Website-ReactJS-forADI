import React from 'react'
import '../Home/Home.css'
import Header from '../../components/Header/Header'
import ProdcutsShow from '../../components/ProductsShow/ProductsShowcase'
import {useState} from 'react'
import ProductsDisp from '../../ProductsDisplay/ProductsDisp'
import AppDownload from '../../components/AppDownload/AppDownload'


export default function Home({setLogin}){
    const [activeState, setActiveState] = useState("Selected")
    
    return(
        <div>
            <Header setActiveState={setActiveState} />
            <ProdcutsShow activeState={activeState} setActiveState={setActiveState}/>
            <ProductsDisp category={activeState}/>
            <AppDownload />
        </div>
    )
}



