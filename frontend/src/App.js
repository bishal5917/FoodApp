
import './App.css';
import Home from './Home/Home';
import Main from './SellerDashboard/Main/Main';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from './Login/Login';
import HotelFood from './HotelFood/HotelFood';
import SearchHotels from './SearchHotels/SearchHotels';
import IndividualFood from './IndividualFood/IndividualFood';
import Register from './Register/Register';
import SR from './SellerRegister/SR';
import SellerLogin from './SellerRegister/SellerLogin';
import Analytics from './SellerDashboard/Analytics/Analytics';
import Products from './SellerDashboard/Products/Products';
import Orders from './SellerDashboard/Orders/Orders';
import Food from './Home/Food';
import SingleProduct from './SellerDashboard/SingleProduct/SingleProduct';
import Redirect from './commonitems/redirect';
import OrderInfo from './SellerDashboard/OrderInfo/OrderInfo';
import UserOrderPage from './Userpage/UserOrderPage';
import Orderstatus from './orderStatus/Orderstatus';
import ProfileEdit from './ProfileEdit/ProfileEdit';
import SAccount from './SellerDashboard/SAccount/SAccount';
import Hotels from './ShowHotels/ShowHotels';
import ResetPass from './Login/ResetPass';
import SellerPassReset from './SellerRegister/SellerPassReset';

function App() {
  return (
    <div className="" >
      <Router>
        <div className='' >
          <Routes  >
            <Route exact path="/" element={<Home />} />
            <Route exact path="/registerseller" element={<SR />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/hotels" element={<Hotels />} />
            <Route exact path="/gethotels" element={<SearchHotels />} />
            <Route exact path="/individualfood/:foodId" element={<IndividualFood />} />
            <Route exact path="/userorderpage" element={<UserOrderPage />} />
            <Route exact path="/food" element={<Food />} />
            <Route exact path="/user/resetpass" element={<ResetPass />} />
            <Route exact path="/seller/resetpass" element={<SellerPassReset />} />
            <Route exact path="/hotel/:hotelId" element={<HotelFood />} />
            <Route exact path="/orderstatus/:ordId" element={<Orderstatus />} />
            <Route exact path="/loginseller" element={<SellerLogin />} />
            <Route exact path="/useraccount/:aid" element={<ProfileEdit />} />
            <Route exact path="/sellerdashboard" element={<Main />}>
              <Route path="" element={<Analytics />} />
              <Route path="products" element={<Products />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="orders" element={<Orders />} />
              <Route path="product/:prodId" element={<SingleProduct />} />
              <Route path="sellerorder/:orderId" element={<OrderInfo />} />
              <Route path="saccount" element={<SAccount />} />
            </Route>
            <Route path="*" element={<Redirect />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App;