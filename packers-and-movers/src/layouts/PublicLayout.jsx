import { Outlet } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/common/Footer";

function PublicLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
export default PublicLayout;
