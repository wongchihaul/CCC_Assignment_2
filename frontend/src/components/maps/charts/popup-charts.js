import PieChart from "./chart-1";
export function PopupCharts(props) {
  const { info } = props;
  const STATE_NAME = info.feature.properties.STATE_NAME;
  const STATE_CODE = info.feature.properties.STATE_CODE;

  return (
    <>
      <div style={{width:"30vw"}}>
        <p>{STATE_NAME}</p>
        <p>{STATE_CODE}</p>
        <PieChart style={{zIndex:1000}}></PieChart>
      </div>
    </>
  );
}
