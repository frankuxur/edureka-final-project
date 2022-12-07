import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Styles/Details.css";

const Details = () => {
  const params = useParams();

  const [restaurantDetail, setRestaurantDetail] = useState({});
  const [isLoggedin, setIsLoggedIn] = useState(false);

  const authorise = () => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:3500/userdetail/authorise", {
          headers: { token: token },
        })
        .then((res) => {
          if (res.data.status === 200) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => console.log("not logged in"));
    }
  };

  const checkout = () => {
    const body = {
      items: [
        {
          id: 1,
          quantity: 3, // Learn Express
        },
        {
          id: 2,
          quantity: 1, // Learn MongoDB
        },
      ],
    };

    fetch("http://localhost:3500/payment/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      // fetch call doesn't fail on its own, so we need to handle the failure
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        localStorage.setItem("enable_url", "true")
        window.location = url;
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetch(
      `http://localhost:3500/restaurants?restaurant=${params.restaurant_id}`
    )
      .then((res) => res.json())
      .then((detail) => setRestaurantDetail(detail.data[0]));

    authorise();
  }, [params]);

  // console.log(restaurantDetail);

  return (
    <>
      {restaurantDetail ? (
        <div className="restaurant-details">
          <div className="container restaurant-details__container">
            {restaurantDetail.images && (
              <div className="restaurant-details__images">
                <img src={restaurantDetail.images[0]} alt="restaurant" />
                <div>
                  <img src={restaurantDetail.images[1]} alt="restaurant" />
                  <img src={restaurantDetail.images[2]} alt="restaurant" />
                </div>
              </div>
            )}

            <div className="restaurant-details__info">
              <h1>
                <i className="ri-store-line"></i>
                {restaurantDetail.restaurant_name}
              </h1>
              <p>
                <i className="ri-map-pin-line"></i> Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Assumenda, dolore.
              </p>
              <p>Average Cost: INR {restaurantDetail.cost}</p>
              <p>{restaurantDetail.restaurant_description}</p>
              <p>Opens at 9am | Closes at 11pm</p>
              <p>
                <i className="ri-phone-line"></i> +91 9182349863
              </p>

              {isLoggedin ? (
                <button onClick={checkout}>
                  <i className="ri-shopping-bag-line"></i>Place Order!
                </button>
              ) : (
                <button style={{ backgroundColor: "#777" }}>
                  <i className="ri-lock-2-line"></i>Login To Place Order
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        (window.location.href = window.location.origin + "/404")
      )}
    </>
  );
};

export default Details;
