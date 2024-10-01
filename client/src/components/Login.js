import MovieIcon from "@mui/icons-material/Movie";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const goToSignUpPage = () => {
    navigate("/signUp");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const data = { email, password };

    try {
      const response = await fetch("http://localhost:3001/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Navigate to the home page upon successful login
        navigate("/");
      } else {
        setError(responseData.message);
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="bg-customDark h-screen flex items-center justify-center">
      <div className="bg-customDark text-center p-8 rounded-lg shadow-lg">
        <MovieIcon sx={{ color: "#FC4747", borderRadius: "50%" }} />
        <form className="bg-customBg p-6 rounded-lg mt-8 w-80 space-y-6" onSubmit={handleLogin}>
          <div className="text-start my-4 text-white font-thin text-3xl">Login</div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white border-0 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-6 rounded-lg bg-gray-800 text-white border-0 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <span className="absolute right-3 top-3 cursor-pointer" onClick={togglePasswordVisibility}>
              {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
          <button type="submit" className="w-full py-2 mb-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
            Login to your account
          </button>
          <div className="text-white">
            Don't have an account? <span className="text-red-500 cursor-pointer" onClick={goToSignUpPage}>Sign Up</span>
          </div>
        </form>
      </div>
    </div>
  );
}