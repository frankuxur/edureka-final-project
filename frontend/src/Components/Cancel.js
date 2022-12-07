import { Navigate } from "react-router-dom";
import "../Styles/Cancel.css";

const Cancel = () => {
  const enable_url = localStorage.getItem("enable_url");

  if (enable_url === "true") {
    return (
      <div className="cancel">
        <div className="cancel__container container">
          <div className="cancel__content">
            <h2>Payment Failed!</h2>
            <div
              className="back-btn"
              onClick={() => {
                localStorage.removeItem("enable_url");
                window.location.href = "/";
              }}
            >
              <i className="ri-arrow-left-s-line"></i>
              BACK
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" replace={true} />;
  }
};

export default Cancel;
