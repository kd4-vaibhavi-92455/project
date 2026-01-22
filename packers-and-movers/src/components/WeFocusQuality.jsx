import React from "react";
// Import the *Outlined* variants of the MUI icons
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

const WeFocusQuality = () => {
  return (
    <div className="p-10 md:p-20 relative min-h-[450px] bg-gray-900">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: "url('/images/we-focus-quality.png')" }}
      ></div>

      {/* Content Overlay Container - Added flex-wrap and gap-8 */}
      <div className="relative z-10 flex flex-wrap items-center justify-between h-full gap-8 p-4 sm:p-8">
        {/* Left Text Content Wrapper (now takes up available space, allows wrapping) */}
        <div className="text-white max-w-lg w-[50%]">
          <p className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-2">
            FOCUSED ON QUALITY
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Global Logistics Partner To World's Famous Brands
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-yellow-400">
            From Over 25 Years!
          </p>

          {/* Placeholder for the form area you mentioned not to include */}
          {/* <div className="mt-8 bg-yellow-400 p-4 rounded-lg shadow-lg">
            <p className="text-gray-900 font-semibold">
              This is where the form area would start.
            </p>
          </div> */}
        </div>

        {/* Right Icons/Buttons Area - Changed to flex-row and flex-wrap for horizontal wrap */}
        <div className="flex flex-wrap w-[50%] justify-center gap-6 text-yellow-400 mt-8 md:mt-0">
          {/* Feature 1: Transparent Pricing */}
          <div className="flex flex-col items-center text-center w-[140px]">
            <div className="mb-2">
              <GppGoodOutlinedIcon sx={{ fontSize: 70 }} />
            </div>
            <p className="text-xs uppercase tracking-wider font-medium mt-1.5 text-white">
              TRANSPARENT PRICING
            </p>
          </div>

          {/* Feature 2: Fast, Efficient Delivery */}
          <div className="flex flex-col items-center text-center w-[140px]">
            <div className="mb-2">
              <LocalShippingOutlinedIcon sx={{ fontSize: 70 }} />
            </div>
            <p className="text-xs uppercase tracking-wider font-medium mt-1.5 text-white">
              FAST, EFFICIENT DELIVERY
            </p>
          </div>

          {/* Feature 3: Warehouse Storage */}
          <div className="flex flex-col items-center text-center w-[140px]">
            <div className="mb-2">
              <WarehouseOutlinedIcon sx={{ fontSize: 70 }} />
            </div>
            <p className="text-xs uppercase tracking-wider font-medium mt-1.5 text-white">
              WAREHOUSE STORAGE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeFocusQuality;
