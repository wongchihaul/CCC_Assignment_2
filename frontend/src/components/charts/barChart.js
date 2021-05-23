import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';

function DemoColumn(props){
  var config = {
    data: props.data,
    xField: props.xField,
    yField: props.yField,
    xAxis: { label: { autoRotate: true } },
    scrollbar: { type: 'horizontal' },
    color:props.color
  };
  return <Column {...config} />;
};

export default DemoColumn;