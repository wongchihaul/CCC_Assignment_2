import StatisticsTweetsNum from "../statistics-charts/statistics-tweets-num";
import {
    Container,
  } from "@material-ui/core";
function Statistics() {
  return (
    <>
      <Container maxWidth="md">
        <StatisticsTweetsNum></StatisticsTweetsNum>
      </Container>
    </>
  );
}

export default Statistics;
