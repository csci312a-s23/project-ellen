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
} from "chart.js/auto"; // need this?

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
} from "@mui/material";

//import DeleteIcon from '@mui/icons-material/Delete';

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
  const controlPanelWidth = 25;
  // Class, Athlete, 1st Gen, Gender, ...

  const [compare, setCompare] = useState("Housing");
  // Registration, Housing, Dining, ...

  // stores the current categories (of students) being graphed
  const [categories, setCategories] = useState([]);

  let key = 100;

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
            key += 1;
            return (
              <div key={key} style={{ margin: "5% 5% 0% 5%" }}>
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
                  // filters
                  classes: [],
                  majors: [],
                  athletics: [],
                  misc: [],

                  // for the graph
                  label: "",
                  data: Array.from({ length: 9 }, () =>
                    Math.floor(Math.random() * 100)
                  ),
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
              ],
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
  return (
    <Accordion style={{ backgroundColor: c.backgroundColor }}>
      <AccordionSummary
        //expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <TextField id="standard-basic" label="Group Name" variant="standard" />
        <Box sx={{ "& button": { m: 1 } }}>
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "red", marginRight: 0 }}
            onClick={() => {
              const withRemoved = [...categories].filter(
                (obj) => JSON.stringify(obj) !== JSON.stringify(c)
              );
              setCategories(withRemoved);
            }}
          >
            D
          </Button>
        </Box>
      </AccordionSummary>

      <AccordionDetails style={{ backgroundColor: "white" }}>
        <MakeDropDown
          options={["Freshmen", "Sophomores", "Juniors", "Seniors"]}
          label="classes"
          c={c}
          categories={categories}
          setCategories={setCategories}
        />
        <MakeDropDown
          options={[
            "Science",
            "Mathematics",
            "Computer Science",
            "History",
            "Pre-Law",
            "Literature",
          ]}
          label="majors"
          c={c}
          categories={categories}
          setCategories={setCategories}
        />
        <MakeDropDown
          options={["Varsity Athletes", "Club Athletes", "Non-athletes"]}
          label="athletics"
          c={c}
          categories={categories}
          setCategories={setCategories}
        />
        <MakeDropDown
          options={["1st Gen", "College-employed", "Minority Group"]}
          label="misc"
          c={c}
          categories={categories}
          setCategories={setCategories}
        />
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
  return (
    <FormControl sx={{ width: "100%", marginTop: "5%" }}>
      <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
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
        {options.map((option) => (
          <MenuItem key={option} value={option.substring(0, 2)}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function LineChart({ data, compare, setCompare }) {
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
          <InputLabel id="demo-simple-select-label"> Metric </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={"Post Engagement"}
            label="Metric"
            onChange={(e) => {
              setMetric(e.target.value);
            }}
          >
            <MenuItem value="Post Engagement"> Post Engagement </MenuItem>
          </Select>
        </FormControl>

        <p style={{ margin: "1vw" }}> x </p>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"> Topic </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={compare}
            label="Topic"
            onChange={(e) => {
              setCompare(e.target.value);
            }}
          >
            <MenuItem value="Registration"> Registration </MenuItem>
            <MenuItem value="Housing"> Housing </MenuItem>
            <MenuItem value="Dining"> Dining </MenuItem>
            <MenuItem value="Parking"> Parking </MenuItem>
            <MenuItem value="Facilities"> Facilities </MenuItem>
            <MenuItem value="Student Life"> Student Life </MenuItem>
            <MenuItem value="Academics"> Academics </MenuItem>
            <MenuItem value="SGA"> SGA </MenuItem>
            <MenuItem value="MCAB"> MCAB </MenuItem>
            <MenuItem value="Misc"> Misc </MenuItem>
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
