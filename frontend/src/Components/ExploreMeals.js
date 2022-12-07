import "../Styles/ExploreMeals.css";

const ExploreMeals = () => {
  const cards = [
    {
      title: "Breakfast",
      image: "breakfast.jpg",
      description: "Start your day with exclusive breakfast options",
    },
    {
      title: "Lunch",
      image: "lunch.jpg",
      description: "Start your day with exclusive breakfast options",
    },
    {
      title: "Snacks",
      image: "snacks.jpg",
      description: "Start your day with exclusive breakfast options",
    },
    {
      title: "Dessert",
      image: "dessert.jpg",
      description: "Start your day with exclusive breakfast options",
    },
    {
      title: "Dinner",
      image: "dinner.jpg",
      description: "Start your day with exclusive breakfast options",
    },
    {
      title: "Drinks",
      image: "drinks.jpg",
      description: "Start your day with exclusive breakfast options",
    },
    {
      title: "Night Life",
      image: "nightlife.jpg",
      description: "Start your day with exclusive breakfast options",
    },
  ];

  return (
    <>
      <section id="explore">
        <div className="explore__container container">
          <h1>Explore Meals</h1>
          <p>Discover restaurants by type of meal</p>

          <div className="explore__cards">
            {cards.map((card, index) => (
              <div
                className="explore__card"
                key={index}
                onClick={() => {
                  window.location.href = "/filter";
                }}
              >
                <img
                  src={require(`../Assets/${card.image}`)}
                  alt={card.title}
                  className="explore__card-img"
                />
                <p>{card.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section id="explore">
        <div className="explore__container container">
          <h1>Explore Meals</h1>
          <p>Discover restaurants by type of meal</p>

          <div className="explore__cards">
            {cards.map((card) => (
              <div className="explore__card" key={cards.indexOf(card)}>
                <img
                  src={require(`../Assets/${card.image}`)}
                  alt={card.title}
                />
                <div className="explore__cards-info">
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                </div>
                <button
                  onClick={() => {
                    window.location.href = "/filter";
                  }}
                >
                  More...
                </button>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
};

export default ExploreMeals;
