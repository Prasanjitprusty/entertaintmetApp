import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles

export default function Recommendation({ recommendations }) {
  return (
    <div className="my-8">
      <h2 className="text-white text-2xl mb-4">Recommendations</h2>
      {recommendations.length > 0 ? (
        <Swiper
          spaceBetween={20} // Space between slides
          slidesPerView={2} // Number of slides to show per view
          breakpoints={{
            640: { slidesPerView: 3 }, // For small screens
            768: { slidesPerView: 4 }, // For medium screens
            1024: { slidesPerView: 5 }, // For large screens
          }}
        >
          {recommendations.map((recommendation, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative group transition-transform duration-300 transform hover:scale-105">
                {recommendation.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                    alt={recommendation.title || recommendation.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="bg-gray-600 text-white p-4 flex items-center justify-center h-72 rounded-lg">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-lg font-semibold text-white">
                    {recommendation.title || recommendation.name}
                  </h3>
                  <span className="text-sm text-gray-300">
                    Year: {new Date(recommendation.release_date || recommendation.first_air_date).getFullYear() || "N/A"}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-white text-lg">No recommendations available.</p>
      )}
    </div>
  );
}
