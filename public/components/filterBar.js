/*
  filterBar.js

  This component provides the section and title display that allows the user to 
  browse the available articles and select one for display. 

  This component provides the user to select the option of Top, New, Hot to filter posts

   props:
    -currentFilter: current filter selected
    -setCurrentFilter: sets current filter based on button click
*/

//import PropTypes from "prop-types";

function filterBar({ currentFilter, setCurrentFilter }) {
  return (
    <div>
      {/* Maybe want some sort of sections view / titles view combo? */}
      <button
        onClick={() => setCurrentFilter("new")}
        disabled={currentFilter === "new"}
      >
        New
      </button>
      <button
        onClick={() => setCurrentFilter("hot")}
        disabled={currentFilter === "hot"}
      >
        Hot
      </button>
      <button
        onClick={() => setCurrentFilter("recent")}
        disabled={currentFilter === "recent"}
      >
        Recent
      </button>
    </div>
  );
}

export default filterBar;

//WRITE PROP TYPES
