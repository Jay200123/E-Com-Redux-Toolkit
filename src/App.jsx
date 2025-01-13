import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { MainLayout } from "./layout";

import { Home } from "./pages";

function App() {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Public Routes  */}
        <Route element={<MainLayout />}>
          <Route path="/" index element={<Home />} />
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
