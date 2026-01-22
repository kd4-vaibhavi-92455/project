import React, { useState, useEffect } from "react";

import {
  TextField,
  Button,
  Box,
  Avatar,
  Tabs,
  Tab,
  Card,
  IconButton,
  InputBase,
  Paper,
  Divider,
} from "@mui/material";
import {
  PersonOutline,
  GroupOutlined,
  PhotoLibraryOutlined,
  Logout,
  Email,
  Language,
  Place,
  WorkOutline,
  Facebook,
  Twitter,
  PlayCircleOutline,
  Add,
  LocalShippingOutlined, // For Active Bookings
  AssignmentOutlined, // For Booking Details
  HistoryOutlined, // For Past Bookings
} from "@mui/icons-material";

const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  // Check for existing session
  useEffect(() => {
    const loggedInUser = localStorage.getItem("customer_user");
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      const userData = { email, name: "Mathew Anderson" };
      localStorage.setItem("customer_user", JSON.stringify(userData));
      setUser(userData);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("customer_user");
    setUser(null);
  };

  // --- LOGIN VIEW ---
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
        <Box
          className="w-full max-w-md bg-white p-10 shadow-xl rounded-xl border border-gray-100"
          sx={{ width: 400 }}
        >
          <div className="text-center mb-4">
            {" "}
            {/* Increased bottom margin here */}
            <h2 className="text-3xl mt-0 font-bold text-gray-800">
              User Login
            </h2>
            <p className="text-gray-500 mt-2">Access your shipping dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <TextField
              fullWidth
              label="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#7c3aed",
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mt: 2,
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#7c3aed",
                },
              }}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              className="bg-indigo-600 hover:bg-navy-900 py-4 font-bold transition-all"
              style={{ backgroundColor: "#6366f1", marginTop: "10px" }}
            >
              LOGIN
            </Button>
          </form>
        </Box>
      </div>
    );
  }

  // --- DASHBOARD VIEW (Based on Image) ---
  return (
    <div className="min-h-screen bg-[#f4f7fe] p-4 md:p-8">
      {/* Centered Container Box */}
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header / Breadcrumb Box */}
        <Paper className="p-4 flex justify-between items-center shadow-sm rounded-xl">
          <a
            href="#"
            className="font-bold text-gray-700 hover:text-blue-900 no-underline transition-colors cursor-pointer"
          >
            User Profile
          </a>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <IconButton
              onClick={handleLogout}
              size="small"
              color="error"
              title="Logout"
            >
              <Logout fontSize="small" />
            </IconButton>
          </div>
        </Paper>

        {/* Profile Hero Section */}
        <Card className="rounded-2xl overflow-hidden shadow-sm border-none">
          {/* Cover Image */}
          <div className="h-48 md:h-64 bg-gradient-to-r from-indigo-200 to-purple-200 relative">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80"
              className="w-full h-full object-cover opacity-60"
              alt="cover"
            />
          </div>

          {/* Stats and User Info Bar */}
          <div className="px-8 pb-6 relative">
            <div className="flex flex-col md:flex-row items-center justify-between mt-[-40px]">
              {/* Center Avatar */}
              <div className="text-center">
                <Avatar
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  className="w-24 h-24 border-1 border-white shadow-lg mx-auto mb-2"
                />
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                {/* <p className="text-gray-400 text-sm">{user.role}</p> */}
              </div>

              {/* Right Socials & Action */}
              <div className="flex items-center gap-3 mt-4 md:mt-15">
                <IconButton size="small" className="bg-blue-600 text-white">
                  <Facebook fontSize="small" />
                </IconButton>
                <IconButton size="small" className="bg-sky-400 text-white">
                  <Twitter fontSize="small" />
                </IconButton>
                <IconButton size="small" className="bg-pink-500 text-white">
                  <PlayCircleOutline fontSize="small" />
                </IconButton>
                <Button
                  variant="contained"
                  className="bg-indigo-600 mt-5 rounded-lg normal-case ml-2"
                  startIcon={<Add />}
                >
                  Book a Move
                </Button>
              </div>
            </div>
          </div>

          <Divider />

          {/* Navigation Tabs */}
          <Tabs
            value={activeTab}
            onChange={(e, val) => setActiveTab(val)}
            centered
            TabIndicatorProps={{ style: { backgroundColor: "#6366f1" } }}
            sx={{
              "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
            }}
          >
            <Tab
              icon={<LocalShippingOutlined fontSize="small" />}
              iconPosition="start"
              label="Active Bookings"
            />
            <Tab
              icon={<AssignmentOutlined fontSize="small" />}
              iconPosition="start"
              label="Booking Details"
            />

            <Tab
              icon={<HistoryOutlined fontSize="small" />}
              iconPosition="start"
              label="Past Bookings"
            />
          </Tabs>
        </Card>

        {/* Content Area: Introduction & Feed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Intro Card */}
          <div className="md:col-span-1 space-y-6">
            <Card className="p-6 rounded-2xl shadow-sm border-none">
              <h3 className="text-lg font-bold mb-4">Hello, {user.name}</h3>

              <div className="space-y-4 text-gray-600">
                <div className="flex items-center gap-3 text-sm">
                  <Email fontSize="small" /> {user.email}
                </div>
              </div>
            </Card>
          </div>

          {/* Post/Feed Card */}
          <div className="md:col-span-2 space-y-6">
            <Card className="p-4 rounded-2xl shadow-sm border-none">
              <div className="bg-gray-50 rounded-xl p-3 mb-4">
                <InputBase
                  placeholder="Share your experience..."
                  fullWidth
                  multiline
                  rows={2}
                  className="px-2"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <Button
                    size="small"
                    startIcon={<PhotoLibraryOutlined color="primary" />}
                    className="text-gray-600 normal-case"
                  >
                    Photo / Video
                  </Button>
                </div>
                <Button
                  variant="contained"
                  className="bg-indigo-600 shadow-none rounded-lg px-6"
                >
                  Submit
                </Button>
              </div>
            </Card>

            {/* Sample Post */}
            <Card className="p-6 rounded-2xl shadow-sm border-none">
              <div className="flex gap-3 items-center mb-4">
                {/* <Avatar src="https://mui.com/static/images/avatar/1.jpg" /> */}
                <div>
                  <p className="font-bold text-sm">{user.name}</p>
                  {/* <p className="text-xs text-gray-400">15 min ago</p> */}
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Working on the new logistics flow today! Really excited to see
                how the status tracking helps our customers.
              </p>
              <div className="rounded-xl overflow-hidden h-64 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                  alt="content"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
