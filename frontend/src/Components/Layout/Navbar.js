import { useEffect, useState } from "react";
import "../../Styles/Navbar.css";
import HeaderSearch from "../HeaderSearch";
import MenuSlider from "../MenuSlider";
// import LoginModal from "../LoginModal";
// import SignupModal from "../SignupModal";

// Test
import LoginTest from "../LoginTest";
import SignupTest from "../SignupTest";

const Navbar = ({ username }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showHeaderSearch, setShowHeaderSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const [isAtHome, setIsAtHome] = useState(false);

  const handleRoute = () => {
    const currentLocation = window.location.href;
    const originalLocation = window.location.origin;
    if (
      originalLocation + "/" === currentLocation ||
      originalLocation + "/#" === currentLocation ||
      originalLocation + "/#explore" === currentLocation ||
      originalLocation + "/#about" === currentLocation
    ) {
      setIsAtHome(true);
    }
  };

  const locationFetch = () => {
    // MyRestaurantNew
    fetch("http://localhost:3500/locations")
      .then((res) => res.json())
      .then((locations) => {
        setLocations(locations.data);
      });
  };

  const onLocationSelect = (currentLocation) => {
    // MyRestaurantNew
    fetch("http://localhost:3500/restaurants?location=" + currentLocation)
      .then((res) => res.json())
      .then((restuarants) => {
        setRestaurants(restuarants.data);
      });
  };

  const onRestaurantSelect = (currentRestaurant) => {
    window.location.href =
      window.location.origin + "/restaurant/" + currentRestaurant;
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    locationFetch();
    handleRoute();
  }, []);

  // const toggleBtn = document.querySelector(".toggle");
  // console.log(toggleBtn);
  // toggleBtn.addEventListener("click", () =>
  //   toggleBtn.classList.add("ri-close-line")
  // );

  const menuSlider = document.querySelector(".header__nav");
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    menuSlider.style.transform = showMenu
      ? "translateX(-100%)"
      : "translateX(0%)";

    showMenu && setShowHeaderSearch(false);
  };

  // const navItemsArr = Array.from(document.querySelectorAll(".nav-item"));

  // navItemsArr.length &&
  //   navItemsArr[0].innerText === "Explore" &&
  //   navItemsArr[0].addEventListener("click", toggleMenu);
  // navItemsArr.length &&
  //   navItemsArr[1].innerText === "About" &&
  //   navItemsArr[1].addEventListener("click", toggleMenu);

  // window.addEventListener("resize", () => {
  //   if (window.innerWidth > 1024) {
  //     menuSlider.style.transform = "translateX(0%)";
  //   }
  // });

  return (
    <>
      <header id="header">
        <div className="header__container container">
          {username && (
            <div
              className="user-tab"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <h1>
                <i className="ri-user-3-line"></i>
                {username}
                <i className="ri-arrow-down-s-line"></i>
              </h1>

              {showUserMenu ? (
                <div>
                  <p>
                    {localStorage.fname} {localStorage.lname}
                  </p>

                  <button onClick={logout}>logout</button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}

          <a href="/" className="brand">
            <h1>
              food<span>ish</span>
            </h1>
          </a>

          <nav className="header__nav">
            <ul className="nav-items">
              {isAtHome ? (
                <>
                  <li className="nav-item" onClick={toggleMenu}>
                    <a href="#explore">explore</a>
                  </li>
                  <li className="nav-item" onClick={toggleMenu}>
                    <a href="#about">about</a>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <a href="/">home</a>
                </li>
              )}

              {username ? (
                ""
              ) : (
                <>
                  <li
                    className="nav-item"
                    onClick={() => setShowLoginModal(true)}
                  >
                    <button>login</button>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => setShowSignupModal(true)}
                  >
                    <button>create an account</button>
                  </li>
                </>
              )}

              {/* <li className="nav-item"> */}
              <HeaderSearch
                locations={locations}
                restaurants={restaurants}
                showHeaderSearch={showHeaderSearch}
                onLocationSelect={onLocationSelect}
                onRestaurantSelect={onRestaurantSelect}
                setShowHeaderSearch={setShowHeaderSearch}
              />
              {/* </li> */}

              {/* <MenuSlider /> */}
            </ul>
          </nav>

          <i
            className={`toggle-menu ${
              showMenu ? "ri-close-line" : "ri-menu-line"
            }`}
            onClick={toggleMenu}
          ></i>
        </div>
      </header>

      {/* {showLoginModal ? (
        <LoginModal setShowLoginModal={setShowLoginModal} />
      ) : (
        ""
      )} */}

      {showLoginModal ? (
        <LoginTest
          setShowSignupModal={setShowSignupModal}
          setShowLoginModal={setShowLoginModal}
        />
      ) : (
        ""
      )}

      {/* {showSignupModal ? (
        <SignupModal
          setShowSignupModal={setShowSignupModal}
          setShowLoginModal={setShowLoginModal}
        />
      ) : (
        ""
      )} */}

      {showSignupModal ? (
        <SignupTest
          setShowSignupModal={setShowSignupModal}
          setShowLoginModal={setShowLoginModal}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
