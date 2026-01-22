import { useNavigate } from "react-router";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/getquotation")}
      className="group cursor-pointer bg-white shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-[260px] object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Icon */}
        <div className="absolute top-4 right-4">
          <div className="w-12 h-12 flex items-center justify-center bg-white shadow transition-all duration-300 group-hover:bg-yellow-400">
            <service.icon
              sx={{
                fontSize: 26,
              }}
              className="text-black group-hover:text-white transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="inline-block bg-yellow-400 text-black text-xs font-semibold px-3 py-1 mb-4">
          {service.badge}
        </span>

        <h3 className="text-lg font-bold text-gray-900 mb-3">
          {service.title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="flex items-center gap-3 text-sm font-semibold text-gray-900">
          GET QUICK QUOTE
          <span className="w-10 h-[2px] bg-yellow-400"></span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
