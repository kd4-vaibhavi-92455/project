const WeFocusQuality = () => {
  return (
    <div className="p-10 md:p-20 relative h-[500px] bg-gray-900">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: "url('/images/we-focus-quality.png')" }}
      ></div>

      {/* Content Overlay Container */}
      <div className="relative z-10 flex items-center justify-start h-full p-4 sm:p-8">
        {/* Text Content Wrapper */}
        <div className="text-white max-w-lg">
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
          <div className="mt-8 bg-yellow-400 p-4 rounded-lg shadow-lg">
            <p className="text-gray-900 font-semibold">
              This is where the form area would start.
            </p>
          </div>
        </div>
      </div>

      {/* Note: Icons/buttons visible on the right side of the image would go here */}
    </div>
  );
};

export default WeFocusQuality;
