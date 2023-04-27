import React from "react";
import { useState } from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";

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
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function page() {
  return <AnalyticsDisplay />;
}

function AnalyticsDisplay() {
  const controlPanelWidth = 25; // %
  // Class, Athlete, 1st Gen, Gender, ...

  // stores the current issue to be analyzed
  const [compare, setCompare] = useState("Housing");

  // stores the current categories (of students) being graphed
  const [categories, setCategories] = useState([]);

  let key = 0;

  return (
    <div
      style={{
        width: "100vw",
        height: "90vh",
        backgroundColor: "grey",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        style={{
          width: "70%",
          height: "80%",
          display: "flex",
          flexDirection: "row",
        }}
        elevation={10}
      >
        <Paper
          style={{
            width: `${controlPanelWidth}%`,
            height: "100%",
            backgroundColor: "#333333",
            overflow: "auto",
          }}
          elevation={20}
          varaint="outlined"
        >
          {categories.map((c) => {
            key++;
            return (
              <div
                key={`analyticsGroup${  key.toString()}`}
                style={{ margin: "5% 5% 0% 5%" }}
              >
                <MakeGroup
                  c={c}
                  categories={categories}
                  setCategories={setCategories}
                />
              </div>
            );
          })}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "3vh",
            }}
          >
            <Button
              variant="outline"
              style={{ backgroundColor: "white" }}
              onClick={() => {
                const newcolor = Math.floor(Math.random() * 16777215).toString(
                  16
                ); // generate a random hex code
                const temp = [...categories];
                temp.push({
                  // add a new category
                  // filters
                  classes: [],
                  majors: [],
                  athletics: [],
                  misc: [],

                  // for the graph
                  label: "",
                  data: Array.from({ length: 9 }, () =>
                    Math.floor(Math.random() * 100)
                  ), // randomize the data for now
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

        <div style={{ width: `${100 - controlPanelWidth}%`, height: "100%" }}>
          <LineChart
            data={{
              labels: [
                "Sept",
                "Oct",
                "Nov",
                "Dec",
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
              ], // temporary data labels
              datasets: categories,
            }}
            compare={compare}
            setCompare={setCompare}
          />
        </div>
      </Paper>
    </div>
  );
}
function MakeGroup({ c, categories, setCategories }) {
  const groups = [
    ["classes", ["Freshmen", "Sophomores", "Juniors", "Seniors"]],
    [
      "majors",
      [
        "Science",
        "Mathematics",
        "Computer Science",
        "History",
        "Pre-Law",
        "Literature",
      ],
    ],
    ["athletics", ["Varsity Athletes", "Club Athletes", "Non-athletes"]],
    ["misc", ["1st Gen", "College-employed", "Minority Group"]],
  ];
  let key = 0;
  return (
    <Accordion style={{ backgroundColor: c.backgroundColor }}>
      <AccordionSummary
        //expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <TextField label="Group Name" variant="standard" />
        <Box sx={{ "& button": { m: 1 } }}>
          <IconButton
            variant="contained"
            size="small"
            style={{ backgroundColor: "", marginRight: 0 }}
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

      <AccordionDetails style={{ backgroundColor: "white" }}>
        {groups.map((g) => {
          key++;
          return (
            <MakeDropDown
              key={`groupSpecs${  key.toString()}`}
              options={g[1]}
              label={g[0]}
              c={c}
              categories={categories}
              setCategories={setCategories}
            />
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
}

function MakeDropDown({ options, label, c, categories, setCategories }) {
  const handleChange = (e) => {
    let {
      target: { value },
    } = e;
    value = typeof value === "string" ? value.split(",") : value;

    const modified = [...categories];
    const changeIdx = modified.findIndex(
      (obj) => JSON.stringify(obj) === JSON.stringify(c)
    );
    modified[changeIdx][label] = value;
    setCategories(modified);
  };
  let key = 0;
  return (
    <FormControl sx={{ width: "100%", marginTop: "5%" }}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={c[label]} // values
        onChange={(e) => handleChange(e, label)}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {options.map((option) => {
          key++;
          return (
            <MenuItem
              key={`${option}_${c}_${key}`}
              value={option.substring(0, 2)}
            >
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

function LineChart({ data, compare, setCompare }) {
  const issues = [
    "Registration",
    "Housing",
    "Dining",
    "Parking",
    "Facilities",
    "Student Life",
    "Academics",
    "SGA",
    "MCAB",
    "Misc",
  ];
  const metrics = ["Post Engagement"];
  let key = 0;
  return (
    <div className="chart-container" style={{ margin: "5vh 5vh 5vh 5vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "2vh",
        }}
      >
        <FormControl fullWidth>
          <InputLabel> Metric </InputLabel>
          <Select
            value={metrics[0]}
            label="Metric"
            onChange={(e) => {
              setMetric(e.target.value);
            }}
          >
            {metrics.map((m) => {
              key++;
              return (
                <MenuItem key={`menuItem${  key.toString()}`} value={m}>
                  {" "}
                  {m}{" "}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <p style={{ margin: "1vw" }}> x </p>

        <FormControl fullWidth>
          <InputLabel> Topic </InputLabel>
          <Select
            data-testid="topicSel"
            value={compare}
            label="Topic"
            onChange={(e) => {
              setCompare(e.target.value);
            }}
          >
            {issues.map((i) => {
              return (
                <MenuItem key={`menuItem_${key}`} value={i}>
                  {" "}
                  {i}{" "}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <Line
        data={data}
        options={{
          plugins: {
            title: {
              display: false,
              text: "",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}
