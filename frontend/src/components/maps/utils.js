import { range } from "d3-array";
import { scaleQuantile } from "d3-scale";

export function updatePercentiles(featureCollection, accessor) {
  const { features } = featureCollection;
  const scale = scaleQuantile().domain(features.map(accessor)).range(range(9));
  return {
    type: "FeatureCollection",
    features: features.map((f) => {
      const value = accessor(f);
      const properties = {
        ...f.properties,
        value,
        percentile: scale(value),
      };
      return { ...f, properties };
    }),
  };
}

export function updateSentimentScoreByState(
  featureCollection,
  city,
  map_type,
  map_value,
  feature,
  accessor
) {
  const { features } = featureCollection;
  if (map_value == null) {
    const scale = scaleQuantile()
      .domain(features.map(accessor))
      .range(range(9));
    return {
      type: "FeatureCollection",
      features: features.map((f) => {
        const value = accessor(f);
        const properties = {
          ...f.properties,
          value,
          percentile: scale(value),
        };
        return { ...f, properties };
      }),
    };
  } else {
    console.log("working");
    console.log(map_value);
    return {
      type: "FeatureCollection",
      features: features.map((f) => {
        const value = accessor(f);
        var properties = {
          ...f.properties,
          value,
        };

        if (map_type == "SA4") {
          if (feature === "labour_summary") {
            properties[feature] =
              Math.round(map_value[f.properties.SA4_NAME] * 100) / 100;
          } else {
            properties[feature] =
              Math.round(map_value[f.properties.STATE_NAME] * 100) / 100;
          }
        } else {
          // if (city=="Melbourne"){
          //    let suburb_name = f.properties.NAME.toLowerCase();
          // properties[feature] = Math.round(map_value[suburb_name] * 100) / 100;
          // }else{
          const name_map = {
            Sydney: "NSW_LOCA_2",
            Brisbane: "QLD_LOCA_2",
            Perth: "WA_LOCAL_2",
            Melbourne: "NAME",
          };
          let suburb_name = f.properties[name_map[city]];
          suburb_name = suburb_name.toLowerCase();
          properties[feature] = Math.round(map_value[suburb_name] * 100) / 100;
          // }
        }
        // console.log(properties);

        return { ...f, properties };
      }),
    };
  }
}
