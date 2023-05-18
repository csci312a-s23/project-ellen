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
import styles from "./filterBar.module.css";

const buttonStyle = {
  variant: "outlined",
  style: { marginLeft: "5%" },
};

function FilterBar({ currentSortFilter, setCurrentSortFilter, currentPost }) {
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
    <div className={styles.externalContainer}>
      <div className={styles.content}>
        {!currentPost && (
          <div className={styles.buttonHolder}>
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
              onClick={() => setCurrentSortFilter("controversial")}
              disabled={currentSortFilter === "controversial"}
            >
              Controversial
            </Button>

            <Button
              {...buttonStyle}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {currentSortFilter === "new" ||
              currentSortFilter === "hot" ||
              currentSortFilter === "controversial" ? (
                <div className={styles.filterButtonDropdown}>
                  <span>All</span>
                  <KeyboardArrowDownIcon />
                </div>
              ) : (
                <div className={styles.filterButtonDropdown}>
                  <span>{currentSortFilter}</span>
                  <KeyboardArrowDownIcon />
                </div>
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
              <MenuItem onClick={changeCategory}>All</MenuItem>
              <MenuItem onClick={changeCategory}>Housing</MenuItem>
              <MenuItem onClick={changeCategory}>Dining</MenuItem>
              <MenuItem onClick={changeCategory}>Parking</MenuItem>
              <MenuItem onClick={changeCategory}>Registration</MenuItem>
              <MenuItem onClick={changeCategory}>General</MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterBar;

FilterBar.propTypes = {
  currentSortFilter: PropTypes.oneOf([
    "new",
    "controversial",
    "hot",
    "All",
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
