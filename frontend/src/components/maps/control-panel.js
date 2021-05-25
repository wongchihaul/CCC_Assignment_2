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
  const [loading, setLoading] = useState(false);

  function onSearch() {
    const searchTerm = {
      new_year: year,
      new_dataset: {
        path_1: path1,
        path_2: path2,
        scenario: scenario,
      },
    };
    props.onChange(searchTerm);
  }

  return (
    <>
      <h3>Selecting Data setting</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <text>Explore data from</text>
        <Select
          defaultValue="tweets"
          style={{ width: 120 }}
          onChange={(value) => setPath1(value)}
        >
          <Option value="tweets">Tweets</Option>
          <Option value="aurin">Aurin</Option>
        </Select>
        <Select
          defaultValue="Sentiment_score"
          style={{ width: 120 }}
          onChange={(value) => setPath2(value)}
        >
          <Option value="sentiment_score">Sentiment</Option>
          <Option value="tweet_count">Number of Tweets</Option>
        </Select>
        <text>By</text>

        <Select
          defaultValue="SY"
          style={{ width: 120 }}
          onChange={(value) => setScenario(value)}
        >
          <Option value="SY">State</Option>
          <Option value="SCY">City</Option>
        </Select>
        <Select
          defaultValue={year}
          style={{ width: 120 }}
          onChange={(value) => setYear(value)}
        >
          <Option value="2019">2019</Option>
          <Option value="2020">2020</Option>
          <Option value="2021">2021</Option>
        </Select>
      </div>
      <Button
        type="primary"
        icon={<SearchOutlined />}
        loading={props.loading}
        onClick={onSearch}
      >
        Search
      </Button>

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
