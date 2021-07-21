import React, {useState, useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const { user, updateUser } = useState(null);

  

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
