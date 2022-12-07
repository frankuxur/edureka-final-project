import "../Styles/Home.css";
import ExploreMeals from "./ExploreMeals";
import Main from "./Main";
import ScrollToTop from "./ScrollToTop";
import Services from "./Services";
import About from "./About";

const Home = () => {
  return (
    <>
      <ScrollToTop />

      <Main />

      <Services />

      <ExploreMeals />

      <About />
    </>
  );
};

export default Home;
