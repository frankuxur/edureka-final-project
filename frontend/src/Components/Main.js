import "../Styles/Main.css";

const Main = () => {
  return (
    <main id="main">
      <div className="main__container container">
        <div className="main__left">
          <div className="main__title">
            <h1>Bliss on</h1>
            <h1>a plate.</h1>
            {/* <p>Issa snack</p> */}
            <p>Good food, good life</p>
          </div>

          <div className="main__img-grp">
            <img src={require("../Assets/main-img1.jpg")} alt="" />
            <img src={require("../Assets/main-img2.jpg")} alt="" />
          </div>

          <div className="main__btn">
            <p>Filter / Sort</p>

            <div>
              <div>
                {/* <h3>Good Times</h3>
                <h3>Great Tastes</h3> */}
                <h3>Filter</h3>
                <h3>Restaurants</h3>
              </div>

              <button onClick={() => (window.location.href = "/filter")}>
                <i className="ri-equalizer-line"></i> Filter
              </button>
            </div>
          </div>
        </div>

        <div className="main__right">
          <div className="main__cards">
            {/* <div className="main__card">
              <h3>Reach out to us.</h3>
              <i className="ri-arrow-right-s-line"></i>
            </div> */}
            <div
              className="main__card"
              onClick={() => (window.location.href = "/#explore")}
            >
              <h3>Explore your favorite meals.</h3>
              <i className="ri-arrow-right-s-line"></i>
            </div>

            <div
              className="main__card"
              onClick={() => (window.location.href = "/#about")}
            >
              <h3>Learn more about us.</h3>
              <i className="ri-arrow-right-s-line"></i>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;

{
  /* <main id="main">
        <div className="main__container container">
          <div className="main__info">
            <h1>
              First, we eat. <br /> Then, we do everything else.
            </h1>
            <p>Conquering hunger together!</p>

            <div className="main__btns">
              <button>get started</button>
              <button>explore menu</button>
            </div>
          </div>

          <div className="main__img">
            <img src={require("../Assets/home.jpg")} alt="home" />
          </div>
        </div>
      </main> */
}
