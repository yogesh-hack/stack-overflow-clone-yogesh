import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  const [isDaytime, setIsDaytime] = useState(true);

  // Function to update the theme based on the time of day
  const updateTheme = () => {
    const now = new Date();
    const hours = now.getHours();

    // Define the time range for daytime and nighttime
    const isDay = hours >= 6 && hours < 18;

    // Set the theme based on the time of day
    setIsDaytime(isDay);
  };

  useEffect(() => {
    // Initial theme update
    updateTheme();

    // Update the theme every minute
    const intervalId = setInterval(updateTheme, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={`App ${isDaytime ? 'day' : 'night'}`}>
      <Router>
        <Navbar handleSlideIn={handleSlideIn} />
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
    </div>
  );
}

export default App;
