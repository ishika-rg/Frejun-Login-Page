import React from "react";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router";

import Form from "react-bootstrap/Form";

const Login = () => {
  const navigate = useNavigate();

  const main = {
    username: "admin@frejun",
    password: "12345678",
  };
  localStorage.setItem("userInfo", JSON.stringify(main));

  const user = localStorage.getItem("userInfo");
  //   console.log(user);

  const [inp, setInp] = useState({
    name: "",
    password: "",
  });

  const getData = (e) => {
    const { value, name } = e.target;
    // console.log(value, name)

    setInp(() => {
      return {
        ...inp,
        [name]: value,
      };
    });

    // console.log(inp)
  };

  const handleData = (e) => {
    e.preventDefault();

    const { name, password } = inp;
    if (name === "") {
      alert("Please enter username!");
    } else if (password === "") {
      alert("Please enter password!");
    } else if (password.length < 6) {
      alert("Password must be of atleast 6 characters!");
    } else {
      //   console.log("Password added successfully!");

      if (user && user.length) {
        const a = JSON.parse(user);
        // console.log(a);

        if (a.username === name && a.password === password) {
          //   console.log("user matched");
          alert("User Logged In Successfully!");
          navigate("/dashboard");
        } else {
          //   console.log("user not matched!!!!");
          alert("Invalid Credentials !!! Please try again");
        }
      }
    }
  };

  return (
    <div className="login_page">
      <div className="head">
        <h2>Log in</h2>
      </div>

      {
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              onChange={getData}
              name="name"
              placeholder="Enter your username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={getData}
              name="password"
              placeholder="Password"
            />
          </Form.Group>

          <button className="submit_btn" onClick={handleData} type="submit">
            Login
          </button>
        </Form>
      }
    </div>
  );
};

export default Login;
