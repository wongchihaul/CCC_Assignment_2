import ColChart from "../charts/lineChart-employment";
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
    "New South Wales",
    "Queensland",
    "Victoria",
    "Western Australia",
  ];
  return (
    <>
        <h3 className={classes.chartTitle}>
          The sentiment score VS The employment rate between 2018 - 2021
        </h3>       
        <ColChart state={state} data={selectedData}></ColChart>
    </>
  );
}

export default StatisticsTweetsNum;
