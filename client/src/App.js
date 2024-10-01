import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import Home from './pages/Home';
import TVShow from './pages/TVShow'
import TV_Movie from './pages/TVMovie';
import Bookmark from './pages/Bookmark';
import 'bootstrap/dist/css/bootstrap.min.css';


function Protected({ element }) {
  // Check the authentication status here, for example, you might have a function to check the user's login status.
  const isLoggedIn = true; // Replace this with your actual authentication state

  if (isLoggedIn) {
    return <>{element}</>;
  } else {
    return <Navigate to="/login" />;
  }
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Protected element={<Home />} />} /> 
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/tvShow' element={<TVShow />} />
        <Route path='/tvMovie' element={<TV_Movie />} />
        <Route path='/bookmark' element={<Bookmark />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;