export function PopupCharts(props) {
  const { info } = props;
  const STATE_NAME = info.feature.properties.STATE_NAME;
  const STATE_CODE = info.feature.properties.STATE_CODE;
  return (
    <>
      <p>{STATE_NAME}</p>
      <p>{STATE_CODE}</p>
    </>
  );
}
