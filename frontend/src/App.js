import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "components/global/header"; // relative path config
import Home from "components/global/home";
import Map from "components/maps/map";
import Statistics from "components/global/statistics";
import Monitoring from "components/global/monitoring";

function App() {
  return (
    <div className="App">
      <div className="m-header">
        <Header />
      </div>{" "}
      <Router>
        <div className="content">
        <Switch>
          <Route exact path="/" className="home">
            <Home />
          </Route>
          <Route exact path="/map">
            <Map />
          </Route>
          <Route exact path="/statistics">
            <Statistics />
          </Route>
          <Route exact path="/monitoring">
            <Monitoring />
          </Route>
        </Switch>
        </div>{" "}
      </Router>{" "}
    </div>
  );
}

export default App;
