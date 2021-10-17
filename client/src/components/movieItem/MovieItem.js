import { useState } from "react";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import "./movieItem.scss";

const MovieItem = ({ indexNo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

  return (
    <div
      className="listItem"
      style={{ left: isHovered && indexNo * 225 - 50 + indexNo * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src="https://images.freecreatives.com/wp-content/uploads/2017/10/flat-clapperboard-icon_1063-38.jpg"
        alt=""
      />
      {isHovered && (
        <>
          <video src={trailer} autoPlay={true} loop></video>
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>

            <div className="itemInfoTop">
              <span className="duration">2hr 26min</span>
              <span className="ageLimit">+16</span>
              <span className="releaseDate">2011</span>
            </div>

            <div className="desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Perspiciatis ducimus sunt voluptates, ea adipisci error.
            </div>

            <div className="genre">Action</div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieItem;
