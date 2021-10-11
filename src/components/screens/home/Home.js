import Navbar from "../../navbar/Navbar.js";
import Featured from "../../featured/Featured.js";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Featured />
    </div>
  );
};

export default Home;
