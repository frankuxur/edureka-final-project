import { useState } from "react";
import axios from "axios";
import "../Styles/LoginModal.css";

const LoginTest = ({ setShowLoginModal, setShowSignupModal }) => {
  const [formData, setFormData] = useState({});
  const [loginMessage, setLoginMessage] = useState("");

  const handleChange = (e) => {
    setLoginMessage("");
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      return;
    }

    axios
      .post("http://localhost:3500/userdetail/login", formData)
      .then((response) => {
        // setLoginResponse(response.data);

        localStorage.setItem("token", response.data.data.token);

        if (response.data.status === 200) {
          axios
            .get(
              `http://localhost:3500/userdetail/getuserdetails?username=${formData.username}`
            )
            .then((res) => {
              let data = res.data.data[0];
              console.log(data);

              localStorage.setItem("fname", data.first_name);
              localStorage.setItem("lname", data.last_name);
              localStorage.setItem("username", formData.username);

              // window.location.href = "/";
              window.location.href = window.location.href;
            })
            .catch((err) => console.log("not found"));
        }
      })
      .catch((err) => setLoginMessage("Wrong User Credentials!"));
  };

  return (
    <div className="login-modal">
      <div className="login-modal__container">
        <i
          className="ri-close-line"
          onClick={() => setShowLoginModal(false)}
        ></i>

        <div className="login-modal__img">
          <img src={require("../Assets/login.jpg")} alt="" />
        </div>

        <form className="login-modal__form">
          <h1>Login to order fresh meal</h1>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>submit</button>

          <p
            onClick={() => {
              setShowLoginModal(false);
              setShowSignupModal(true);
            }}
          >
            new user? create a new account!
          </p>

          <h4 className="login-modal__message">{loginMessage}</h4>
        </form>
      </div>
    </div>
  );
};

export default LoginTest;
