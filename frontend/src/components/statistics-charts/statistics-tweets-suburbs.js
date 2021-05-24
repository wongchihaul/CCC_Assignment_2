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
    display: "inline-block",
    margin: "25px 10px",
  formControl: {
      marginTop: "20px",
      minWidth: 120,
    },
  },
}));
function StatisticsTweetsSuburbs() {
  const classes = useStyles();
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Melbourne");
  const [selectedData, setSelectedData] = useState("sentiment_score");
  const [sentimentData, setSentimentData] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    asyncFetchData("tweet_count");
    asyncFetchData("sentiment_score");
  }, []);
  const asyncFetchData = (type) => {
    fetch(`http://127.0.0.1:3001/tweets/${type}/info?scenario=SCY`)
      .then((response) => response.json())
      .then((json) => {
          let _cityList = [];
          for (let item of json.rows) {
            if (!_cityList.includes(item.key[1])) {
              _cityList.push(item.key[1]);
            }
          }
          setCityList(_cityList);
          if(type === "sentiment_score"){
            setSentimentData(json.rows) 
          }else(
            setData(json.rows) 
          )
          
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
          The 
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
        <FormControl className={classes.formControl} variant="outlined" style={{marginTop:'10px'}}>
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
        
        {selectedData === "tweet_count" && selectedCity && (<BarChart data={getData(data,selectedCity)} xField='suburb' yField='value' color='#7A7182'></BarChart>)}
        {selectedData === "sentiment_score" && selectedCity && (<BarChart data={getData(sentimentData,selectedCity)} xField='suburb' yField='value' color='#9E7043'></BarChart>)}
    </>
  );
}

export default StatisticsTweetsSuburbs;
