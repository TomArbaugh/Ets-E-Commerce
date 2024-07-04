import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import ViewReviews from '../components/ViewReviews/reviews';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import CreateReview from '../components/CreateReview/CreateReview';
import LandingPage from '../components/LandingPage/LandingPage';
import YourListings from '../components/YourListings/YourListings';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import ProductForm from '../components/ProductForm/ProductForm'
import UpdateProductForm from '../components/UpdateProductForm/UpdateProductForm';
import EditReview from '../components/EditReview/EditReview';
import DeleteReview from '../components/DeleteReview/DeleteReview';
import CancelOrder from '../components/CancelOrder/CancelOrder';


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
        path: 'products/new',
        element: <ProductForm />,
      },
      {
        path: 'your-listings',
        element: <YourListings />,
      },
      {
        path: "products/:productId/edit",
        element: <UpdateProductForm />,
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
      {
        path: "products/:productId/edit-review",
        element: <EditReview />
      },
      {
        path: "products/:productId/delete-review",
        element: <DeleteReview />
      },
      {
        path: "orders/:orderId/delete-order",
        element: <CancelOrder />
      }
    ],
  },
]);
