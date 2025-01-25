import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { ProtectedRoutes } from "./components";
import { MainLayout, CategoryLayout, ProfileLayout } from "./layout";

import {
  Home,
  Login,
  Register,
  Profile,
  Cart,
  Checkout,
  EditProfile,
  ProductCategory,
  ProductDetails,
  OrderDetails,
  Orders,
  Ratings,
  BrandCategory,
  Shop,
} from "./pages";

function App() {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Public Routes  */}
        <Route element={<MainLayout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/register" index element={<Register />} />

          <Route path="/login" index element={<Login />} />
          <Route path="/cart" index element={<Cart />} />
          <Route path="/product/:id" index element={<ProductDetails />} />

          <Route element={<CategoryLayout />}>
            <Route path="products/category" element={<ProductCategory />} />
            <Route path="products/brand" element={<BrandCategory />} />
            <Route path="shop" element={<Shop />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProfileLayout />}>
            <Route
              path="/profile"
              index
              element={
                <ProtectedRoutes userRole={["User"]}>
                  <Profile />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/profile/edit"
              index
              element={
                <ProtectedRoutes userRole={["User"]}>
                  <EditProfile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/user/orders"
              index
              element={
                <ProtectedRoutes userRole={["User"]}>
                  <Orders />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/user/order/:id"
              index
              element={
                <ProtectedRoutes userRole={["User"]}>
                  <OrderDetails />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/user/ratings"
              index
              element={
                <ProtectedRoutes userRole={["User"]}>
                  <Ratings />
                </ProtectedRoutes>
              }
            />
          </Route>

          <Route
            path="/checkout"
            index
            element={
              <ProtectedRoutes userRole={["User"]}>
                <Checkout />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
