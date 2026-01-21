import { Outlet } from "react-router";
import Navbar from "../components/layout/Navbar";

function UserLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
export default UserLayout;
