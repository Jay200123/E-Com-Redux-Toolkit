import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { ProtectedRoutes } from "./components";
import {
  MainLayout,
  CategoryLayout,
  ProfileLayout,
  AdminLayout,
  MainAdminLayout,
} from "./layout";

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
  Menu,
  OrderRating,
  CreateRating,
  Dashboard,
  BrandTable,
  CreateBrand,
  GetBrandById,
  EditBrand,
  UserTable,
  GetUserById,
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
          <Route path="/menu" index element={<Menu />} />

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

            <Route
              path="/order/ratings"
              index
              element={
                <ProtectedRoutes userRole={["User"]}>
                  <OrderRating />
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
          <Route
            path="/product/rating/:id"
            index
            element={
              <ProtectedRoutes userRole={["User"]}>
                <CreateRating />
              </ProtectedRoutes>
            }
          />
        </Route>

        <Route element={<MainAdminLayout />}>
          <Route element={<AdminLayout />}>
            <Route
              path="/admin/dashboard"
              index
              element={
                <ProtectedRoutes userRole={["Admin"]}>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/brands"
              element={
                <ProtectedRoutes userRole={["Admin"]}>
                  <BrandTable />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/create/brand"
              element={
                <ProtectedRoutes userRole={["Admin"]}>
                  <CreateBrand />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/brand/:id"
              element={
                <ProtectedRoutes userRole={["Admin"]}>
                  <GetBrandById />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/edit/brand/:id"
              element={
                <ProtectedRoutes userRole={["Admin"]}>
                  <EditBrand />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoutes userRole={["Admin"]}>
                  <UserTable />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/user/:id"
              element={
                <ProtectedRoutes userRole={["Admin"]}>
                  <GetUserById />
                </ProtectedRoutes>
              }
            />
          </Route>
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
