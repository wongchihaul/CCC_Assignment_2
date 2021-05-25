import { range } from "d3-array";
import { scaleQuantile } from "d3-scale";

export function updatePercentiles(featureCollection, accessor, length) {
  const { features } = featureCollection;
  const scale = scaleQuantile().domain(features.map(accessor)).range(range(9));
  console.log(scale)
  return {
    type: "FeatureCollection",
    features: features.map((f) => {
      const value = accessor(f);
      console.log("per")
      console.log(scale(value))
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
  type,
  featureCollection,
  map_value,
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
        if(type==="sentiment_score"){
          const properties = {
            ...f.properties,
            value,
            sentiment_score:
              Math.round(map_value[f.properties.STATE_NAME] * 100) / 100,
          };
          return { ...f, properties };
        }else if(type==="labour_summary"){
          const properties = {
            ...f.properties,
            value,
            labour_summary: Math.round(map_value[f.properties.SA4_NAME] * 100) / 100,
          };
          return { ...f, properties };
        }
        
        
      }),
    };
  }
}
