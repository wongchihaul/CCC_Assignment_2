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
    display: "inline-block",
    margin: "25px 10px",
  formControl: {
      marginTop: "20px",
      minWidth: 120,
    },
  },
}));
function StatisticsTweetsNum() {
  const classes = useStyles();
  const [state, setState] = useState("Victoria");
  const [selectedData, setSelectedData] = useState("tweet_count");
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
          The trends of
        </h3>
        <FormControl className={classes.formControl} variant="outlined" style={{marginTop:'10px'}}>
          <InputLabel id="demo-simple-select-outlined-label">Data</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedData}
            onChange={(event) => setSelectedData(event.target.value)}
          >
            <MenuItem value="tweet_count">number of tweets</MenuItem>
            <MenuItem value="sentiment_score">sentiment score</MenuItem>
          </Select>
        </FormControl>
        <h3 className={classes.chartTitle}>
          in
        </h3>
        <FormControl className={classes.formControl} variant="outlined" style={{marginTop:"10px"}}>
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
        <h3 className={classes.chartTitle}>
          between 2018 - 2021
        </h3>
        
        <LineChart state={state} data={selectedData}></LineChart>
    </>
  );
}

export default StatisticsTweetsNum;
