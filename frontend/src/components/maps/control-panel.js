import * as React from "react";
import { useState } from "react";
import { Select, Button } from "antd";
import "antd/dist/antd.css";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

function ControlPanel(props) {
  const [year, setYear] = useState(props.year);
  const [path1, setPath1] = useState(props.cfg.path_1);
  const [path2, setPath2] = useState(props.cfg.path_2);
  const [scenario, setScenario] = useState(props.cfg.scenario);
  const [city, setCity] = useState("Melbourne");
  const [loading, setLoading] = useState(false);

  function onSearch() {
    if (scenario == "SY") {
      const searchTerm = {
        new_year: year,
        new_dataset: {
          path_1: path1,
          path_2: path2,
          scenario: scenario,
        },
      };
      props.onChange(searchTerm);
    } else {
      const searchTerm = {
        new_city: city,
        new_dataset: {
          path_1: path1,
          path_2: path2,
          scenario: scenario,
        },
      };
      props.onChange(searchTerm);
    }
  }

  return (
    <>
      <h3>Selecting Data setting</h3>
      <div
        style={{
          flexDirection: "row",
          borderRadius: "5px",
        }}
      >
        <p>Map showing the sentiment score of AU.</p>
        <p>Explore data from</p>
        <Select
          defaultValue="tweets"
          style={{ width: 110, marginRight: "10px" }}
          onChange={(value) => setPath1(value)}
        >
          <Option value="tweets">Tweets</Option>
          <Option value="aurin">Aurin</Option>
        </Select>
        {path1 == "tweets" && (
          <Select
            defaultValue="Sentiment_score"
            style={{ width: 110 }}
            onChange={(value) => setPath2(value)}
          >
            <Option value="sentiment_score">Sentiment</Option>
            <Option value="tweet_count">Number of Tweets</Option>
          </Select>
        )}
        {path1 == "aurin" && (
          <Select
            defaultValue="Select"
            style={{ width: 110 }}
            onChange={(value) => setPath2(value)}
          >
            <Option value="labour_summary">Employment rate</Option>
          </Select>
        )}

        {path1 != "aurin" && (
          <>
            <p>By</p>
            <Select
              defaultValue="SY"
              style={{ width: 120 }}
              onChange={(value) => setScenario(value)}
            >
              <Option value="SY">State</Option>
              <Option value="SCY">Suburb_sum</Option>
              <Option value="SCSY">Suburb</Option>
            </Select>
            {scenario == "SY" && (
              <Select
                defaultValue={year}
                style={{ width: 120 }}
                onChange={(value) => setYear(value)}
              >
                <Option value="2019">2019</Option>
                <Option value="2020">2020</Option>
                <Option value="2021">2021</Option>
              </Select>
            )}
            {scenario != "SY" && (
              <Select
                defaultValue="Melbourne"
                style={{ width: 120 }}
                onChange={(value) => setCity(value)}
              >
                <Option value="Melbourne">Melbourne</Option>
                <Option value="Sydney">Sydney</Option>
                <Option value="Brisbane">Brisbane</Option>
                <Option value="Perth">Perth</Option>
              </Select>
            )}
          </>
        )}
      </div>
      <div>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          loading={props.loading}
          onClick={onSearch}
          style={{ marginTop: "10px" }}
        >
          Search
        </Button>
      </div>

      <div className="source-link">
        <a href="https://github.com/Toraycaaa/CCC_Assignment_2" target="_new">
          View Source Code ↗
        </a>
      </div>

      {/* <div key={"year"} className="input">
        <label>Year</label>
        <input
          type="range"
          value={year}
          min={2018}
          max={2020}
          step={1}
          onChange={(e) => setYear(e.target.value)}
        />
      </div> */}
    </>
  );
}

export default React.memo(ControlPanel);
