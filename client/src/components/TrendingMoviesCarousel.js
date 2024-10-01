import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// API Key (Use your own API key)
const API_KEY = "e60ce6aaa4070f3394b212bda388d5b9";

// Carousel settings for react-slick
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4, // Change according to your need
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const TrendingMoviesCarousel = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  // Fetch trending movies
  const fetchTrendingMovies = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };

    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        console.log('Trending Movies:', response.results);
        setTrendingMovies(response.results);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="bg-gray-900 py-8">
      <h2 className="text-white text-2xl font-semibold px-6 py-4">Trending Movies</h2>
      {trendingMovies?.length > 0 ? (
        <Slider {...settings}>
          {trendingMovies.map((movie, idx) => {
            const year = movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A";

            return (
              <div key={idx} className="p-2">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col group relative">
                  {/* Movie poster */}
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-80 object-cover"
                    />
                  ) : (
                    <div className="bg-gray-500 text-white p-4 flex items-center justify-center h-80">
                      No Image
                    </div>
                  )}

                  {/* Movie title and year */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 text-center">{movie.title}</h3>
                    <h3 className="text-md text-gray-600 text-center">Year: {year}</h3>
                    <h3 className="text-md text-gray-600 text-center">Type: Movie</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      ) : (
        <p className="text-white px-6">No movies found</p>
      )}
    </div>
  );
};

export default TrendingMoviesCarousel;
