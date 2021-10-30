import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, Typography } from "@mui/material";
import userApi from "../api/userApi";
import Paginate from "./Paginate";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

function ListUser() {
  const [list, setList] = useState();

  const { search } = useLocation();

  const query = queryString.parse(search);

  const rows = () => {
    const users = [];
    list?.data.forEach((user) => {
      users.push(user);
    });
    return users;
  };

  useEffect(() => {
    const getListUser = async () => {
      try {
        const params = { _page: query._page || 1, _limit: query._limit || 5 };
        const listUser = await userApi.listUser(params);
        setList(listUser);
      } catch (error) {}
    };

    getListUser();
  }, [query._page, query._limit]);

  return (
    <Container>
      <Button variant="outlined" component={Link} to="/">
        ADD USERS
      </Button>
      <Typography
        variant="h3"
        color="secondary"
        style={{
          textAlign: "center",
          fontSize: "34px",
          fontWeight: 600,
          marginBottom: "12px",
        }}
      >
        LIST USER
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows().map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  <Link to="/map">{row.address}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paginate pagination={list?.pagination} />
    </Container>
  );
}

export default ListUser;
