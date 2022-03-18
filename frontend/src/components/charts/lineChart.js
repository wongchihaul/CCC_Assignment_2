import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
const endpoint = "45.113.233.7";

function DemoLine(props) {
  const [data, setData] = useState([]);
  const [showAllData, setShowAllData] = useState([]);
  useEffect(() => {
    asyncFetch(props.data);
  }, [props.data]);
  const asyncFetch = (_data) => {
    fetch(`http://${endpoint}:3001/tweets/${_data}/info?scenario=SY`)
      .then((response) => response.json())
      .then((json) => {
        if (props.state !== "All States") {
          let list = [];
          for (let item of json.rows) {
            if (item.key[0] === props.state) {
              let ele = {
                Year: item.key[1],
                Value: item.value,
              };
              list.push(ele);
            }
          }
          setData(list);
        } else {
          let list = [];
          for (let item of json.rows) {
            let ele = {
              Year: item.key[1],
              Value: item.value,
              Category: item.key[0],
            };
            list.push(ele);
          }
          setShowAllData(list);
        }
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  var config = {
    data: data,
    padding: "auto",
    xField: "Year",
    yField: "Value",
    smooth: "smooth",
    color: "#324965",
  };

  var allStateConfig = {
    data: showAllData,
    xField: "Year",
    yField: "Value",
    seriesField: "Category",
    smooth: "smooth",
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return "".concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return "".concat(s, ",");
          });
        },
      },
    },
    color: ["#1979C9", "#D62A0D", "#FAA219", "#643AA9"],
  };

  var showConfig = props.state !== "All States" ? config : allStateConfig;

  return <Line {...showConfig} />;
}

export default DemoLine;
