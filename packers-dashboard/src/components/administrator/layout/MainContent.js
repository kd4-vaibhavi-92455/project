import React from "react";
import { Box, Toolbar } from "@mui/material";
import { Routes, Route } from "react-router-dom";

// Companies
import AddCompany from "../companies/AddCompany";
import DisplayAllCompanies from "../companies/DisplayAllCompanies";

// Products / Items / Pages
import AddProductList from "../listproducts/AddProductList";
import DisplayProductList from "../listproducts/DisplayProductList";

// Dashboard
import DashboardOverview from "./DashboardOverview";

// Bookings
import BookingReport from "../packersSearchBookings/BookingReport";

// Dummy pages for other menu items
const DummyPage = ({ title }) => (
  <Box sx={{ p: 3 }}>
    <h2>{title}</h2>
    <p>This is a placeholder page for {title}.</p>
  </Box>
);

const MainContent = ({ companyid }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: "99vh",
        width: { sm: `calc(100% - 240px)` },
        overflow: "auto",
        background: "#EDEDED",
      }}
    >
      <Toolbar />
      <Routes>
        {/* Dashboard */}
        <Route element={<DashboardOverview />} path="/" />

        {/* Company */}
        <Route element={<AddCompany />} path="/add-company" />
        <Route element={<DisplayAllCompanies />} path="/companies" />

        {/* Products / Pages */}
        <Route element={<AddProductList />} path="/add-products-list" />
        <Route element={<DisplayProductList />} path="/products-list" />

        {/* Bookings */}
        <Route element={<BookingReport />} path="/search" />

        {/* Services */}
        <Route
          element={<DummyPage title="Add Service" />}
          path="/dashboard/add-service"
        />
        <Route
          element={<DummyPage title="Services List" />}
          path="/dashboard/services-list"
        />

        {/* Contact & Queries */}
        <Route
          element={<DummyPage title="Add Contact / Query" />}
          path="/dashboard/add-contact"
        />
        <Route
          element={<DummyPage title="Contact / Query List" />}
          path="/dashboard/contact-list"
        />

        {/* Registered Users */}
        <Route
          element={<DummyPage title="Add User" />}
          path="/dashboard/add-user"
        />
        <Route
          element={<DummyPage title="Users List" />}
          path="/dashboard/users-list"
        />

        {/* Pages */}
        <Route
          element={<DummyPage title="Add Page / Item" />}
          path="/dashboard/add-page"
        />
        <Route
          element={<DummyPage title="Pages / Items List" />}
          path="/dashboard/pages-list"
        />

        {/* Search */}
        <Route
          element={<DummyPage title="Search Items" />}
          path="/dashboard/search-items"
        />

        {/* Reports */}
        <Route
          element={<DummyPage title="Reports" />}
          path="/dashboard/reports"
        />
      </Routes>
    </Box>
  );
};

export default MainContent;
