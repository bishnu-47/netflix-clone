import { PlayArrow, InfoOutlined } from "@material-ui/icons";
import "./featured.scss";

const Featured = ({ type }) => {
  return (
    <div className="featured">
      <img
        src="https://cdn.pocket-lint.com/r/s/1200x630/assets/images/155659-tv-news-feature-what-is-the-best-order-to-watch-the-matrix-movies-image6-n4msmyjaxw.jpg"
        alt=""
        className="background"
      />

      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "TV Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}

      <div className="info">
        <img
          src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1"
          alt=""
          className="title"
        />

        <div className="desc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed
          accusamus tempore praesentium explicabo natus in, eligendi aut nobis
          alias ad.
        </div>

        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>

          <button className="more-info">
            <InfoOutlined />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
