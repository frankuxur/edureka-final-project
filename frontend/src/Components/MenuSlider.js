import React, { useState, useEffect } from "react";
import "../Styles/MenuSlider.css";

const MenuSlider = () => {
  const images = [
    {
      image:
        "https://images.unsplash.com/photo-1544598740-0910b979b2c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      image:
        "https://images.unsplash.com/photo-1531856396526-a0c8d7bd628b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1520869578617-557561d7b114?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544598741-6aca6f3f68e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544612332-f405ddff69ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];

  const [currentCount, setCount] = useState(0);
  const timer = () => setCount(currentCount + 1);

  useEffect(() => {
    if (currentCount > images.length - 1) {
      setCount(0);
    }
    const id = setInterval(timer, 3000);
    return () => clearInterval(id);
  }, [currentCount]);

  return (
    <div className="main__slider-wrapper">
      <div className="main__slider">
        {images.map((image, index) => {
          return (
            <div
              className={
                currentCount === index ? "main__slide current" : "main__slide"
              }
              key={index}
            >
              <img src={image.image} alt="na" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuSlider;
