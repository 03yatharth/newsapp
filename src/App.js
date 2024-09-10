import "./App.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";

export default function App() {
  const [progr, setProgr] = useState(0);
  let setProgress = (prog) => {
    setProgr(prog);
  };

  return (
    <>
      <Navbar />
      <div>
        <LoadingBar color="red" progress={progr} onLoaderFinished={() => 0} />
      </div>

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <News setProgress={setProgress} category="" />
              </div>
            }
          />
          <Route
            path="/sports"
            element={
              <div className="container">
                <News setProgress={setProgress} category="sports" />
              </div>
            }
          />
          <Route
            path="/entertainment"
            element={
              <div className="container">
                <News setProgress={setProgress} category="entertainment" />
              </div>
            }
          />
          <Route
            path="/general"
            element={
              <div className="container">
                <News setProgress={setProgress} category="general" />
              </div>
            }
          />
          <Route
            path="/health"
            element={
              <div className="container">
                <News setProgress={setProgress} category="health" />
              </div>
            }
          />
          <Route
            path="/business"
            element={
              <div className="container">
                <News setProgress={setProgress} category="business" />
              </div>
            }
          />
          <Route
            path="/science"
            element={
              <div className="container">
                <News setProgress={setProgress} category="science" />
              </div>
            }
          />
          <Route
            path="/technology"
            element={
              <div className="container">
                <News setProgress={setProgress} category="technology" />
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
