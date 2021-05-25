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

var SA4_MAP = require("./SA4_MAP.json");

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
    opacity: 0.8,
  },
}));

const ini_fill_layer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": {
      property: "sentiment_score",
      stops: [
        [0, "#ffffcc"],
        [0.1, "#ffeda0"],
        [0.2, "#fed976"],
        [0.3, "#feb24c"],
        [0.4, "#fd8d3c"],
        [0.5, "#fc4e2a"],
        [0.6, "#e31a1c"],
        [0.7, "#bd0026"],
      ],
    },
    "fill-opacity": 0.8,
  },
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
    zoom: 4,
    bearing: 0,
    pitch: 0,
  });
  const [year, setYear] = useState(2020);
  const [dataset, setDataSet] = useState(ini_dataset);
  const [allData, setAllData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [fillLayer, setFillLayer] = useState(ini_fill_layer);
  const [MAP_TYPE, setMAP_TYPE] = useState("SA4");
  const [loading, setLoading] = useState(false);
  const [map_data, setMap_data] = useState(null);

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
          console.log(json);
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
    console.log(dataset);
    const { path_1, scenario, path_2 } = dataset;
    console.log(dataset);
    console.log(
      `http://127.0.0.1:3001/${path_1}/${path_2}/info?scenario=${scenario}`
    );
    setLoading(true);
    fetch(`http://127.0.0.1:3001/${path_1}/${path_2}/info?scenario=${scenario}`)
      .then((response) => response.json())
      .then((json) => {
        let new_data = {};
        for (let item of json.rows) {
          if (item.key[1] == year) {
            new_data[item.key[0]] = Math.round(item.value * 100) / 100;
          }
        }
        console.log(new_data);
        setMap_data(new_data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("fetch data failed", error);
      });
  }, [dataset]);

  const data = useMemo(() => {
    console.log("using memo");
    console.log(allData);
    return (
      allData &&
      updateSentimentScoreByState(
        allData,
        map_data,
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
          <Layer {...ini_fill_layer} />
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
              {dataset.path_2}: {hoverInfo.feature.properties.sentiment_score}
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
              {dataset.path_2}: {hoverInfo.feature.properties.sentiment_score}
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
