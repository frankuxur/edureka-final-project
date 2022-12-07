import { useEffect, useState } from "react";

const Pagination = ({ restaurantList, setPageNo, restaurantCount }) => {
  const [displayRestaurant, setDisplayRestaurants] = useState([]);
  const [countArray, setCountArray] = useState([]);

  const handlePagination = () => {
    const len = restaurantCount;
    let pages;
    if (len % 2 !== 0) {
      pages = Math.floor(len / 2 + 1);
    } else {
      pages = len / 2;
    }

    const foo = [];

    for (let i = 1; i <= pages; i++) {
      let temp = [];
      let index = i * 2;

      temp.push(index - 1);

      if (index - 1 !== len) {
        temp.push(index);
      }

      foo.push(temp);
    }

    // console.log(foo);

    setDisplayRestaurants(foo);
  };

  // const handleClick = (e) => {
  //   console.log(e.target.innerHTML);
  // };

  const handleClick = (index) => {
    setPageNo(index);
  };

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= restaurantCount; i++) {
      arr.push(i);
    }
    setCountArray(arr);
    handlePagination();
  }, []);
  return (
    <>
      <div className="pagination">
        <div className="pagination__container container">
          <div className="pagination__buttons">
            {displayRestaurant.map((item, index) => (
              <button>{index + 1}</button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
{
  /* {dislayRestaurant.map((item, index) => (
              <button onClick={handleClick}>{index + 1}</button>
            ))} */
}

{
  /* {restaurantList.map((item, index) => {
              if (Math.ceil(restaurantList.length / 2) > index) {
                return (
                  <button
                    value={index + 1}
                    onClick={() => handleClick(index + 1)}
                  >
                    {index + 1}
                  </button>
                );
              }
            })} */
}
