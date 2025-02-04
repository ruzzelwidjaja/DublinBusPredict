import React, { Component } from "react";
import Nav1 from "./Nav1";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
// import '/App.css';
import Navbar from "./Navbar";
import "./Navbar.css";
// import Home from '../Home';
import Home from "../Home";
import WeatherCard from "./Weather";
import ReactWeather from "react-open-weather";
import Todo from "./welcome1";
import { TwitterTweetEmbed, TwitterTimelineEmbed } from "react-twitter-embed";
import { Routes, Route } from "react-router-dom";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: "",
      logged_in: localStorage.getItem("token") ? true : false,
      username: "Undefined",
      // favorites: '',
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      //fetch(""
      fetch("http://localhost:8000/core/current_user/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    //fetch(""
    fetch("http://localhost:8000/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        localStorage.setItem("token", json.token);
        this.setState({
          logged_in: true,
          displayed_form: "",
          username: json.user.username,
          // favorites: json.user.favorites
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem("token");
    this.setState({ logged_in: false, username: "" });
    <Route path='/' element={<Home/>} />
    
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/core/users/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        localStorage.setItem("token", json.token);
        this.setState({
          logged_in: true,
          displayed_form: "",
          username: json.username,
          // favorites : json.favorites
        });
      });
  };

  display_form = (form) => {
    this.setState({
      displayed_form: form,
    });
  };

  render() {
    let form;
    const isLoggedIn = this.state.logged_in;
    console.log(this.state.logged_in)
    switch (this.state.displayed_form) {
      case "login":
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case "signup":
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      case 'off':
        form = null;
        break;
        default:
        form = <SignupForm handle_signup={this.handle_signup} />;
    }

   if (isLoggedIn == true) {
        form = null;
    }


    // const getName = (email) => {

    //   if (typeof email === "undefined" || email === null) {
    //     email = 'true'
    // }
    //   else{
    //   let username = email.split('@')[0]
    //   let domain = email.split('@')[1]

    //   return username;
    //   }
    //   // s = name
    //   // index = s.index("@")

    //   // s_id = s[:index]


    //   // return s_id;
     
      
    // };

    return (
      <div className="welcome" style={{ display: "block" }}>
        <Nav1
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />

        {form}
        <h1 className="text-3xl md:text-7xl font-normal leading-normal mt-0 mb-2 text-pink-800 text-center ">
        {this.state.logged_in
            ? `Hello, ${this.state.username},`
            : '' }
          <br></br>
        </h1>

        <h3 className="text-2xl md:text-4xl mb-10 font-normal leading-normal mt-0 mb-2 text-pink-800 text-center">
          {this.state.logged_in ? "Have a great journey!" : ""}
        </h3>

        {this.state.logged_in ? (
          <div className="static ...">
            <div className="absolute bottom-0 left-0 ..."></div>
          </div>
        ) : (
          ""
        )}
        <div>{isLoggedIn ? <UserGreeting /> : ""}</div>
      </div>
    );
  }
}
function UserGreeting(props) {
  return (
    <div className="md:flex">
      <div className="flex-1">
        <Todo />
      </div>
      <div className="flex-1 p-6 px-8">
        <h1 className="text-3xl font-bold content-center text-center pb-5">
          Twitter feed - Dublin Bus
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TwitterTimelineEmbed
            sourceType="profile"
            // The preferred screen name goes next:
            screenName="dublinbusnews"
            // Style options goes here:
            options={{ height: 800, width: 800 }}
          />
        </div>
      </div>
    </div>
  );
}
export default Welcome;
