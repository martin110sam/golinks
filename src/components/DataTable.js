import React, { useState, useEffect } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatDate } from "../utils";

function fetchCommits(url) {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

function Row({ row }) {
  const [open, setOpen] = useState(false);
  const [rowCommits, setRowCommits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpen = () => {
    open
      ? setOpen(!open)
      : fetchCommits(row.commitsURL).then((data) => {
          let commits = [];
          data.forEach((item) => {
            let commit = {};
            commit.hash = item.sha;
            commit.title = item.commit.message;
            commit.username = item.commit.author.login || item.commit.author.name;
            commit.date = formatDate(item.commit.author.date);
            commits.push(commit);
          });
          setRowCommits(commits);
          setIsLoading(false);
          setOpen(!open);
          console.log(commits);
        });
  };

  return (
    <>
      <TableRow key={row.hash}>
        <TableCell padding="checkbox">
          <IconButton aria-label="expand row" size="small" onClick={handleOpen}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className="text" align="left">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.language}</TableCell>
        <TableCell align="left">{row.description}</TableCell>
        <TableCell align="left">{row.stars}</TableCell>
        <TableCell align="left">{row.forks}</TableCell>
        <TableCell align="left">{row.created}</TableCell>
        <TableCell align="left">{row.updated}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {isLoading ? (
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Loading Commits...
                </Typography>
              </Box>
            ) : (
              <Box sx={{ margin: 4 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Commits List
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }} align="left">
                        Title
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="left">
                        Username
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="left">
                        Hash
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="left">
                        Date Created
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowCommits.map((commit) => (
                      <TableRow key={commit.hash}>
                        <TableCell align="left">{commit.title}</TableCell>
                        <TableCell align="left">{commit.username}</TableCell>
                        <TableCell align="left">{commit.hash}</TableCell>
                        <TableCell align="left">{commit.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const DataTable = ({ repos }) => {
  return (
    <TableContainer className="table-bg">
      <Table aria-label="collapsible table" size="medium">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Repo Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Language
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Description
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Stars
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Forks
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Date Created
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", width: 300 }} align="left">
              Last Updated
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repos.map((repo) => (
            <Row key={repo.hash} row={repo} size="small" />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
