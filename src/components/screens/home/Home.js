import Navbar from "../../navbar/Navbar.js";
import Featured from "../../featured/Featured.js";
import MovieList from "../../movieList/MovieList.js";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Featured />
      <MovieList />
      <MovieList />
      <MovieList />
    </div>
  );
};

export default Home;
