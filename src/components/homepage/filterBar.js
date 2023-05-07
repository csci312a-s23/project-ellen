/*
	filterBar.js

	This component provides the section and title display that allows the user to 
	browse the available articles and select one for display. 

	This component provides the user to select the option of Top, New, Hot to filter posts

	 props:
		-currentSortFilter: current filter selected
		-setCurrentSortFilter: sets current filter based on button click
*/

//https://codesandbox.io/s/wuydzh?file=/demo.tsx

import Button from "@mui/material/Button";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const buttonStyle = {
  variant: "outlined",
  style: { marginLeft: "5%" },
};

function FilterBar({ currentSortFilter, setCurrentSortFilter }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const changeCategory = (event) => {
    const clicked = event.currentTarget.textContent;
    //if user clicks away from menu reset to new
    !clicked ? setCurrentSortFilter("new") : setCurrentSortFilter(clicked);
    setAnchorEl(null);
  };

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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            {...buttonStyle}
            onClick={() => setCurrentSortFilter("new")}
            disabled={currentSortFilter === "new"}
          >
            New
          </Button>
          <Button
            {...buttonStyle}
            onClick={() => setCurrentSortFilter("hot")}
            disabled={currentSortFilter === "hot"}
          >
            Hot
          </Button>

          <Button
            {...buttonStyle}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {currentSortFilter === "new" || currentSortFilter === "hot" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span>Category</span>
                <KeyboardArrowDownIcon />
              </div>
            ) : (
              currentSortFilter
            )}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={changeCategory}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={changeCategory}>Academics</MenuItem>
            <MenuItem onClick={changeCategory}>Athletics</MenuItem>
            <MenuItem onClick={changeCategory}>Social</MenuItem>
            <MenuItem onClick={changeCategory}>Professors</MenuItem>
            <MenuItem onClick={changeCategory}>Housing</MenuItem>
            <MenuItem onClick={changeCategory}>Dining</MenuItem>
            <MenuItem onClick={changeCategory}>Other</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;

FilterBar.propTypes = {
  currentSortFilter: PropTypes.oneOf([
    "new",
    "hot",
    "Academics",
    "Athletics",
    "Social",
    "Professors",
    "Housing",
    "Dining",
    "Other",
  ]),
  setCurrentSortFilter: PropTypes.func,
};
