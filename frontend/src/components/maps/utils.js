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
    // const scale = scaleQuantile()
    //   .domain(features.map(accessor))
    //   .range(range(map_value.length));

    console.log(map_value, map_value["Victoria"]);
    return {
      type: "FeatureCollection",
      features: features.map((f) => {
        const value = accessor(f);
        var properties = {
          ...f.properties,
          value,
        };
        properties[feature] =
          Math.round(map_value[f.properties.STATE_NAME] * 100) / 100;
        return { ...f, properties };
      }),
    };
  }
}