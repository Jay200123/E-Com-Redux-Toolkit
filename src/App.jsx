import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { ProtectedRoutes } from "./components";
import { MainLayout } from "./layout";

import {
  Home,
  Login,
  Register,
  Profile,
  Cart,
  Checkout,
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
