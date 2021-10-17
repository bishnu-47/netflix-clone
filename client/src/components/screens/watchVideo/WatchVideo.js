import { ArrowBackOutlined } from "@material-ui/icons";
import "./watchVideo.scss";

const WatchVideo = () => {
  return (
    <div className="watchScreen">
      <div className="back">
        <ArrowBackOutlined className="icon" />
        Home
      </div>

      <video
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        autoPlay
        controls
      ></video>
    </div>
  );
};

export default WatchVideo;
