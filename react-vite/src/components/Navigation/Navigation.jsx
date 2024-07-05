import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { RiShoppingCartLine } from "react-icons/ri";
// import { TbBrandEtsy } from "react-icons/tb";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  console.log('Elya - navigation component rendered twice error');

  return (
    <div id='header-container'>
      <div id='logo'>
        <NavLink className='logo-link-to-home' to='/'>
          Home
        </NavLink>  
      </div>
      
      <div className='category-and-search'>
        <div id='header-category'>Category</div>

        <div id='search-bar'>
          <input 
            type="text"
            placeholder='Search for anything'/>
        </div>
      </div>
      
      <div className='two-icons'>
        <div id='login-and-signup'>
          <ProfileButton user={sessionUser}/>
        </div>
        
        <div id='shopping-cart-icon'>
          <NavLink to='/cart'>
            <RiShoppingCartLine />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
