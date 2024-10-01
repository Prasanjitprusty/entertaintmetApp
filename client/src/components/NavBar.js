import BookmarkIcon from "@mui/icons-material/Bookmark";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import MovieIcon from "@mui/icons-material/Movie";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [activeStack, setActiveStack] = useState(null);
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleStackClick = (stackName) => {
    console.log("Navigating to: ", stackName);
    setActiveStack(stackName);
  
    switch (stackName) {
      case "Movie":
        navigate("/");
        break;
      case "SpaceDashboard":
        navigate("/dashboard");
        break;
      case "LocalMovies":
        navigate("/tvMovie");
        break;
      case "LiveTv":
        navigate("/tvShow");
        break;
      case "Bookmark":
        navigate("/bookmark");
        break;
      default:
        break;
    }
  };

  const handlePhotoClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-customBg px-8 w-24 ms-7 rounded-md flex flex-col justify-between">
      <Stack direction="column" spacing={2} style={{ marginTop: "30px" }}>
        <MovieIcon
          onClick={() => handleStackClick("Movie")}
          style={{
            marginBottom: "10px",
            color: activeStack === "Movie" ? "#FC4747" : "#5A698F",
          }}
        />
        <SpaceDashboardIcon
          onClick={() => handleStackClick("SpaceDashboard")}
          style={{
            marginBottom: "10px",
            color: activeStack === "SpaceDashboard" ? "#FC4747" : "#5A698F",
          }}
        />
        <LocalMoviesIcon
          onClick={() => handleStackClick("LocalMovies")}
          style={{
            marginBottom: "10px",
            color: activeStack === "LocalMovies" ? "#FC4747" : "#5A698F",
          }}
        />
        <LiveTvIcon
          onClick={() => handleStackClick("LiveTv")}
          style={{
            marginBottom: "10px",
            color: activeStack === "LiveTv" ? "#FC4747" : "#5A698F",
          }}
        />
        <BookmarkIcon
          onClick={() => handleStackClick("Bookmark")}
          style={{
            marginBottom: "10px",
            color: activeStack === "Bookmark" ? "#FC4747" : "#5A698F",
          }}
        />
      </Stack>
      <div className="self-end mb-10">
        <Avatar
          className="cursor-pointer"
          src={avatar}
          onClick={handlePhotoClick}
        />
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
