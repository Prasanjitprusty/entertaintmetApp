import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import SearchIcon from "@mui/icons-material/Search";
import TVMovie from "./TVMovie";
import TVShow from "./TVShow";
import Recommendation from "./Recommondation"; // Fix the spelling of 'Recommendation'

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedMovieVideo, setSelectedMovieVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null); 

  useEffect(() => {
    fetchTrendingMovies();
    fetchTrendingTVShows();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const fetchTrendingMovies = () => {
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=e60ce6aaa4070f3394b212bda388d5b9&language=en-US`)
      .then((response) => response.json())
      .then((response) => setTrendingMovies(response.results))
      .catch((err) => console.error(err));
  };

  const fetchTrendingTVShows = () => {
    fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=e60ce6aaa4070f3394b212bda388d5b9&language=en-US`)
      .then((response) => response.json())
      .then((response) => setTrendingTVShows(response.results))
      .catch((err) => console.error(err));
  };

  const fetchRecommendations = (movieId) => {
    console.log("Fetching recommendations for movie ID:", movieId); // Log the movie ID being fetched
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=e60ce6aaa4070f3394b212bda388d5b9&language=en-US&page=1`)
      .then((response) => {
        console.log("Response status:", response.status); // Log response status
        return response.json();
      })
      .then((data) => {
        console.log("Recommendations data:", data); // Log the recommendations data
        console.log("Number of recommendations:", data.results.length); // Log the number of recommendations
        if (data.results && data.results.length > 0) {
          setRecommendations(data.results);
        } else {
          console.log("No recommendations found for movie ID:", movieId); // Log if no recommendations found
          setRecommendations([]); // Ensure state is empty if no recommendations
        }
      })
      .catch((err) => {
        console.error("Error fetching recommendations:", err);
      });
  };

  // Define the fetchMovieVideos function
  const fetchMovieVideos = (movieId) => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=e60ce6aaa4070f3394b212bda388d5b9&language=en-US`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const trailerKey = data.results[0].key; // Assuming you want the first video
          setSelectedMovieVideo(`https://www.youtube.com/embed/${trailerKey}`);
          setIsModalOpen(true);
        } else {
          console.log("No video found for movie ID:", movieId);
        }
      })
      .catch((err) => {
        console.error("Error fetching movie videos:", err);
      });
  };

  // Call fetchRecommendations with a hardcoded movie ID
  useEffect(() => {
    const testMovieId = 299536; // Replace with a known movie ID
    fetchRecommendations(testMovieId);
  }, []);

  const closeModal = () => {
    setSelectedMovieVideo(null);
    setIsModalOpen(false);
  };

  const filteredMovies = trendingMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredTVShows = trendingTVShows.filter(show =>
    show.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900 min-h-screen flex flex-row">
      <NavBar />
      <div className="container mx-auto px-4 py-6">
        {/* SearchBar */}
        <div className="relative w-full mb-6">
          <input
            type="text"
            placeholder="Search Movies or TV Shows..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full max-w-lg pl-4 pr-12 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        {/* Trending Movies Section */}
        <TVMovie filteredMovies={filteredMovies} fetchMovieVideos={fetchMovieVideos} />
        
        {/* Trending TV Shows Section */}
        <TVShow filteredTVShows={filteredTVShows} fetchMovieVideos={fetchMovieVideos} />

        {/* Recommendation Section */}
        <Recommendation recommendations={recommendations} /> {/* Pass the recommendations to the component */}

        {/* Trailer Modal */}
        {isModalOpen && selectedMovieVideo && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-75">
            <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
              <iframe
                className="w-full h-96"
                src={selectedMovieVideo}
                title="Trailer"
                allowFullScreen
              />
              <button className="absolute top-2 right-2 text-white" onClick={closeModal}>
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
