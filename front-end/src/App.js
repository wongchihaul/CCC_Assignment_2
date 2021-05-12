import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "components/global/header"; // relative path config
import Home from "components/global/home";
import Map from "components/global/map";

function App() {
  return (
    <div className="App">
      <div>
        <Header />
      </div>{" "}
      <Router>
        <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/map">
            <Map />
          </Route>
        </Switch>
        </div>{" "}
      </Router>{" "}
    </div>
  );
}

export default App;
