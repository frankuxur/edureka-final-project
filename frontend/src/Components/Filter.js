import { useEffect, useState } from "react";
import "../Styles/Filter.css";
import FilterForm from "./FilterForm";
import FilterResult from "./FilterResult";
import Pagination from "./Pagination";
import PaginationTest from "./PaginationTest";

const Filter = () => {
  const [formData, setFormData] = useState({});
  const [restaurantList, setRestaurantList] = useState([]);
  const [showNotFound, setShowNotFound] = useState(false);
  // const [pageNo, setPageNo] = useState(1);

  const fetchAll = () => {
    fetch("http://localhost:3500/restaurants/filter")
      .then((res) => res.json())
      .then((result) => setRestaurantList(result.data));
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
    setCurrentPage(1);
    setIsToOne(true);

    if (formData.location) {
      if (filterParams) {
        filterParams += "&";
      }

      filterParams = "location=" + formData.location;
    }

    if (formData.cuisine && formData.cuisine.length) {
      // if (filterParams) {
      //   filterParams += "&";
      // }

      // filterParams += "cuisine=" + formData.cuisine.join(",");

      // if (filterParams) {
      //   filterParams += "&";
      // }

      const cuisineTemp = document.querySelectorAll(
        "input[name=cuisine]:checked"
      );

      if (!cuisineTemp.length) {
        filterParams += "";
      } else {
        if (filterParams) {
          filterParams += "&";
        }

        filterParams += "cuisine=" + formData.cuisine.join(",");
      }
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

    console.log(filterParams);

    fetch("http://localhost:3500/restaurants/filter?" + filterParams)
      .then((res) => res.json())
      .then((result) => {
        setRestaurantList(result.data);

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
    setFormData({});
  };

  useEffect(() => {
    fetchAll();
    setCurrentPage(1);
  }, []);

  // Brad's Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  // Get current posts
  let indexOfLastPost = currentPage * postsPerPage;
  let indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = restaurantList.slice(indexOfFirstPost, indexOfLastPost);
  const [isToOne, setIsToOne] = useState(false);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="filter">
        <div className="container filter__container">
          <h1>Filter / Sort</h1>

          <div className="filter__components">
            <FilterForm
              handleChange={handleChange}
              onSubmit={onSubmit}
              resetFilter={resetFilter}
            />

            <PaginationTest
              postsPerPage={postsPerPage}
              totalPosts={restaurantList.length}
              paginate={paginate}
              setIsToOne={setIsToOne}
              isToOne={isToOne}
            />

            <FilterResult
              currentPosts={currentPosts}
              showNotFound={showNotFound}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
