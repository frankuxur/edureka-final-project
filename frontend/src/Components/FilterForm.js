import React from "react";

const FilterForm = ({ handleChange, onSubmit, resetFilter }) => {
  return (
    <>
      <form className="filter__form">
        <div className="filter__reset-btn" onClick={resetFilter}>
          <i className="ri-restart-line"></i>
          <p>
            RESET <br /> FILTER
          </p>
        </div>
        <div className="filter__fields">
          <label>Select location</label>
          <select
            defaultValue={""}
            name="location"
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <option value="" disabled>
              Select a location
            </option>
            <option value="1">Chennai</option>
            <option value="2">Bangalore</option>
            <option value="3">Hyderabad</option>
          </select>
        </div>

        <div className="filter__fields">
          <label>Cuisines</label>
          <div className="filter__field">
            <input
              type="checkbox"
              name="cuisine"
              id="1"
              value="1"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label className="filter__field-label" htmlFor="1">
              North Indian
            </label>
          </div>

          <div className="filter__field">
            <input
              type="checkbox"
              name="cuisine"
              id="2"
              value="2"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label className="filter__field-label" htmlFor="2">
              South Indian
            </label>
          </div>

          <div className="filter__field">
            <input
              type="checkbox"
              name="cuisine"
              id="3"
              value="3"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label className="filter__field-label" htmlFor="3">
              Fast Food
            </label>
          </div>

          <div className="filter__field">
            <input
              type="checkbox"
              name="cuisine"
              id="4"
              value="4"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label className="filter__field-label" htmlFor="4">
              Any
            </label>
          </div>
        </div>

        <div className="filter__fields">
          <label>Cost</label>
          <div className="filter__field">
            <input
              type="radio"
              name="cost"
              id="lt"
              value="lcost"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label className="filter__field-label" htmlFor="lt">
              Less than 500
            </label>
          </div>

          <div className="filter__field">
            <input
              type="radio"
              name="cost"
              id="gt"
              value="hcost"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label className="filter__field-label" htmlFor="gt">
              Greater than 500
            </label>
          </div>
        </div>

        <div className="filter__fields">
          <label>Sort by</label>
          <div className="filter__field">
            <input
              type="radio"
              name="sort"
              id="hl"
              value="hl"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label className="filter__field-label" htmlFor="hl">
              Prices high to low
            </label>
          </div>
          <div className="filter__field">
            <input
              type="radio"
              name="sort"
              id="lh"
              value="lh"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label className="filter__field-label" htmlFor="lh">
              Prices low to high
            </label>
          </div>
        </div>

        <button onClick={onSubmit}>Apply</button>
      </form>
    </>
  );
};

export default FilterForm;
