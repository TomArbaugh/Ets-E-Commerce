import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import ViewReviews from '../components/ViewReviews/reviews';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
<<<<<<< HEAD
import CreateReview from '../components/CreateReview/CreateReview'
=======
import LandingPage from '../components/LandingPage/LandingPage';
>>>>>>> dev

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
