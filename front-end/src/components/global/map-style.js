// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
    id: 'data',
    type: 'fill',
    paint: {
      'fill-color': {
        property: 'percentile',
        stops: [
          [0, '#ffffcc'],
          [1, '#ffeda0'],
          [2, '#fed976'],
          [3, '#feb24c'],
          [4, '#fd8d3c'],
          [5, '#fc4e2a'],
          [6, '#e31a1c'],
          [7, '#bd0026'],
          [8, '#800026']
        ]
      },
      'fill-opacity': 0.8
    }
  };