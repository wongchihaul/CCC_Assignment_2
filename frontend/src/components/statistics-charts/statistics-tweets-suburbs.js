// import LineChart from "../charts/lineChart";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import BarChart from "../charts/barChart"


const useStyles = makeStyles((theme) => ({
  chartTitle: {
    margin: "20px 0",
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  },
}));
function StatisticsTweetsSuburbs() {
  const classes = useStyles();
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Melbourne");
  const [data, setData] = useState();

  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch("http://127.0.0.1:3001/tweets/tweet_count/info?scenario=SCY")
      .then((response) => response.json())
      .then((json) => {
          let _cityList = [];
          for (let item of json.rows) {
            if (!_cityList.includes(item.key[1])) {
              _cityList.push(item.key[1]);
            }
          }
          setCityList(_cityList);
          setData(json.rows)  
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const getData = (_data,_city) => {
    let list = []
    for (let _item of _data) {
      if(_item.key[1] === _item.key[2]){continue}
      if(_item.key[1] === _city){
        let ele = {
          suburb: _item.key[2],
          value: _item.value
        }
        list.push(ele)
      }
    }
    return list.sort((a,b)=>(b.value - a.value))
  }

  return (
    <>
        <h3 className={classes.chartTitle}>
          The tweet number of big cities
        </h3>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity}
            onChange={(event) => setSelectedCity(event.target.value)}
          >
            {cityList.map((item,index)=>(<MenuItem value={item} key={index}>{item} </MenuItem>))}
          </Select>
        </FormControl>
        {data && selectedCity && (<BarChart data={getData(data,selectedCity)} xField='suburb' yField='value' color='#7A7182'></BarChart>)}
    </>
  );
}

export default StatisticsTweetsSuburbs;
