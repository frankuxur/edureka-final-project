import "../../Styles/Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className=" container footer__container">
          <div className="footer__head">
            <a href="/" className="brand">
              <h1>
                food<span>ish</span>
              </h1>
            </a>

            <div className="footer__options">
              <button>
                <i className="ri-earth-line"></i>
                Country
                <i className="ri-arrow-down-s-line"></i>
              </button>
              <button>
                <i className="ri-global-line"></i>
                Language
                <i className="ri-arrow-down-s-line"></i>
              </button>
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__links-group">
              <h4>ABOUT FOODISH</h4>
              <a href="#">Who We Are</a>
              <a href="#">Blog</a>
              <a href="#">Work With Us</a>
              <a href="#">Investor Relations</a>
              <a href="#">Report Fraud</a>
              <a href="#">Contact Us</a>
            </div>
            <div className="footer__links-group">
              <h4>ZOMAVERSE</h4>
              <a href="#">Foodish</a>
              <a href="#">Blinkit</a>
              <a href="#">Feeding India</a>
              <a href="#">Hyperpure</a>
              <a href="#">Zomaland</a>
            </div>
            <div>
              <div className="footer__links-group">
                <h4>FOR RESTAURANTS</h4>
                <a href="">Partner With Us </a>
                <a href="">Apps For You </a>
              </div>
              <div className="footer__links-group">
                <h4>FOR ENTERPRISES</h4>
                <a href="">Zomato For Work</a>
              </div>
            </div>
            <div className="footer__links-group">
              <h4>LEARN MORE</h4>
              <a href="">Privacy</a>
              <a href="">Security</a>
              <a href="">Terms</a>
              <a href="">Sitemap</a>
            </div>

            <div className="socials footer__links-group">
              <h4>SOCIAL LINKS</h4>

              <div className="socials__links">
                <i className="ri-linkedin-fill"></i>
                <i className="ri-instagram-line"></i>
                <i className="ri-twitter-line"></i>
                <i className="ri-youtube-line"></i>
                <i className="ri-facebook-fill"></i>
              </div>

              <div className="download-app">
                <button>
                  <i className="ri-apple-fill"></i> App Store
                </button>
                <button>
                  <i className="ri-google-play-fill"></i> Google Play
                </button>
              </div>
            </div>
          </div>
          <h5>
            By continuing past this page, you agree to our Terms of Service,
            Cookie Policy, Privacy Policy and Content Policies. All trademarks
            are properties of their respective owners. 2008-2022 © Foodish™ Ltd.
            Designed & Developed by Ashish Frank Kujur. All rights reserved.
          </h5>
        </div>
      </div>
    </>
  );
};

export default Footer;
