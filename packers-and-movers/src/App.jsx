import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router";
import ThemeProvider from "./providers/ThemeProvider";
import Home from "./pages/Home";
import PublicLayout from "./layouts/PublicLayout";

import Footer from "./components/common/Footer";
import AuthProvider from "./providers/AuthProvider";
import Dashboard from "./modules/customer/Dashboard";
import Login from "./modules/auth/Login";
// import UserLayout from "./layouts/UserLayout";
import ProtectedRoute from "./auth/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import { useLocation } from "react-router";
import Contact from "./pages/Contact";
import SignUp from "./modules/auth/SignUp";
import Services from "./pages/Services";

//const excludedPaths = ["/footer"];

function App() {
  const location = useLocation();
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* visitor layout */}
          <Route path="/project" element={<PublicLayout />}>
            <Route path="/project" index element={<Home />} />
            <Route path="/home" index element={<Home />} />
            <Route path="/services" index element={<Services />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/footer" element={<Footer />} />
            {/* <Route path="about" element={<About />} /> */}
            {/* <Route path="contact" element={<Contact />} /> */}
            {/* <Route path="services" element={<Services />} /> */}
          </Route>
          {/* <Route path="/customer" element={<CustomerDashboard />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* protected routes */}
          {/* <Route path="/user" element={<UserLayout />}> */}
          {/* <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* </Route> */}

          <Route path="/not-found" element={<PageNotFound />} />

          {/* user layout */}
          {/* <Route path="/user">
          <Route index element={<Navbar />} />
        </Route> */}
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
