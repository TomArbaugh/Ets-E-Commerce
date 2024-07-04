import { NavLink } from 'react-router-dom';
import './SideNav.css'; 

const SideNav = () => {
  return (
    <div className='side-nav'>
      <div className='shop-manager'>
        <h2>Shop Manager</h2>
      </div>
      <div className='username'>
        {/* <p>{user.username}</p> */}
      </div>
      <br></br>
      <NavLink to='/your-listings' className='nav-link'>Your Listings</NavLink><br></br>
      <NavLink to='/your-orders' className='nav-link'>Orders: Pending / Completed</NavLink><br></br>
      <NavLink to='/your-purchases' className='nav-link'>Your Purchases</NavLink>
    </div>
  );
};

export default SideNav;