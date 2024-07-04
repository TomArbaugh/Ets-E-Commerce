import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import ViewReviews from '../components/ViewReviews/reviews';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import SideNavLayout from './SideNavLayout';
import CreateReview from '../components/CreateReview/CreateReview';
import LandingPage from '../components/LandingPage/LandingPage';
import YourListings from '../components/YourListings/YourListings';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import ProductForm from '../components/ProductForm/ProductForm';
import UpdateProductForm from '../components/UpdateProductForm/UpdateProductForm';
import YourOrders from '../components/Orders/YourOrders';
import YourPurchases from '../components/Purchases/YourPurchases';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "products/:productId/reviews",
        element: <ViewReviews />,
      },
      {
        path: "products/:productId/create-review",
        element: <CreateReview />
      },
    ],
  },
  {
    element: <SideNavLayout />,
    children: [
      {
        path: 'products/new',
        element: <ProductForm />,
      },
      {
        path: '/your-listings',
        element: <YourListings />,
      },
      {
        path: "products/:productId/edit",
        element: <UpdateProductForm />,
      },
      {
        path: '/your-orders',
        element: <YourOrders />,
      },
      {
        path: '/your-purchases',
        element: <YourPurchases />,
      },
    ],
  },
]);
