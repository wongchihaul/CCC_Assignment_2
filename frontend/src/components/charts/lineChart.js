import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';

function DemoLine(){
  const [data, setData] = useState([]);
  let ref;
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch('/iceApi/tweets/tweet_count/info?scenario=SY')
      .then((response) => response.json())
      .then((json) => {
          setData(json)
          console.log(json)
        })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  var config = {
    data: data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      type: 'timeCat',
      tickCount: 5,
    },
  };
  useEffect(() => {
    var cnt = 0;
    var smooth = true;
    var interval = setInterval(function () {
      if (cnt < 5) {
        smooth = !smooth;
        cnt += 1;
        ref.update({ smooth: smooth });
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }, []);

//   return <Line {...config} chartRef={(chartRef) => (ref = chartRef)} />;
return (
    <>
    ???
    </>
)
};

export default DemoLine;