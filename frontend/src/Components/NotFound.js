import "../Styles/NotFound.css";

const NotFound = () => {
  return (
    <>
      <div className="notfound">
        <div className="notfound__container container">
          <div className="absolute-text">
            <h1>Error 404</h1>
          </div>
          <img
            src={require(`../Assets/notfound${Math.floor(
              Math.random() * 2 + 1
            )}.png`)}
            alt="notfound"
            className="notfound__img"
          />
          <h1>whoops...this page is not available</h1>
        </div>
      </div>
    </>
  );
};

export default NotFound;
