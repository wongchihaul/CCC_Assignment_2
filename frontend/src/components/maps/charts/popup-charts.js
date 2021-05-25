import {useState, useEffect} from 'react';
import PieChart from "./chart-1";
import LineChart from "./lineChart";


export function PopupCharts(props) {
  const [data, setData] = useState()
  const { info } = props;
  let year = props.year
  const STATE_NAME = info.feature.properties.STATE_NAME;
  useEffect(() => {
    fetch(
      `http://127.0.0.1:3001/tweets/sentiment_score/info?scenario=SY`
    )
      .then(resp => 
        resp.json()
      )
      .then((json) => {
        setData(json)
      });
  }, []);
  function getScore(){
    if(data.rows.filter((item)=>(item.key[0]===STATE_NAME && item.key[1]==year)).length===0){
      return ''
    }
    // console.log(data.rows.filter((item)=>(item.key[0]===STATE_NAME && item.key[1]==year))[0].value)
    return data.rows.filter((item)=>(item.key[0]===STATE_NAME && item.key[1]==year))[0].value.toFixed(2)
  }
  return (
    <>
    {data && (
      <div>
        <p><strong>{STATE_NAME}</strong></p>
        <div>
          <span>Sentiment Score: </span>
          <span>{getScore()}</span>
        </div>
       
        <LineChart style={{width:"300px",height:"200px"}} state={STATE_NAME} data="sentiment_score"></LineChart>
      </div>
    )}
    </>
  );
}
