import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { ProtectedRoutes } from "./components";
import { MainLayout, CategoryLayout } from "./layout";

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
           <Route
            path="products/category"  
            index
            element={      
                <ProductCategory />
            }
          />
           </Route>

          {/* Protected Routes */}
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
            path="/checkout"
            index
            element={
              <ProtectedRoutes userRole={["User"]}>
                <Checkout />
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
