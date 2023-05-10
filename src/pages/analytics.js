import React from "react";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
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
import { enGB } from "date-fns/locale";
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

export default function AnalyticsDisplay({ renderChart = true }) {
  const controlPanelWidth = 25; // UI mod
  // stores the current issue to be analyzed
  const [compare, setCompare] = useState("Housing");

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
  return (
    <div
      data-testid="wholepage"
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
                key={`analyticsGroup${key.toString()}`}
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
        <div style={{ width: `${100 - controlPanelWidth}%`, height: "100%" }}>
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

      <AccordionDetails
        data-testid="accordiondetails"
        style={{ backgroundColor: "white" }}
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
function filterUser(user, filter) {
  const idMappings = {
    classes: "classYear",
    majors: "major",
  };
  // filtering by user information
  // run checks through each key of the filter, make sure the user possesses at least one property as specified
  if (!!user) {
    for (const [key, value] of Object.entries(filter)) {
      // iterate through the filter object: key = classes, majors, etc.
      let passes = value.length === 0; // if that filter category is empty, let it pass
      if (!passes) {
        // loop through the filter category and see if the user matches any of the specified options
        value.forEach((element) => {
          // check if the element belongs to the user s.t. element = "2023" or "CSCI" etc.
          passes = element === user[idMappings[key]].toString() ? true : passes;
        });
        // if the datapoint doesn't pass the filter, don't include it
        if (!passes) {
          return false;
        }
      }
    }
  }
  return true;
}
async function formatData(filters, categoryFilter, posts, comments, votes) {
  const currDate = posts.reduce((minDate, nextPost) => {
    return minDate < new Date(nextPost.created_at)
      ? minDate
      : new Date(nextPost.created_at);
  }, new Date());
  // Pooling the data- i.e. monthly

  const pooledDates = [];
  let pooledLineData = [];
  for (let i = 0; i < filters.length; i++) {
    pooledLineData.push([]);
  } // theres definitely a better way to do this but this is working
  let monthIdx = -1;

  while (currDate <= new Date()) {
    // check if we need to increment the month
    if (
      !pooledDates.includes(
        `${(currDate.getMonth() + 1).toString()}/${currDate
          .getFullYear()
          .toString()}`
      )
    ) {
      // if we do: add the new month to our dates and linedata
      pooledDates.push(
        `${(currDate.getMonth() + 1).toString()}/${currDate
          .getFullYear()
          .toString()}`
      );
      pooledLineData.forEach((pld) => pld.push(0));
      monthIdx += 1;
    }

    // for each different filter we want to save the data filtered by that filter to an array in lineData
    filters.forEach((f, fIdx) => {
      // ^ get activity for posts on that day
      let countPassing = posts.reduce((count, post) => {
        // get the corresponding user
        return (
          count +
          (new Date(post.created_at).toLocaleDateString() ===
            currDate.toLocaleDateString() &&
            filterUser(post.poster, f.filters) &&
            post.category === categoryFilter)
        );
      }, 0);

      //^ get activity for comments on that day
      countPassing += comments.reduce((count, comment) => {
        return (
          count +
          (new Date(comment.created_at).toLocaleDateString() ===
            currDate.toLocaleDateString() &&
            filterUser(comment.poster, f.filters) &&
            comment.post.category === categoryFilter) /
            2
        );
      }, 0);

      //^ get activity for votes on that day
      countPassing += votes.reduce((count, vote) => {
        return (
          count +
          (new Date(vote.created_at).toLocaleDateString() ===
            currDate.toLocaleDateString() &&
            filterUser(vote.poster, f.filters) &&
            vote.post.category === categoryFilter) /
            10
        );
      }, 0);

      pooledLineData[fIdx][monthIdx] += countPassing;
    });
    currDate.setDate(currDate.getDate() + 1);
  }

  // normalizing the line data
  const normFactorSums = pooledLineData.map((line) =>
    line.reduce((a, b) => a + b, 0)
  );
  pooledLineData = pooledLineData.map((line, i) =>
    line.map((datapoint) => (datapoint / normFactorSums[i]) * 100)
  );

  return [
    pooledDates,
    pooledLineData.map((d, i) => {
      return {
        label: filters[i].label,
        data: d,
        backgroundColor: filters[i].backgroundColor,
        borderColor: filters[i].borderColor,
      };
    }),
  ];
}
/*
saved old code for formatData that creates the data on a day-by-day basis instead of monthly

    let dates = []
    let lineData = [];
    
    for(let i = 0; i<filters.length; i++){ lineData.push([])} // theres definitely a better way to do this but this is working

    while(currDate.toLocaleDateString() !== new Date().toLocaleDateString()){

      // for each different filter we want to save the data filtered by that filter to an array in lineData
      filters.forEach((f, i) => {
        const countPassing = allData["PostSeedData"].reduce(
          function(count, dpt) {
            const user = allData["UserSeedData"].filter(u => u.id === dpt.posterID)[0]; // get the user associated with the post
            return count + (new Date(dpt.created_at).toLocaleDateString() === currDate.toLocaleDateString() && filterDpt(user, f.filters));
        }, 0);
        lineData[i].push(countPassing);
      })
      dates.push(currDate.toLocaleDateString());
      currDate.setDate(currDate.getDate() + 1);
    }
*/
export function LineChart({ categories, compare, setCompare, renderChart }) {
  const [posts, setPosts] = useState([]); // keeps track of all the posts

  // ? temporary implementation ~ tb replaced w/ direct queries:
  //const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState([]);

  // wrap this in an empty useEffect so not as to trigger rerenders infinitely
  useEffect(() => {
    fetch(`/api/analytics/posts`)
      .then((res) => res.json())
      .then((response) => {
        setPosts(response);
      })
      .catch(() => {});

    fetch(`/api/analytics/comments`)
      .then((res) => res.json())
      .then((response) => {
        setComments(response);
      })
      .catch(() => {});

    fetch(`/api/analytics/votes`)
      .then((res) => res.json())
      .then((response) => {
        setVotes(response);
      })
      .catch(() => {});
  }, []);

  const [lineData, setLineData] = useState([[], []]);

  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    (async () => {
      if (posts !== [] && renderChart) {
        // make sure posts is defined before calling this
        const updated = await formatData(
          categories,
          compare,
          posts,
          comments,
          votes
        );
        setLineData(updated);
      }
    })();
  }, [categories, compare, posts, comments, votes]);

  const chartData = {
    labels: lineData[0],
    datasets: lineData[1],
  };

  // issue: every datapoint is being filtered by all the filters

  const chartOptions = {
    scales: {
      x: {
        adapters: {
          date: { locale: enGB },
          type: "time",
          title: {
            display: true,
            text: "Date",
          },
        },
      },
    },
    plugins: {
      title: {
        display: false,
        text: "",
      },
      legend: {
        display: false,
      },
    },
  };

  const issues = [
    "Registration",
    "Housing",
    "Dining",
    "Parking",
    "Facilities",
    "Student Life",
    "Academics",
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
              key += 1;
              return (
                <MenuItem key={`metricDropdown_${key}`} value={m}>
                  {" "}
                  {m}{" "}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <p style={{ margin: "1vw" }}> x </p>

        <FormControl fullWidth data-testid="labelChange">
          <InputLabel> Topic </InputLabel>
          <Select
            data-testid="labelselect"
            value={compare}
            label="Topic"
            onChange={(e) => {
              setCompare(e.target.value);
            }}
          >
            {issues.map((i) => {
              key += 1;
              return (
                <MenuItem
                  key={`topicItem_${key}`}
                  value={i}
                  data-testid={`labelselect-${i}`}
                >
                  {" "}
                  {i}{" "}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      {renderChart && <Line data={chartData} options={chartOptions} />}
    </div>
  );
}
