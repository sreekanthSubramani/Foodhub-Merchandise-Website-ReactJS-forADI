import { useState } from 'react'
import React from 'react'
import Nav from './components/Nav/Nav'
import { Route, Routes, useLocation,useParams } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup.jsx/Loginpop'
import Searcher from './components/Nav/SearchFilter'
import ProductInfo from './Pages/Product-Info/ProductInfo'
import Basket from './Pages/BasketPage/Basket'
import CardItems from './Pages/Card-Items/Carditems'
import StepperComponent from './StepperComp/StepperComponent'
import FoodhubWallet from './components/Nav/WalletPage'

const App = () => {
    const [login, setLogin] = useState(false)
    const [searchToggle,setSearchToggle] = useState(false)
    const location = useLocation()

    const shouldDisplayNavFooter = location.pathname !== '/cardPage' 
    const shouldNotDispBasket = location.pathname !=='/orderCompletion'
    const {id} = useParams()
  
  return (
    <>
    {login ? <LoginPopup setLogin={setLogin} login={login}/> : <></> }
    {searchToggle ? <Searcher setSearchToggle={setSearchToggle} />: null}
    <div className='app'>
    {shouldDisplayNavFooter && <Nav setLogin={setLogin} setSearchToggle={setSearchToggle} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/cardPage" element={<CardItems />} />
        <Route path="/products" element={<Home/>} />
        <Route path= "/product/item/:id" element={<ProductInfo/>} />
        <Route path="/orderCompletion" element={<StepperComponent />} />
        <Route path="/wallet" element={<FoodhubWallet />}/>
        </Routes>  
        {shouldDisplayNavFooter && shouldNotDispBasket && <Basket /> }

      </div>
      {shouldDisplayNavFooter && <Footer />}

      </>
  )
}

export default App