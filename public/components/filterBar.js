/*
  filterBar.js

  This component provides the section and title display that allows the user to 
  browse the available articles and select one for display. 

  This component provides the user to select the option of Top, New, Hot to filter posts

   props:
    -currentSortFilter: current filter selected
    -setCurrentSortFilter: sets current filter based on button click
*/

import PropTypes from "prop-types";

function filterBar({ currentSortFilter, setCurrentSortFilter }) {
  return (
    <div>
      {/* Maybe want some sort of sections view / titles view combo? */}
      <button
        onClick={() => setCurrentSortFilter("new")}
        disabled={currentSortFilter === "new"}
      >
        New
      </button>
      <button
        onClick={() => setCurrentSortFilter("hot")}
        disabled={currentSortFilter === "hot"}
      >
        Hot
      </button>
    </div>
  );
}

export default filterBar;

filterBar.propTypes = {
  currentSortFilter: PropTypes.oneOf(["new", "hot"]),
  setCurrentSortFilter: PropTypes.func,
};
