import axios from "axios";

const authorise = (setLoginUser, setIsLoggedIn) => {
  const token = localStorage.getItem("token");
  setLoginUser(localStorage.getItem("username"));

  if (token) {
    console.log(token);
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

export default authorise;
