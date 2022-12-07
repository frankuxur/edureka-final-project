import { Navigate } from "react-router-dom";
import "../Styles/Success.css";

const Success = () => {
  const enable_url = localStorage.getItem("enable_url");

  if (enable_url === "true") {
    return (
      <div className="success">
        <div className="success__container container">
          <div className="success__content">
            <div className="success__card">
              <div className="success__msg">
                <i className="ri-check-line"></i>
                <h2>Payment Successful!</h2>
                <p>
                  Transaction Number:
                  {Math.floor(Math.random() * 1000000000) + 1}
                </p>
              </div>

              <div className="success__info">
                <div className="success__info-keys">
                  <p>Amount Paid:</p>
                  <p>Bank:</p>
                </div>
                <div className="success__info-values">
                  <p>$250</p>
                  <p>Mellat Bank</p>
                </div>
              </div>
            </div>

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

export default Success;
