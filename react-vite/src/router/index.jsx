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

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
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
      // {
      //   path: "products/:productId/edit-review",
      //   element: <EditReview />
      // },
      // {
      //   path: "products/:productId/delete-review",
      //   element: <DeleteReview />
      // }
    ],
  },
]);
