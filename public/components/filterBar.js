/*
  filterBar.js

  This component provides the section and title display that allows the user to 
  browse the available articles and select one for display. 

  This component provides the user to select the option of Top, New, Hot to filter posts

   props:
    -currentSortFilter: current filter selected
    -setCurrentSortFilter: sets current filter based on button click
*/

import Button from "@mui/material/Button";
import PropTypes from "prop-types";

function filterBar({ currentSortFilter, setCurrentSortFilter }) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* Maybe want some sort of sections view / titles view combo? */}
      <Button
        variant="outlined"
        onClick={() => setCurrentSortFilter("new")}
        disabled={currentSortFilter === "new"}
      >
        New
      </Button>
      <Button
        style={{ marginLeft: "5%" }}
        variant="outlined"
        onClick={() => setCurrentSortFilter("hot")}
        disabled={currentSortFilter === "hot"}
      >
        Hot
      </Button>
    </div>
  );
}

export default filterBar;

filterBar.propTypes = {
  currentSortFilter: PropTypes.oneOf(["new", "hot"]),
  setCurrentSortFilter: PropTypes.func,
};
