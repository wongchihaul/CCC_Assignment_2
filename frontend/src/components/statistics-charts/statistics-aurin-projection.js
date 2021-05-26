import { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BarChart from "../charts/barChart";
const endpoint = "45.113.233.7";

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

function AurinPop() {
  const classes = useStyles();
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Greater Melbourne");

  useEffect(() => {
    asyncFetchData();
  }, [0]);
  const asyncFetchData = () => {
    fetch(`http://${endpoint}:3001/aurin/projection/info`)
      .then((response) => response.json())
      .then((json) => {
        let _cityList = [];
        for (let key in json) {
          if (!_cityList.includes(key)) {
            _cityList.push(key);
          }
        }
        setCityList(_cityList);
      });
  };

  return (
    <>
      <h3 className={classes.chartTitle}>
        Projected Employment Growth 2017-2022 in{" "}
      </h3>
      <FormControl
        className={classes.formControl}
        variant="outlined"
        style={{ marginTop: "10px" }}
      >
        <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCity}
          onChange={(event) => setSelectedCity(event.target.value)}
        >
          {cityList.map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}{" "}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <BarChart city={selectedCity}></BarChart>
        </Grid>
      </Grid>
    </>
  );
}

export default AurinPop;
