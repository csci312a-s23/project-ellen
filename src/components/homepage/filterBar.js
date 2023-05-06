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

function filterBar({ currentSortFilter, setCurrentSortFilter, currentPost }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "200px",
        flexShrink: "0",
        borderLeft: "1px solid lightgrey ",
      }}
    >
      <div
        style={{
          display: "absolute",
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "100px",
          paddingBottom: "200px",
        }}
      >
        {!currentPost && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "300px",
            }}
          >
            {/* Maybe want some sort of sections view / titles view combo? */}
            <h2>Filter by:</h2>
            <Button
              variant="outlined"
              onClick={() => setCurrentSortFilter("new")}
              disabled={currentSortFilter === "new"}
            >
              New
            </Button>
            <Button
              style={{}}
              variant="outlined"
              onClick={() => setCurrentSortFilter("hot")}
              disabled={currentSortFilter === "hot"}
            >
              Hot
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default filterBar;

filterBar.propTypes = {
  currentSortFilter: PropTypes.oneOf(["new", "hot"]),
  setCurrentSortFilter: PropTypes.func,
};
