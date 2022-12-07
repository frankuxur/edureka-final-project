import { useEffect, useState } from "react";
import "../Styles/Filter.css";
import FilterForm from "./FilterForm";
import Pagination from "./Pagination";

const FilterTest = () => {
  const [formData, setFormData] = useState({});
  const [restaurantList, setRestaurantList] = useState([]);
  const [showNotFound, setShowNotFound] = useState(false);
  // const [pageNo, setPageNo] = useState(1);
  const [restaurantCount, setRestaurantCount] = useState([]);

  // step 2
  const fetchAll = () => {
    fetch("http://localhost:3500/restaurants/filter?page=1")
      .then((res) => res.json())
      .then((result) => {
        setRestaurantList(result.data);
        setRestaurantCount(result.total);
        // console.log(result.total);
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "cuisine") {
      const cuisineTemp = document.querySelectorAll(
        "input[name=cuisine]:checked"
      );

      if (cuisineTemp && cuisineTemp.length) {
        let cuisineIds = [];
        // will take all the ids from the selected checkboxes and puts it in the array cuisineIds
        cuisineTemp.forEach((c) => {
          cuisineIds.push(c.id);
        });

        // console.log(cuisineIds);

        setFormData((prevState) => ({
          ...prevState,
          cuisine: cuisineIds,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  let filterParams = "";

  const onSubmit = (e) => {
    e.preventDefault();
    setRestaurantList([]);
    setShowNotFound(false);

    if (formData.location) {
      if (filterParams) {
        filterParams += "&";
      }

      filterParams = "location=" + formData.location;
    }

    if (formData.cuisine && formData.cuisine.length) {
      if (filterParams) {
        filterParams += "&";
      }

      filterParams += "cuisine=" + formData.cuisine.join(",");
    }

    if (formData.cost) {
      if (filterParams) {
        filterParams += "&";
      }

      filterParams += "cost=" + formData.cost;
    }

    if (formData.sort) {
      if (filterParams) {
        filterParams += "&";
      }

      filterParams += "sort=" + formData.sort;
    }

    fetch(
      "http://localhost:3500/restaurants/filter?" + filterParams + "&page=1"
    )
      .then((res) => res.json())
      .then((result) => {
        setRestaurantList(result.data);
        setRestaurantCount(result.total);

        if (result.data.length === 0) {
          setTimeout(() => {
            setShowNotFound(true);
          }, 3000);
        }

        // console.log(filterParams);
        // console.log(result.data);
      })
      .catch((err) => console.log(err));
  };

  // customFetch
  const customFetch = (e) => {
    filterParams = "";
    const pageNo = e.target.value;
    // if (formData.location) {
    //   if (filterParams) {
    //     filterParams += "&";
    //   }

    //   filterParams = "location=" + formData.location;
    // }

    // if (formData.cuisine && formData.cuisine.length) {
    //   if (filterParams) {
    //     filterParams += "&";
    //   }

    //   filterParams += "cuisine=" + formData.cuisine.join(",");
    // }

    // if (formData.cost) {
    //   if (filterParams) {
    //     filterParams += "&";
    //   }

    //   filterParams += "cost=" + formData.cost;
    // }

    // if (formData.sort) {
    //   if (filterParams) {
    //     filterParams += "&";
    //   }

    //   filterParams += "sort=" + formData.sort;
    // }

    filterParams += `&page=${pageNo}`;

    fetch("http://localhost:3500/restaurants/filter?" + filterParams)
      .then((res) => res.json())
      .then((result) => {
        setRestaurantList(result.data);
        setRestaurantCount(result.total);

        if (result.data.length === 0) {
          setTimeout(() => {
            setShowNotFound(true);
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  // reset form fields
  const resetFilter = () => {
    document.querySelector("select").value = "";
    const cuisines = Array.from(
      document.querySelectorAll("input[name=cuisine]:checked")
    );

    cuisines.forEach((item) => (item.checked = false));
    const cost = Array.from(
      document.querySelectorAll("input[type=radio]:checked")
    );
    cost.forEach((item) => (item.checked = false));

    fetchAll();
  };

  // step 1
  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <div className="filter">
        <div className="filter__container container">
          <h1>Filter / Sort (TEST)</h1>

          <div className="filter__components">
            <FilterForm
              handleChange={handleChange}
              onSubmit={onSubmit}
              resetFilter={resetFilter}
            />

            {restaurantCount.map((item, index) => (
              <button key={index} value={index + 1} onClick={customFetch}>
                {index + 1}
              </button>
            ))}

            {/* <Pagination
              restaurantList={restaurantList}
              setPageNo={setPageNo}
              restaurantCount={restaurantCount}
            /> */}

            <div className="filter__cards">
              {restaurantList.length ? (
                restaurantList.map((restaurant) => (
                  <div
                    className="filter__card"
                    key={restaurantList.indexOf(restaurant)}
                  >
                    <img src={restaurant.images[0]} alt={restaurant.title} />
                    <div className="filter__cards-info">
                      <p>{restaurant.restaurant_name}</p>
                      <p>
                        {`${restaurant.restaurant_description.substring(
                          0,
                          60
                        )}...`}
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
                  <img
                    src={require("../Assets/no-result.png")}
                    alt="no-result"
                  />
                  <h2>oh snap :(</h2>
                  <h3>
                    Sorry, that filter combination has no results. <br /> Please
                    try different criteria.
                  </h3>
                </div>
              ) : (
                <img src={require("../Assets/loading.gif")} alt="no-result" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterTest;
