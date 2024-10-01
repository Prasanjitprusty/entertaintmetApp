// TVShow.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TVShow({ filteredTVShows, fetchMovieVideos }) {
  console.log(filteredTVShows);
  return (
    <div className="mb-10">
      <h2 className="text-white text-3xl mb-4 font-semibold">Trending TV Shows</h2>
      {filteredTVShows.length > 0 ? (
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          navigation={{
            prevEl: ".swiper-button-prev-tv",
            nextEl: ".swiper-button-next-tv",
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          modules={[Navigation, Pagination]}
          className="swiper-container"
        >
          {filteredTVShows?.map((show) => (
            <SwiperSlide key={show.id}> {/* Use unique key */}
              <div className="relative group transition-transform duration-300 transform hover:scale-105">
                {show.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="bg-gray-600 text-white p-4 flex items-center justify-center h-72 rounded-lg">
                    No Image
                  </div>
                )}
                {/* Arrow icon on hover */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  // Temporary background for debugging
                  // style={{ backgroundColor: 'rgba(255, 0, 0, 0.3)' }}
                >
                  <button
                    className="bg-indigo-600 text-white rounded-full p-4 hover:bg-indigo-500 flex items-center justify-center"
                    onClick={() => fetchMovieVideos(show.id)}
                  >
                    <PlayCircleFilledWhiteIcon fontSize="inherit" style={{ fontSize: 60 }} />
                  </button>
                </div>
                {/* Show Details on hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  // Temporary background for debugging
                  // style={{ backgroundColor: 'rgba(0, 255, 0, 0.3)' }}
                >
                  <h3 className="text-lg font-semibold text-white">{show.name}</h3>
                  <span className="text-sm text-gray-300">
                    Year: {new Date(show.first_air_date).getFullYear() || "N/A"}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-white">No TV shows available.</div>
      )}
    </div>
  );
}
