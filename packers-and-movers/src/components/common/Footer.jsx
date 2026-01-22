import {
  Phone,
  LocationOn,
  Email,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-50 to-blue-100 text-slate-900">
      {/* TOP INFO BAR */}
      <div className="border-b border-black/20">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <Phone />, title: "Phone:", value: "(719) 445-2808" },
            {
              icon: <LocationOn />,
              title: "Address:",
              value: "4578 Pune Road",
            },
            { icon: <Email />, title: "E-mail:", value: "info@demolink.org" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-blue-400 flex items-center justify-center text-black">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm opacity-90">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-14">
        {/* LOGO + TEXT */}
        <div>
          <h2 className="text-3xl font-bold mb-5">
            <span className="text-blue-400">S</span>Moove
          </h2>
          <p className="text-sm text-black-1000 leading-relaxed mb-6">
            We provide reliable and professional packing and moving services,
            ensuring safe, timely, and hassle-free relocation for homes and
            businesses.
          </p>

          <div className="flex gap-4">
            {[Facebook, Twitter, LinkedIn, Instagram].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition"
              >
                <Icon fontSize="small" />
              </div>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold uppercase tracking-wider mb-6">
            Quick Links
            <span className="block w-8 h-[2px] bg-gray-400 mt-2"></span>
          </h3>
          <ul className="space-y-3 text-sm text-black-1000">
            <li>About Us</li>
            <li>Our Services</li>
            <li>Get In Touch</li>
            <li>Pay Now</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="font-semibold uppercase tracking-wider mb-6">
            Categories
            <span className="block w-8 h-[2px] bg-gray-400 mt-2"></span>
          </h3>
          <ul className="space-y-3 text-sm text-black-1000">
            <li>Home</li>
            <li>Office</li>
            <li>Vehicle</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="font-semibold uppercase tracking-wider mb-6">
            Feedback
            <span className="block w-8 h-[2px] bg-gray-400 mt-2"></span>
          </h3>

          <p className="text-sm text-black-1000 mb-6">Share Your Experience</p>

          <textarea
            placeholder="Write your feedback here..."
            rows={4}
            className="w-full px-4 py-3 mb-4 bg-transparent text-black border border-black/30 outline-none resize-none placeholder:text-black-1000"
          ></textarea>

          <button className="w-full bg-[#1171ba] text-white py-3 font-semibold tracking-widest hover:bg-[#0b1f33] transition">
            SUBMIT
          </button>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-black/20 py-6 text-center text-sm text-black-1000">
        Copyright © 2026 Packers-Movers. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
