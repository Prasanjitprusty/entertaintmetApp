import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import BookmarkIcon from "@mui/icons-material/Bookmark";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TV_Movie({ filteredMovies, fetchMovieVideos }) {
  return (
    <div className="mb-10">
      <h2 className="text-white text-3xl mb-4 font-semibold">Trending Movies</h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
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
        {filteredMovies?.map((movie, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative group transition-transform duration-300 transform hover:scale-105 z-0">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="bg-gray-600 text-white p-4 flex items-center justify-center h-72 rounded-lg">
                  No Image
                </div>
              )}

              {/* Bookmark Icon (Visible on Hover) */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                <button className="text-white">
                  <BookmarkIcon fontSize="large" />
                </button>
              </div>

              {/* Play button on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                <button
                  className="bg-indigo-600 text-white rounded-full p-4 hover:bg-indigo-500"
                  onClick={() => fetchMovieVideos(movie.id)}
                >
                  <PlayCircleFilledWhiteIcon fontSize="inherit" style={{ fontSize: 60 }} />
                </button>
              </div>

              {/* Movie Title and Release Date */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                <span className="text-sm text-gray-300">
                  Year: {new Date(movie.release_date).getFullYear() || "N/A"}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
