
const FilterResult = ({ currentPosts, showNotFound }) => {
  return (
    <>
      <div className="filter__cards">
        {currentPosts.length ? (
          currentPosts.map((restaurant, index) => (
            <div
              className="filter__card"
              // key={currentPosts.indexOf(restaurant)}
              key={index}
            >
              <img src={restaurant.images[0]} alt={restaurant.title} />
              <div className="filter__cards-info">
                <p>
                  <i className="ri-restaurant-line"></i>
                  {restaurant.restaurant_name}
                </p>
                <p>
                  {`${restaurant.restaurant_description.substring(0, 60)}...`}
                </p>
                <p>Price: INR {restaurant.cost}</p>
              </div>

              <p className="filter__card-rating">{restaurant.rating}</p>

              <button
                onClick={() =>
                  (window.location.href =
                    window.location.origin +
                    "/restaurant/" +
                    restaurant.restaurant_id)
                }
              >
                <i className="ri-shopping-bag-2-line"></i> Order!
              </button>
            </div>
          ))
        ) : showNotFound ? (
          <div className="no-result">
            <img src={require("../Assets/no-result.png")} alt="no-result" />
            <h2>oh snap :(</h2>
            <h3>
              Sorry, that filter combination has no results. <br /> Please try
              different criteria.
            </h3>
          </div>
        ) : (
          <img src={require("../Assets/loading.gif")} alt="no-result" />
        )}
      </div>
    </>
  );
};

export default FilterResult