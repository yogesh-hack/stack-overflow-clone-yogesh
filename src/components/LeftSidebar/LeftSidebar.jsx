import { useEffect, useState } from "react";
import "./LeftSidebar.css";
import { NavLink } from "react-router-dom";
import Globe from "../../assets/Globe.svg";

const LeftSidebar = ({ slideIn, handleSlideIn }) => {
  const slideInStyle = {
    transform: "translateX(0%)",
  };

  const slideOutStyle = {
    transform: "translateX(-100%)",
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
    <div
      className={`left-sidebar ${isDaytime ? 'day' : 'night'}`}
      style={slideIn ? slideInStyle : slideOutStyle}
    >
      <nav className="side-nav">
        <button onClick={() => handleSlideIn()} className="nav-btn">
          <NavLink to="/" className="side-nav-links" activeclassname="active">
            <p>Home</p>
          </NavLink>
        </button>
        <div className="side-nav-div">
          <div>
            <p>PUBLIC</p>
          </div>
          <button onClick={() => handleSlideIn()} className="nav-btn">
            <NavLink
              to="/Questions"
              className="side-nav-links"
              activeclassname="active"
            >
              <img src={Globe} alt="Globe" />
              <p style={{ paddingLeft: "10px" }}> Questions </p>
            </NavLink>
          </button>
          <button onClick={() => handleSlideIn()} className="nav-btn">
            <NavLink
              to="/Tags"
              className="side-nav-links"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Tags</p>
            </NavLink>
          </button>
          <button onClick={() => handleSlideIn()} className="nav-btn">
            <NavLink
              to="/Users"
              className="side-nav-links"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Users</p>
            </NavLink>
          </button>
          <button onClick={() => handleSlideIn()} className="nav-btn">
            <NavLink
              to="/video"
              className="side-nav-links"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Watch Video</p>
            </NavLink>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
