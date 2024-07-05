import { Outlet } from 'react-router-dom';
import SideNav from '../components/SideNav/SideNav';
import { ModalProvider } from '../context/Modal'; 
import Navigation from '../components/Navigation/Navigation';

const SideNavLayout = () => {
  return (
    <ModalProvider>
      <Navigation />
      <div className="side-nav-layout">
        <SideNav />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </ModalProvider>
  );
};

export default SideNavLayout;

