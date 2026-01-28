const scrollToQuoteForm = () => {
  const element = document.getElementById("quote");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const HeroSection = () => {
  return (
    <div className="relative h-[600px] w-full">
      <img
        src="images/hero-img.png"
        className="absolute inset-0 h-full w-full object-cover"
        alt="hero-section-image"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-primary/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24 text-[#1171BA] max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight jost">
          Intelligent Logistics.
          <br />
          Stable Transitions.
        </h1>

        <p className="mt-4 text-base md:text-lg text-[#0D3B66] font-display">
          More than just a move - it’s a strategically planned relocation. We
          combine precision handling with absolute reliability…
        </p>

        <button onClick={scrollToQuoteForm}
          className="mt-8 w-fit rounded-lg bg-[#1171BA] px-6 py-3 font-semibold text-white shadow-professional hover:bg-[#0A3D7A] transition">
          Get a Free Quote now
        </button>
      </div>
    </div>
  );
};
export default HeroSection;
