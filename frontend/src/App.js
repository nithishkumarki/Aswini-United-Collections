import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.jsx'; 
import Shopping from './Pages/Shopping.jsx';
import Product from './Pages/Product.jsx';
import Cart from './Pages/Cart.jsx';
import ShopCategory from './Pages/ShopCategory.jsx';
import  LoginSignUp  from './Pages/LoginSignUp.jsx';
import Footer from './Components/Footer/Footer.jsx';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import SearchPage from './Pages/SearchPage.jsx';
import Profile from './Pages/Profile.jsx';
import OrderDetails from './Pages/OrderDetails.jsx';




function App() {
  return (
    <div>
      <BrowserRouter>

        <Navbar/>
        <Routes>
          <Route path='/login' element={<LoginSignUp/>}/>
          <Route path='/' element={<Shopping/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category='men' />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category='women' />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category='kid' />} />
          <Route path='/search' element={<SearchPage/>} />
          
          <Route path='/orderdetails' element={<OrderDetails/>} />

          <Route path='/product' element={<Product />} >
               <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />

        </Routes>
        
        <Footer/>

      </BrowserRouter>

          
    </div>
  );
}

export default App;
