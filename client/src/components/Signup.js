import MovieIcon from "@mui/icons-material/Movie";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    repassword: "",
  });

  const handleInputForm = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repasswordVisible, setRePasswordVisible] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((state) => !state);
  };

  const toggleRePasswordVisibility = () => {
    setRePasswordVisible((state) => !state);
  };

  const goToLoginPage = () => {
    navigate("/");
  };

  const saveUsers = (e) => {
    e.preventDefault(); // Prevent form refresh
    const { email, password, repassword } = userInfo;
  
    if (password !== repassword) {
      alert("Passwords do not match");
      return;
    }
  
    fetch("http://localhost:3001/api/v1/newUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password, repassword }),
    })
      .then((result) => result.json())
      .then((resp) => {
        console.log('Response:', resp);
        if (resp.success) {
          // Navigate to login page or display success message
          goToLoginPage();
        } else {
          console.warn("Error:", resp.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };
  

  return (
    <div className="bg-customDark h-screen flex items-center justify-center">
      <div className="bg-customDark text-center p-8 rounded-lg shadow-lg">
        {/* Movie icon with custom color */}
        <MovieIcon sx={{ color: "#FC4747", borderRadius: "50%" }} />

        {/* Signup form */}
        <form onSubmit={saveUsers} className="bg-customBg p-6 rounded-lg mt-8 w-80 space-y-6">
          <div className="text-start my-4 text-white font-thin text-3xl">
            Sign Up
          </div>

          {/* Email input */}
          <input
            type="email"
            name="email" // Binding input with state
            value={userInfo.email} // Sync input value with state
            onChange={handleInputForm} // Handle form input changes
            placeholder="Email address"
            className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white border-0 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Password input */}
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password" // Binding input with state
              value={userInfo.password} // Sync input value with state
              onChange={handleInputForm} // Handle form input changes
              placeholder="Password"
              className="w-full px-4 py-2 mb-6 rounded-lg bg-gray-800 text-white border-0 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer flex justify-center"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>

          {/* Re-Password input */}
          <div className="relative">
            <input
              type={repasswordVisible ? "text" : "password"}
              name="repassword" // Binding input with state
              value={userInfo.repassword} // Sync input value with state
              onChange={handleInputForm} // Handle form input changes
              placeholder="Confirm Password"
              className="w-full px-4 py-2 mb-6 rounded-lg bg-gray-800 text-white border-0 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer flex justify-center"
              onClick={toggleRePasswordVisibility}
            >
              {repasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 mb-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Create an account
          </button>

          {/* Sign-in option */}
          <div className="text-white">
            Already have an account?{" "}
            <span className="text-red-500 cursor-pointer" onClick={goToLoginPage}>
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
