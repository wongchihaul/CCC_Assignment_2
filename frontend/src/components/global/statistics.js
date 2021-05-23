import StatisticsTweetsNum from "../statistics-charts/statistics-tweets-num";
import StatisticsTweetsSuburbs from "../statistics-charts/statistics-tweets-suburbs";
import {
    Container,
  } from "@material-ui/core";
function Statistics() {
  return (
    <>
      <Container maxWidth="md">
        <StatisticsTweetsNum></StatisticsTweetsNum>
        <StatisticsTweetsSuburbs></StatisticsTweetsSuburbs>
      </Container>
    </>
  );
}

export default Statistics;
