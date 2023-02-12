import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {  ThreeDots } from "react-loader-spinner";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [view, setView] = useState([]);
  const [search, setSearch] = useState("");

  const userList = async () => {
    try {
      setLoader(true);
      const data = await axios.get("https://dummyjson.com/users");

      //   console.log(data);
      //   console.log(data.data);

      setView(data.data.users);
      setLoader(false);

      //   console.log(view);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    userList();

    // console.log(search);
  }, []);

  const handleLogout = () => {
    // console.log('Logout button')
    localStorage.removeItem("userInfo");
    window.alert("Logged out Successfully!");
    navigate("/");
  };

  return (
    <div>
      <>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand>
              <strong>Frejun Task</strong>{" "}
            </Navbar.Brand>

            <Button variant="outline-secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Container>
        </Navbar>
      </>

      <div className="search mt-5 mb-4">
        <Form>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={{ width: "300px", margin: " auto" }}
          >
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
      </div>

      {loader ? (
        <ThreeDots
          height="80"
          width="80"
          color="#000000"
          ariaLabel="circles-loading"
          wrapperStyle={{
            position: "absolute",
            top: "50%",
            right: "50%",
            transform: "translate(-50%, -50%)",
          }}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            width: 800,
            height: 370,
            margin: "auto",
          }}
        >
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
            <TableHead
              sx={{
                "& th": {
                  // color: "rgba(96, 96, 96)",
                  backgroundColor: "#f8f9fa",
                },
              }}
            >
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Age</TableCell>
                <TableCell align="left">Gender</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {view
                .filter((ele) => {
                  if (search == "") {
                    return ele;
                  } else if (
                    ele.firstName.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return ele;
                  } else if (
                    ele.lastName.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return ele;
                  } else if (
                    ele.email.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return ele;
                  }
                })
                .map((ele) => {
                  return (
                    <TableRow
                      key={ele.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ paddingLeft: 0 }}
                      >
                        {/* <img src = {ele.image} /> */}
                        <Stack direction="row" spacing={2}>
                          <Avatar
                            alt={ele.firstName}
                            src={ele.image}
                            sx={{ width: 56, height: 30 }}
                          />

                          <Typography sx={{ fontWeight: "bold" }}>
                            {" "}
                            {ele.firstName + " " + ele.lastName}{" "}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left" sx={{ color: "blue" }}>
                        {ele.email}
                      </TableCell>
                      <TableCell align="left">{ele.age}</TableCell>
                      <TableCell align="left">
                        {ele.gender[0].toUpperCase() + ele.gender.substring(1)}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Dashboard;
