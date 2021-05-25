import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';

function DemoColumn() {
  var data = [
    {
        name: 'sentiment_score',
        state: "Queensland",
        value: 0.45,
      },
    {
      name: 'sentiment_score',
      state: "New South Wales",
      value: 0.4425,
    },
    {
        name: 'sentiment_score',
        state: "Western Australia",
        value: 0.405,
      },
    
    {
      name: 'sentiment_score',
      state: "Victoria",
      value: 0.28,
    },
    


    {
      name: 'employment_rate',
      state: "New South Wales",
      value: 0.732,
    },
    {
      name: 'employment_rate',
      state: "Queensland",
      value: 0.716,
    },
    {
      name: 'employment_rate',
      state: "Victoria",
      value: 0.711,
    },
    {
      name: 'employment_rate',
      state: "Western Australia",
      value: 0.719,
    },
    
  ];
  var config = {
    data: data,
    isGroup: true,
    xField: 'state',
    yField: 'value',
    seriesField: 'name',
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
  };
  return <Column {...config} />;
};

export default DemoColumn;