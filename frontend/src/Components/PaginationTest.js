import { useEffect, useState } from "react";
import "../Styles/Pagination.css";

const PaginationTest = ({
  postsPerPage,
  totalPosts,
  paginate,
  setIsToOne,
  isToOne,
}) => {
  const [pointer, setPointer] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    setIsToOne(false);
  }, []);

  return (
    <div className="pagination">
      <ul className="pagination__numbers">
        {pageNumbers.map((number) => (
          <li key={number} className="pagination__number">
            <h3
              onClick={() => {
                setPointer(number);
                paginate(number);
                setIsToOne(false);
              }}
            >
              {number}
            </h3>
            {isToOne ? (
              number === 1 ? (
                <i className="ri-arrow-up-line"></i>
              ) : (
                ""
              )
            ) : pointer === number ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              ""
            )}
            {/* {number === 1 ? <i className="ri-arrow-up-line"></i> : ""} */}
            {/* {pointer === number ? <i className="ri-arrow-up-line"></i> : ""} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaginationTest;
