import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { lazy, Suspense } from "react";
import NotFound from "../pages/notfound/NotFound";
import MyGigs from "../pages/myGigs/MyGigs";
import Gig from "../pages/gig/Gig";
import Orders from "../pages/orders/Orders";
import Chats from "../pages/chats/Chats";
import Message from "../pages/message/Message";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import ProtectedRoute from "../components/protected/ProtectedRoute";
import PageLoader from "../components/ui/PageLoader";
import ProfilePage from "../pages/profile/ProfilePage";

const Home = lazy(() => import("../pages/home/Home"));
const AddNewGig = lazy(() => import("../pages/addNewGig/AddNewGig"));
const AllGigs = lazy(() => import("../pages/allGigs/AllGigs"));
const BecomeA_Selller = lazy(() =>
  import("../pages/become_Seller/BecomeA_Selller")
);

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <App />
    </>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/become-a-seller",
          element: 
          (
            <Suspense fallback={<PageLoader />}>
              <BecomeA_Selller />
            </Suspense>
          ),
        },
        {
          path: "gigs/:name",
          element: (
            <Suspense fallback={<PageLoader />}>
              <AllGigs />
            </Suspense>
          ),
        },
        {
          path: "gig/:id",
          element: <Gig />,
        },
        {
          path: "profile/:userId",
          element: <ProfilePage />,
        },
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            {
              path: "myGigs",
              element: <MyGigs />,
            },
            {
              path: "orders",
              element: <Orders />,
            },
            {
              path: "messages",
              element: <Chats />,
            },
            {
              path: "message/:chatId",
              element: <Message />,
            },
            {
              path: "add-new-gig",
              element: (
                <Suspense fallback={<PageLoader />}>
                  <AddNewGig />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    // safe for future updates
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_normalizeFormMethod: true,
      v7_skipActionStatusRevalidation: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
