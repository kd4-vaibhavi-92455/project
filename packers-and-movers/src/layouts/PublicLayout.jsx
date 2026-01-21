import { Outlet } from "react-router";
import Navbar from "../components/layout/Navbar";

function PublicLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
export default PublicLayout;
