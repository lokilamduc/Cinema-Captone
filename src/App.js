import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout/MainLayout";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import MovieManagement from "./modules/MovieManagement/MovieManagement";


// import Home from "./modules/Home/Home";
// import MovieDetails from "./modules/MovieDetails/MovieDetails";
// import Signin from "./modules/Auth/Signin/Signin";
// import Signup from "./modules/Auth/Signup/Signup";
// import Booking from "./modules/Booking/Booking";

const Home = lazy(() => import("./modules/Home/Home"));
const MovieDetails = lazy(() => import("./modules/MovieDetails/MovieDetails"));
const Booking = lazy(() => import("./modules/Booking/Booking"));
const Signin = lazy(() => import("./modules/Auth/Signin/Signin"));
const Signup = lazy(() => import("./modules/Auth/Signup/Signup"));

function App() {
  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route
              path="/booking/:bookingId"
              element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              }
            />
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route path="movies" element={<MovieManagement />} />
            {/* <Route path="users" element={<UserManagement />} /> */}
            {/* <Route path="tickets" element={<TicketsManagement />} /> */}
          </Route>

      </Routes>
    </BrowserRouter>
    </Suspense>
  );
}

export default App;
