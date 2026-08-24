import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/home/home.jsx";
import NotFoundPage from "./pages/PNF/NotFoundPage.jsx";
import ProfilePage from "./profile/ProfilePage";
import OrderDetails from "./profile/OrderDetails";
import TrackOrder from "./pages/TrackOrder.jsx";
import OrderTrackingDemo from "./pages/OrderTrackingDemo.jsx";
import SpiritualLoader from "./components/SpiritualLoader.jsx";

import CartPage from "./cart/CartPage.jsx";
import CheckoutPage from "./checkout/CheckoutPage.jsx";
import AuthPage from "./authentication/AuthPage.jsx";
import NewProductsPage from "./pages/NewProductsPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CategoryDetails from "./pages/category/CategoryDetails.jsx";
import SignInPage from "./pages/auth/SignInPage.jsx";
import SignupPage from "./pages/auth/SignupPage.jsx";
import CategorySubCategoryDetails from "./pages/category/CategorySubCategoryDetails.jsx";
import AboutUs from "./pages/details/AboutUs.jsx";
import ContactUs from "./pages/details/ContactUs.jsx";
import ReturnExchange from "./pages/details/ReturnExchange.jsx";
import ShippingInfo from "./pages/details/ShippingInfo.jsx";
import FAQPage from "./pages/details/FAQPage.jsx";
import {
  PrivacyPolicy,
  ReturnRefundPolicy,
  ShippingPolicy,
  TermsConditions,
} from "./pages/details/PolicyPages.jsx";
import Invoice from "./profile/Invoice.jsx";
import Invoice1 from "./checkout/Invoice1.jsx";
import ThankYouPage from "./checkout/ThankYouPage.jsx";
import NewProducts from "./pages/newProduct/NewProducts.jsx";
import MobileSearchPage from "./components/Header/MobileSearchPage.jsx";
import BestSellingWallpapers from "./pages/collections/BestSellingWallpapers.jsx";
import NewArrivalsWallpapers from "./pages/collections/NewArrivalsWallpapers.jsx";
import ShopAllWallpapers from "./pages/collections/ShopAllWallpapers.jsx";
import WallpaperCollectionLanding from "./pages/collections/WallpaperCollectionLanding.jsx";
import FabricHomeCollectionLanding from "./pages/collections/FabricHomeCollectionLanding.jsx";
// import Login from "./authentication/Login.jsx";
// import Signup from "./authentication/Signup.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<SpiritualLoader />}>
        <Layout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "/signin", element: <SignInPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/order/:orderId", element: <OrderDetails /> },
      { path: "/track-order", element: <TrackOrder /> },
      { path: "/tracking-demo", element: <OrderTrackingDemo /> },

      { path: "/cart", element: <CartPage /> },
      // { path: "/checkout", element: <CheckoutPage /> },
       { path: "/checkout", element: (
          <RequireAuth>
            <CheckoutPage />
          </RequireAuth>
      ) },
      { path: "/new-product", element: <NewProductsPage /> },
      { path: "/product/:slug", element: <ProductPage /> },
      { path: "/products/:slug", element: <ProductPage /> },
       { path: "/about-us", element: <AboutUs /> },
       {path : "/contact-us", element: <ContactUs />},
       { path: "/shipping-policy", element: <ShippingPolicy /> },
       { path: "/shipping-info", element: <ShippingPolicy /> },
       { path: "/return-refund", element: <ReturnRefundPolicy /> },
       { path: "/retun-exchnage-policy", element: <ReturnRefundPolicy /> },
       { path: "/terms-conditions", element: <TermsConditions /> },
       { path: "/privacy-policy", element: <PrivacyPolicy /> },
       {path : "/return-exchange-preview", element: <ReturnExchange />},
       { path : "/shipping-info-preview", element: <ShippingInfo />},
       { path: "/faq", element: <FAQPage /> },
      //  <Route path="/invoice/:orderId" element={<Invoice />} />
       {path : "/invoice/:orderId", element: <Invoice1 />},
       {path : "/thank-you/:orderId", element: <ThankYouPage />},
       {path : "/order-success/:orderId", element: <ThankYouPage />},
       {path : "/profile/invoice/:orderId", element: <Invoice />},
       {path:"/new-products", element:<NewProducts />},
       {path:"/collections/best-selling-wallpapers", element:<BestSellingWallpapers />},
       {path:"/collections/latest-wallpaper-collection", element:<NewArrivalsWallpapers />},
       {path:"/collections/buy-wallpapers-online", element:<ShopAllWallpapers />},
       {path:"/collections/indian-traditional-wallpapers", element:<WallpaperCollectionLanding />},
       {path:"/collections/chinoiserie-room-wallpapers", element:<WallpaperCollectionLanding />},
       {path:"/collections/tropical-theme-room-wallpapers", element:<WallpaperCollectionLanding />},
       {path:"/collections/amazora-world-art-wallpapers-fabrics", element:<WallpaperCollectionLanding />},
       {path:"/collections/abstract-wallpapers-for-room", element:<WallpaperCollectionLanding />},
       {path:"/collections/pichwai-theme-wallpapers", element:<WallpaperCollectionLanding />},
       {path:"/collections/bedroom-wallpaper-collection", element:<WallpaperCollectionLanding />},
       {path:"/collections/living-room-wallpaper-collection", element:<WallpaperCollectionLanding />},
       {path:"/collections/kids-room-wallpapers", element:<WallpaperCollectionLanding />},
       {path:"/collections/pooja-room-wallpapers", element:<WallpaperCollectionLanding />},
       {path:"/collections/commercial-areas-wallpapers", element:<WallpaperCollectionLanding />},
       {path:"/collections/ceiling-wallpapers", element:<WallpaperCollectionLanding />},
       {path:"/collections/powder-room-wallpapers", element:<WallpaperCollectionLanding />},
       {path:"/collections/wardrobe-wallpapers", element:<WallpaperCollectionLanding />},
       {path:"/collections/2026-wallpaper-collection", element:<WallpaperCollectionLanding />},
       {path:"/collections/suneherii-wallpaper-collection", element:<WallpaperCollectionLanding />},
       {path:"/collections/neelvana-collection-by-life-n-colors-shabnam-gupta", element:<WallpaperCollectionLanding />},
       {path:"/collections/atarangi-affordable-wallpaper-collection", element:<WallpaperCollectionLanding />},
       {path:"/collections/ready-made-curtains", element:<FabricHomeCollectionLanding />},
       {path:"/collections/sofa-and-chair-fabric", element:<FabricHomeCollectionLanding />},
       {path:"/collections/cushion-covers", element:<FabricHomeCollectionLanding />},
       {path:"/collections/tabler-runners-mats", element:<FabricHomeCollectionLanding />},
       {path:"/collections/stitched-stories-hand-embroidered-wall-art", element:<FabricHomeCollectionLanding />},
       {path:"/collections/wallart-posters", element:<FabricHomeCollectionLanding />},
       {path:"/collections/beautiful-curtain-tie-backs", element:<FabricHomeCollectionLanding />},
       {path :"/search", element:<MobileSearchPage />},

      // {path: "/auth", element: < Login/>},
      { path: "/auth", element: < AuthPage /> },
      { path: "/:categorySlug", element: <CategoryDetails /> },
      {
        path: "/:categorySlug/:subCategorySlug",
        element: <CategorySubCategoryDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
