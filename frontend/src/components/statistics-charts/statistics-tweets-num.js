import LineChart from "../charts/lineChart";
import {
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  chartTitle: {
    margin: "20px 0",
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  },
}));
function StatisticsTweetsNum() {
  const classes = useStyles();
  const [state, setState] = useState("Victoria");
  const stateList = [
    "All States",
    "New South Wales",
    "Queensland",
    "Victoria",
    "Western Australia",
  ];
  return (
    <>
        <h3 className={classes.chartTitle}>
          The trends of tweets number across states between 2018 - 2021
        </h3>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state}
            onChange={(event) => setState(event.target.value)}
          >
            <MenuItem value={"New South Wales"}>New South Wales</MenuItem>
            <MenuItem value={"Queensland"}>Queensland</MenuItem>
            <MenuItem value={"Victoria"}>Victoria</MenuItem>
            <MenuItem value={"Western Australia"}>Western Australia</MenuItem>
            <MenuItem value={"All States"}>All States</MenuItem>
          </Select>
        </FormControl>
        <LineChart state={state}></LineChart>
    </>
  );
}

export default StatisticsTweetsNum;
