import { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PieChart from "../charts/pieChart";
import ColChart from "../charts/percentageBarChart";

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
  const [data, setData] = useState();
  const [selectedCity, setSelectedCity] = useState("Melbourne");


  useEffect(() => {
    asyncFetchData();
  }, [0]);
  const asyncFetchData = () => {
      fetch(`http://127.0.0.1:3001/aurin//labour/info`)
      .then((response) => response.json())
      .then((json) => {
        let _cityList = [];
        for (let key in json){
          if (!_cityList.includes(key)) {
            _cityList.push(key);
          }
        }
        setCityList(_cityList);
        setData(json); 
      })
  }
    function getData(_data){
        return _data[selectedCity].details
    }



  return (
    <>
      <h3 className={classes.chartTitle}>The Population Distribution & Unemployment Rate in </h3>
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
        <Grid item xs={6}>
            {data && (<PieChart data={getData(data)} angleField="pop_distribution" colorField="age_grp"></PieChart>)}
        </Grid>
        <Grid item xs={6}>
            {data && (<ColChart data={getData(data)} xField=""></ColChart>)}
        </Grid>
      </Grid>
    </>
  );
}

export default AurinPop;
