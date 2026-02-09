import { useProduct } from '../context/ProductContext';
import {NavLink,Routes,Route} from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import Home from './Home';

import MyPage from './MyPage';
import Cart from './Cart';

export default function Section({setCartItems, cartItems, isLogin, id, handleApplyCoupon, handleAddToCart, appliedDiscount, cartInput, selectedIds,  selectedProductTotal,  discountAmount, deliveryFee, finalTotal }) {
    const { product } = useProduct();
    return (
    <section className="section">
        <div className="mainContainer">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/productList/*' element={<ProductList />} />
                <Route path='/productDetail/*' element={<ProductDetails  handleAddToCart={handleAddToCart} isLogin={isLogin}/>} handleAddToCart={handleAddToCart}/>
                <Route path="/myPage" element={<MyPage id={id} coupons={[{ id: 1, name: '50% 쿠폰' }]} handleApplyCoupon={handleApplyCoupon} />} />
                <Route path="/cart" element={<Cart handleAddToCart={handleAddToCart} isLogin={isLogin} id={id} cartInput={cartInput} cartItems={cartItems}
                                                appliedDiscount={appliedDiscount} setCartItems={setCartItems}
                                                selectedIds={selectedIds} selectedProductTotal={selectedProductTotal}  discountAmount={discountAmount} deliveryFee={deliveryFee} 
                                                finalTotal={finalTotal} handleApplyCoupon={handleApplyCoupon}/>} />
            </Routes>
        </div>
        <div className="chatSupport">
            <img src="/public/images/talk-icon-brown.jpg" />
        </div>
    </section>
)}//Section