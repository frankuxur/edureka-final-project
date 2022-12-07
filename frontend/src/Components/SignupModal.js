import { useState } from "react";
import axios from "axios";
import "../Styles/SignupModal.css";

const Signup = ({ setShowSignupModal, setShowLoginModal }) => {
  const [signupData, setSignupData] = useState({});
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showSignupMessage, setShowSignupMessage] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setShowSignupMessage(false);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSignupMessage(false);

    let formValidationArr = Array.from(
      document.querySelectorAll(".form-validation h5")
    );

    let isValid = false;

    formValidationArr.forEach((i) => {
      isValid = i.innerText ? false : true;
    });

    if (!isValid) {
      return;
    }

    axios
      .post("http://localhost:3500/userdetail/signup", formData)
      .then((res) => setSignupData(res.data))
      .catch((err) => console.log(err));

    if (signupData.status === 400) {
      console.log(signupData.message);
      setShowSignupMessage(true);
    } else if (signupData.status === 200) {
      setShowLoginMessage(true);
      setTimeout(() => {
        setShowLoginMessage(false);
        setShowSignupModal(false);
        setShowLoginModal(true);
      }, 4000);
    }
  };

  return (
    <>
      <div className="signup-modal">
        <div className="signup-modal__container">
          <i
            className="ri-close-line"
            onClick={() => setShowSignupModal(false)}
          ></i>

          <form className="signup-modal__form">
            <i className="ri-user-add-line"></i>

            <h1>become a member!</h1>

            <a href="/">Already have an account? Login</a>

            <div className="signup-modal__name-fields">
              <input
                type="text"
                name="fname"
                placeholder="first name"
                // value={formData.fname}
                onChange={handleChange}
              />

              <input
                type="text"
                name="lname"
                placeholder="last name"
                // value={formData.lname}
                onChange={handleChange}
              />
            </div>

            <input
              type="text"
              name="username"
              placeholder="username"
              // value={formData.username}
              onChange={handleChange}
            />

            <input
              type={isShowPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              // value={formData.password}
              onChange={handleChange}
            />
            <i
              className={
                isShowPassword
                  ? "ri-eye-off-line password-icon"
                  : "ri-eye-line password-icon"
              }
              onClick={() => setIsShowPassword(!isShowPassword)}
            ></i>

            <div className="form-validation">
              <h5>
                {formData.fname.length ? "" : "first name can't be empty"}
              </h5>
              <h5>{formData.lname.length ? "" : "last name can't be empty"}</h5>

              <h5>
                {formData.username.length < 6
                  ? "username must have at least 6 characters"
                  : ""}
              </h5>
              <h5>
                {formData.password.length < 6
                  ? "password must have at least 6 characters"
                  : ""}
              </h5>
            </div>

            <button onClick={handleSubmit}>signup</button>
          </form>

          {showSignupMessage ? (
            <h4 className="signup-msg" style={{ backgroundColor: "#ee6e6e" }}>
              Username already exists!
            </h4>
          ) : (
            ""
          )}

          {showLoginMessage ? (
            <h4 className="signup-msg">Account created! Proceed to Login</h4>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Signup;
