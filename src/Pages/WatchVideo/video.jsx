import React from "react";
import "../../App.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import Videoplayer from "../../components/VideoPlayer/Videoplayer";
import sample from '../../assets/sample.mp4'
import sample2 from '../../assets/sample2.mp4'

const Video = ({ slideIn, handleSlideIn }) => {
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <Videoplayer videos={[sample, sample2]}/>
      <div className="home-container-2">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Video;
