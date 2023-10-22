import { useEffect, useState } from "react";
import "./RightSidebar.css";
import Widget from "./Widget";
import WidgetTags from "./WidgetTags";

const RightSidebar = () => {
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
    <aside className={`right-sidebar ${isDaytime ? 'day' : 'night'}`}>
      <Widget />
      <WidgetTags />
    </aside>
  );
};

export default RightSidebar;
