import { useState, useEffect, useCallback, useMemo } from "react";
import MapGL, {
  Source,
  Layer,
  Popup,
  FullscreenControl,
  ScaleControl,
  NavigationControl,
} from "react-map-gl";
// import ControlPanel from './control-panel';
import { dataLayer } from "./map-style.js";
import { updatePercentiles, updateSentimentScoreByState } from "./utils";
import { PopupCharts } from "./charts/popup-charts";
import { makeStyles } from "@material-ui/core/styles";
import ControlPanel from "./control-panel";

var SA4_MAP = require("./geojson/SA4_MAP.json");
var VIC_MAP = require("./geojson/VIC_MAP.json");

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidG9yYXljYWFhIiwiYSI6ImNrZXhmOTk4YzBqb2Mydm1mZzB3cnUxNWQifQ.tCTNSJ5vcc_-pF57gh7PVw"; // Set your mapbox token here

const fullscreenControlStyle = {
  top: 0,
  left: 0,
  padding: "10px",
};
const scaleControlStyle = {
  bottom: 0,
  left: 0,
  padding: "10px",
};
const navStyle = {
  top: 36,
  left: 0,
  padding: "10px",
};

const useStyles = makeStyles(() => ({
  tooltip: {
    position: "absolute",
    margin: "8px",
    padding: "4px",
    background: "rgba(0, 0, 0, 0.8)",
    color: "#fff",
    maxWidth: "300px",
    fontSize: "10px",
    zIndex: 9,
    pointerEvents: "none",
  },
  control_panel: {
    position: "absolute",
    top: "70px",
    right: "10px",
    backgroundColor: "white",
    maxWidth: "320px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
    padding: "12px 24px",
    fontSize: "13px",
    lineHeight: 2,
    color: "#6b6b76",
    opacity: 0.8,
  },
}));

const gen_fill_layer = (scale, feature) => {
  return {
    id: "data",
    type: "fill",
    paint: {
      "fill-color": {
        property: feature,
        stops: [
          [0, "#ffffcc"],
          // [0.1*scale, "#ffeda0"],
          [0.2 * scale, "#fed976"],
          // [0.3*scale, "#feb24c"],
          [0.4 * scale, "#fd8d3c"],
          // [0.5*scale, "#fc4e2a"],
          [0.6 * scale, "#e31a1c"],
          [0.8 * scale, "#bd0026"],
          [1 * scale, "#ffeda0"],
        ],
      },
      "fill-opacity": 0.8,
    },
  };
};

const ini_dataset = {
  path_1: "tweets",
  scenario: "SY",
  path_2: "sentiment_score",
};

