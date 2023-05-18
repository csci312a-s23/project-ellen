import React from "react";
import { useState } from "react";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import "chartjs-adapter-date-fns";
//this sets the display language. In the documentation it uses "de", which will display dates in German.
import {
  Paper,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  OutlinedInput,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import LineChart from "@/components/analytics/LineChart";
import styles from "../styles/AnalyticsDisplay.module.css";

import { useSession } from "next-auth/react";

export default function AnalyticsDisplay({ renderChart = true }) {
  const { data: session } = useSession();

  const controlPanelWidth = 25; // UI mod
  // stores the current issue to be analyzed
  const [compare, setCompare] = useState("General");

  // stores the current categories (of students) being graphed, default is all students
  const [categories, setCategories] = useState([
    {
      // filters
      filters: {
        classes: [],
        majors: [],
        athletics: [],
        misc: [],
      },

      // for the graph
      label: "All",
      backgroundColor: `#808080`,
      borderColor: `#808080`,
    },
  ]);

  let key = 0;
  if (false && !!session && !session.user.isAdmin) {
    return <p>You need to be an admin to view this page.</p>;
  }
  return (
    <div data-testid="wholepage" className={styles.pagewrapper}>
      <Paper className={styles.outerpaper} elevation={10}>
        <Paper
          style={{ width: `${controlPanelWidth}%` }}
          className={styles.innerpaper}
          elevation={20}
          varaint="outlined"
        >
          {categories.map((c) => {
            key++;
            return (
              <div
                key={`analyticsGroup${key.toString()}`}
                className={styles.group}
              >
                <MakeGroup
                  c={c}
                  categories={categories}
                  setCategories={setCategories}
                />
              </div>
            );
          })}
          <div className={styles.categories}>
            <Button
              variant="outline"
              className={styles.whitebgnd}
              onClick={() => {
                const newcolor = Math.floor(Math.random() * 16777215).toString(
                  16
                ); // generate a random hex code
                const temp = [...categories];
                temp.push({
                  // add a new category
                  // filters
                  filters: {
                    classes: [],
                    majors: [],
                    athletics: [],
                    misc: [],
                  },

                  // for the graph
                  label: "",
                  backgroundColor: `#${newcolor}`,
                  borderColor: `#${newcolor}`,
                });
                setCategories(temp);
              }}
            >
              +New
            </Button>
          </div>
        </Paper>
        <div style={{ width: `${100 - controlPanelWidth}%` }}>
          <LineChart
            categories={categories}
            compare={compare}
            setCompare={setCompare}
            renderChart={renderChart}
          />
        </div>
      </Paper>
    </div>
  );
}
export function MakeGroup({ c, categories, setCategories }) {
  const groups = [
    ["classes", ["2023", "2024", "2025", "2026"]],
    ["majors", ["ECON", "CSCI", "PSCI", "NSCI", "ENVS"]],
  ];
  let key = 0;
  return (
    <Accordion style={{ backgroundColor: c.backgroundColor }}>
      <AccordionSummary
        //expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <TextField label="Group Name" variant="standard" /*value={c.label}*/ />
        <Box sx={{ "& button": { m: 1 } }}>
          <IconButton
            variant="contained"
            data-testid="deletebtn"
            size="small"
            onClick={() => {
              const withRemoved = [...categories].filter(
                (obj) => JSON.stringify(obj) !== JSON.stringify(c)
              );
              setCategories(withRemoved);
            }}
          >
            <DeleteIcon sx={{ color: "#FF0000" }} />
          </IconButton>
        </Box>
      </AccordionSummary>

      <AccordionDetails
        data-testid="accordiondetails"
        className={styles.whitebgnd}
      >
        {groups.map((g) => {
          key++;
          return (
            <MakeDropDown
              key={`groupSpecs${key.toString()}`}
              label={g[0]} // i.e. 'classes'
              options={g[1]} // i.e. ['23', '24', '25', '26']
              c={c} // which category we're rendering / editing
              categories={categories} // react hook storing the current list of custom groupings
              setCategories={setCategories} // setter function for categories
            />
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
}
function MakeDropDown({ options, label, c, categories, setCategories }) {
  /*
    this function creates a dropdown selector for a group- i.e. "Classes" with options "2025", "2024", etc.
  */
  const handleChange = (e) => {
    let {
      target: { value },
    } = e;
    value = typeof value === "string" ? value.split(",") : value;

    // update our categories
    const modified = [...categories];
    const changeIdx = modified.findIndex(
      (obj) => JSON.stringify(obj) === JSON.stringify(c)
    ); // get the index of the object we want to modify
    modified[changeIdx].filters[label] = value; // get the category group we want to modify at a specific label (i.e. classes)
    setCategories(modified);
  };
  let key = 0;
  return (
    <FormControl sx={{ width: "100%", marginTop: "5%" }}>
      <InputLabel>{label}</InputLabel>
      <Select
        data-testid={"dropdown-select"}
        multiple
        value={c.filters[label]} // values
        onChange={(e) => handleChange(e, label)}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} data-testid={`group-${value}`} />
            ))}
          </Box>
        )}
      >
        {options.map((option) => {
          key++;
          return (
            <MenuItem
              data-testid={`options-dropdown`}
              key={`${option}_${c}_${key}`}
              value={option.substring(0, 4)}
            >
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
