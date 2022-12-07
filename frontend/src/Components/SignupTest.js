import React, { useState } from "react";
import axios from "axios";
import "../Styles/SignupModal.css";

const SignupTest = ({ setShowSignupModal, setShowLoginModal }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");
  const [signupMessageColor, setSignupMessageColor] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setSignupMessage("");
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // let formValidationArr = Array.from(
    //   document.querySelectorAll(".form-validation h5")
    // );

    // let isValid = false;

    // formValidationArr.forEach((i) => {
    //   isValid = i.innerText ? false : true;
    // });

    // if (!isValid) {
    //   return;
    // }

    if (
      !formData.fname ||
      !formData.lname ||
      formData.username.length < 6 ||
      formData.password.length < 6
    ) {
      return;
    }

    axios
      .post("http://localhost:3500/userdetail/signup", formData)
      .then((res) => {
        if (res.data.status === 200) {
          setSignupMessage("Account created! Proceed to Login");
          setSignupMessageColor("#ffa500");

          setTimeout(() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }, 3000);
        } else {
          setSignupMessage("Username already exists!");
          setSignupMessageColor("#ee6e6e");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup-modal">
      <div className="signup-modal__container">
        <i
          className="ri-close-line"
          onClick={() => setShowSignupModal(false)}
        ></i>

        <form className="signup-modal__form">
          <i className="ri-user-add-line"></i>

          <h1>become a member!</h1>

          <p
            onClick={() => {
              setShowSignupModal(false);
              setShowLoginModal(true);
            }}
          >
            Already have an account? Login
          </p>

          <div className="signup-modal__name-fields">
            <input
              type="text"
              name="fname"
              placeholder="first name"
              onChange={handleChange}
            />

            <input
              type="text"
              name="lname"
              placeholder="last name"
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
          />

          <input
            type={isShowPassword ? "text" : "password"}
            name="password"
            placeholder="password"
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
            <h5>{formData.fname.length ? "" : "first name can't be empty"}</h5>
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

        {signupMessage.length ? (
          <h4
            className="signup-msg"
            style={{ backgroundColor: signupMessageColor }}
          >
            {signupMessage}
          </h4>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SignupTest;