function Map() {
  const classes = useStyles();
  const [viewport, setViewport] = useState({
    latitude: -27,
    longitude: 135,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });
  const [year, setYear] = useState(2020);
  const [dataset, setDataSet] = useState(ini_dataset);
  const [allData, setAllData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [fillLayer, setFillLayer] = useState(
    gen_fill_layer(1, "sentiment_score")
  );
  const [MAP_TYPE, setMAP_TYPE] = useState("SA4");
  const [loading, setLoading] = useState(false);
  const [map_data, setMap_data] = useState(null);
  const [fetch_data, setFetch_data] = useState(null);
  const [feature, setFeature] = useState("sentiment_score");

  useEffect(() => {
    if (MAP_TYPE == "SA4") {
      console.log("SA4", SA4_MAP);
      setAllData(SA4_MAP);
    } else {
      /* global fetch */
      fetch(
        "https://raw.githubusercontent.com/tonywr71/GeoJson-Data/master/australian-states.json"
      )
        .then((resp) => resp.json())
        .then((json) => {
          setAllData(json);
        });
    }
  }, []);

  useEffect(() => {
    console.log(year);
  }, [year]);

  const onHover = useCallback((event) => {
    const {
      features,
      srcEvent: { offsetX, offsetY },
    } = event;
    const hoveredFeature = features && features[0];
    setHoverInfo(
      hoveredFeature
        ? {
            feature: hoveredFeature,
            x: offsetX,
            y: offsetY,
          }
        : null
    );
  }, []);

  useEffect(() => {
    const { path_1, scenario, path_2 } = dataset;
    if (path_2 != feature) {
      setFeature(path_2);
    }
    setLoading(true);
    if(path_1==="tweets"){
      fetch(`http://127.0.0.1:3001/${path_1}/${path_2}/info?scenario=${scenario}`)
      .then((response) => response.json())
      .then((json) => {
        let new_data = {};
        const index = scenario.length - 2;
        for (let item of json.rows) {
          let curr_year = item.key[item.key.length - 1];
          if (curr_year in new_data) {
            new_data[curr_year][item.key[index]] =
              Math.round(item.value * 100) / 100;
          } else {
            new_data[curr_year] = {};
            new_data[curr_year][item.key[index]] =
              Math.round(item.value * 100) / 100;
          }
          // if (item.key[1] == year) {
          //   new_data[item.key[0]] = Math.round(item.value * 100) / 100;
          // }
        }
        // console.log("newdata", new_data);
        // setMap_data(new_data);
        setFetch_data(new_data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("fetch data failed", error);
      });
    }else if(path_1==="aurin" && path_2==="labour_summary"){
      fetch(`http://127.0.0.1:3001/${path_1}/${path_2}/info`)
      .then((response) => response.json())
      .then((json) => {
        let new_data = {};
        for(let key in json){
          new_data[key] = json[key].yth_unemp_rt_15_24
        }
        setFetch_data(new_data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("fetch data failed", error);
      });
    }
    
  }, [dataset]);

  useEffect(() => {
    
    if (fetch_data != null) {
      console.log("fetch",fetch_data)
      if(dataset.path_1==="aurin"){
        setMap_data(fetch_data);
      }else{
        setMap_data(fetch_data[year]);
      }
      console.log("map",map_data)
    }
  }, [fetch_data, year]);

  const data = useMemo(() => {
    console.log("using memo", map_data);
    let max_value = -1;
    for (let key in map_data) {
      if (map_data[key] > max_value) {
        max_value = map_data[key];
      }
    }
    setFillLayer(gen_fill_layer(max_value, feature));

    return (
      allData &&
      updateSentimentScoreByState(
        allData,
        map_data,
        feature,
        (f) => f.properties.STATE_CODE
      )
    );
  }, [allData, map_data]);

  function onUpdate(value) {
    const { new_dataset, new_year } = value;
    if (new_year != year) {
      setYear(new_year);
    }
    if (new_dataset != dataset || dataset == null) {
      setDataSet(new_dataset);
    }
  }

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={["data"]}
        onHover={!popupInfo ? onHover : null}
        onClick={(event) => {
          const {
            features,
            lngLat: [longitude, latitude],
          } = event;
          const clickedFeature = features && features[0];
          setPopupInfo(
            clickedFeature
              ? {
                  feature: clickedFeature,
                  longitude: longitude,
                  latitude: latitude,
                }
              : null
          );
        }}
      >
        <Source type="geojson" data={data}>
          <Layer {...fillLayer} />
        </Source>
        {hoverInfo && !popupInfo && MAP_TYPE == "SA4" && (
          <div
            className={classes.tooltip}
            style={{ left: hoverInfo.x, top: hoverInfo.y }}
          >
            <div>State: {hoverInfo.feature.properties.STATE_NAME}</div>
            <div>State Code: {hoverInfo.feature.properties.STATE_CODE}</div>
            <div>SA4 Code: {hoverInfo.feature.properties.SA4_CODE}</div>
            <div>SA4_NAME: {hoverInfo.feature.properties.SA4_NAME}</div>
            <div>
              {dataset.path_2}: {hoverInfo.feature.properties[feature]}
            </div>
          </div>
        )}
        {hoverInfo && !popupInfo && MAP_TYPE != "SA4" && (
          <div
            className={classes.tooltip}
            style={{ left: hoverInfo.x, top: hoverInfo.y }}
          >
            <div>State: {hoverInfo.feature.properties.STATE_NAME}</div>
            <div>State Code: {hoverInfo.feature.properties.STATE_CODE}</div>
            <div>
              {dataset.path_2}: {hoverInfo.feature.properties[feature]}
            </div>
          </div>
        )}

        {popupInfo && (
          <Popup
            tipSize={10}
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick={true}
            onClose={setPopupInfo}
          >
            <PopupCharts info={popupInfo}></PopupCharts>
          </Popup>
        )}
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </MapGL>
      <div className={classes.control_panel}>
        <ControlPanel
          year={year}
          cfg={dataset}
          loading={loading}
          onChange={(value) => onUpdate(value)}
        />
      </div>
    </>
  );
}
export default Map;