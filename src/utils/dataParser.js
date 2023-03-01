import React from "react";
import { formatDate, timeAgo } from "../utils";
// set up onclick on the arrow button in the table component. create function that makes a call to that specific endpoint, rather than hitting all of the endpoints at once. Ran into a API rate limiter, so be careful not to send an infinite loop.

const dataParser = (data) => {
  let repos = [];

  data.forEach((item, index) => {
    let repo = {};
    repo.hash = item.id;
    repo.name = item.name;
    repo.language = item.language;
    repo.description = item.description ? item.description : "n/a";
    repo.stars = item.stargazers_count;
    repo.forks = item.forks_count;
    repo.created = formatDate(item.created_at);
    repo.updated = formatDate(item.updated_at);
    repo.commitsURL = `https://api.github.com/repos/Netflix/${repo.name}/commits`;
    repos.push(repo);
  });
  return repos;
};

export default dataParser;
