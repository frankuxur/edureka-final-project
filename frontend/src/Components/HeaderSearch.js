import React from "react";

const HeaderSearch = ({
  locations,
  restaurants,
  showHeaderSearch,
  onLocationSelect,
  onRestaurantSelect,
  setShowHeaderSearch,
}) => {
  return (
    <div className="header__search">
      <button onClick={() => setShowHeaderSearch(!showHeaderSearch)}>
        search for restaurants
        <i
          className={
            showHeaderSearch ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"
          }
        ></i>
      </button>

      {showHeaderSearch ? (
        <div className="header__search-box">
          <div className="header__select-location">
            <p>Select Location</p>
            {locations.map((location) => (
              <p
                key={location.location_id}
                onClick={() => onLocationSelect(location.location_id)}
              >
                {location.location_name}
              </p>
            ))}
          </div>

          <div className="header__select-restaurants">
            <p>Select Restaurant</p>
            {restaurants.map((restaurant) => (
              <p
                key={restaurant.restaurant_id}
                onClick={() => onRestaurantSelect(restaurant.restaurant_id)}
              >
                {restaurant.restaurant_name}
              </p>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HeaderSearch;
