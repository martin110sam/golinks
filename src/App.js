import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import CircularProgress from "@mui/material/CircularProgress";
import { dataParser } from "./utils";
import { DataTable } from "./components";

const App = () => {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/orgs/Netflix/repos")
      .then((res) => res.json())
      .then((res) => {
        setRepos(dataParser(res));
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <div className="app">
        <div className="content">
          <div className="header">
            <div className="title ">NETFLIX REPOSITORY VIEWER</div>
          </div>
          <div className="table-container">
            <div className="table">
              {isLoading ? <CircularProgress /> : <DataTable repos={repos} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default hot(App);
