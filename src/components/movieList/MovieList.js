import { useRef, useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import MovieItem from "../movieItem/MovieItem.js";

import "./movieList.scss";

const MovieList = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const listRef = useRef();

  //  slider event
  function handleSliderClick(e, direction) {
    setIsMoved(true);
    e.target.style.pointerEvents = "none";
    setTimeout(() => {
      return (e.target.style.pointerEvents = "all");
    }, 1000);

    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  }

  return (
    <div className="list">
      <span className="listTitle">Movies</span>

      <div className="wrapper">
        <ArrowBackIos
          className="sliderArrow left"
          onClick={(e) => handleSliderClick(e, "left")}
          style={{ display: !isMoved && "none" }}
        />

        <div className="container" ref={listRef}>
          <MovieItem indexNo={0} />
          <MovieItem indexNo={1} />
          <MovieItem indexNo={2} />
          <MovieItem indexNo={3} />
          <MovieItem indexNo={4} />
          <MovieItem indexNo={5} />
          <MovieItem indexNo={6} />
          <MovieItem indexNo={7} />
          <MovieItem indexNo={8} />
          <MovieItem indexNo={9} />
        </div>

        <ArrowForwardIos
          className="sliderArrow right"
          onClick={(e) => handleSliderClick(e, "right")}
        />
      </div>
    </div>
  );
};

export default MovieList;
