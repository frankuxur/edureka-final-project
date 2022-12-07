const About = () => {
  return (
    <section id="about">
      <div className="about__container container">
        <div className="about__img">
          <img
            src={require("../Assets/cat-han-URi_yR9qtgs-unsplash.jpg")}
            // src="https://media.tenor.com/e5SgC4xTQtgAAAAC/salt-bae.gif"
            alt="about"
          />
        </div>

        <div className="about__info">
          <h1>Who We Are</h1>
          <p>
            For over a decade now, we’ve been empowering our customers in
            discovering new tastes and experiences across countries. By putting
            together meticulous information for our customers, we enable them to
            make an informed choice.
          </p>
          <br />
          <p>
            Launched in 2010, Our technology platform connects customers,
            restaurant partners and delivery partners, serving their multiple
            needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
