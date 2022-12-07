import { useState } from "react";
import axios from "axios";
import "../Styles/LoginModal.css";

const LoginModal = ({ setShowLoginModal }) => {
  const [loginResponse, setLoginResponse] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(formData);

    axios
      .post("http://localhost:3500/userdetail/login", formData)
      .then((res) => setLoginResponse(res.data))
      .catch((err) => console.log({ message: "Wrong User Credentials" }));

    // console.log(loginResponse.status);
    if (loginResponse.status === 200) {
      axios
        .get(
          `http://localhost:3500/userdetail/getuserdetails?username=${formData.username}`
        )
        .then((res) => {
          let data = res.data.data[0];

          localStorage.setItem("fname", data.first_name);
          localStorage.setItem("lname", data.last_name);
          localStorage.setItem("token", loginResponse.data.token);
          localStorage.setItem("username", formData.username);
        })
        .catch((err) => console.log("not found"));
      // console.log(loginResponse.data.token);

      window.location.reload();
    }

    // fetch("http://localhost:3500/userdetail/login", {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    //   headers: { "Content-type": "application/json;charset=UTF-8" },
    // })
    //   .then((response) => response.json)
    //   .then((data) => console.log(data));
  };

  return (
    <>
      <div className="login-modal">
        <div className="login-modal__container">
          <i
            className="ri-close-line"
            onClick={() => setShowLoginModal(false)}
          ></i>

          <div className="login-modal__img">
            <img src={require("../Assets/login.jpg")} alt="" />
          </div>

          <div className="login-modal__form">
            <h1>Login to order fresh meals</h1>

            <input
              type="text"
              placeholder="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
            />

            <button onClick={handleSubmit}>login</button>

            <a href="/">new user? create a new account!</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
