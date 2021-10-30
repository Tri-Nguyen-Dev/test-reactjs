import Form from "./components/Form";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListUser from "./components/ListUser";
import GoogleMap from "./components/GoogleMap";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Form />
          </Route>
          <Route path="/list-user">
            <ListUser />
          </Route>
          <Route path="/map">
            <GoogleMap />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
