import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { RiShoppingCartLine } from "react-icons/ri";
import { TbBrandEtsy } from "react-icons/tb";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <div id='header-container'>
      <div id='logo'>
        <NavLink className='Esty-logo-link-to-home' to='/'>
          <TbBrandEtsy />
        </NavLink>  
      </div>

      <div id='header-category'>Category</div>

      <div id='search-bar'>
        <input 
          type="text"
          placeholder='Search for anything'/>
      </div>

      <div id='login and sigup'>
        <ProfileButton user={sessionUser}/>
      </div>
      
      <div id='shopping-cart-icon'>
      <RiShoppingCartLine />
      </div>
    </div>
  );
}

export default Navigation;
