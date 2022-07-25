import React, { Component } from 'react';
import Nav from './Nav1';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
// import '/App.css';
import Navbar from "./Navbar";
import "./Navbar.css";
// import Home from '../Home';
import Home from "../Home";
import WeatherCard from './Weather';
import ReactWeather from 'react-open-weather';


class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  }
  

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };
  
  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    const isLoggedIn = this.state.logged_in;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="welcome" style = {{display:'block'}}>
        
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
          
        />
        
        {form}
        <h4 class="text-4xl font-normal leading-normal mt-0 mb-2 text-pink-800 text-center">
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : '' }
           <br></br>
        The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.

        </h4>
        {this.state.logged_in
            ? <div class="static ...">
            {/* <Home></Home> */}
            <div class="absolute bottom-0 left-0 ...">
            </div>
          </div>
            
            : '' }
        <div>
      {isLoggedIn ? (
        <UserGreeting/>
      ) : (
        ''
      )}
    </div>

      </div>
    );
  }
}
function UserGreeting(props) {
    return (
        // <div class="w-1/2 mx-auto">
        <div>

        <div class="w-full shadow-2xl subpixel-antialiased rounded h-64 bg-black border-black mx-auto">
          <div class="flex items-center h-6 rounded-t bg-gray-100 border-b border-gray-500 text-center text-black" id="headerTerminal">
            <div class="flex ml-2 items-center text-center border-red-900 bg-red-500  hover:bg-red-400 shadow-inner rounded-full w-3 h-3" id="closebtn">
            </div>
            <div class="ml-2 border-yellow-900 bg-yellow-500 hover:bg-yellow-400 shadow-inner rounded-full w-3 h-3" id="minbtn">
            </div>
            <div class="ml-2 border-green-900 bg-green-500 hover:bg-green-400 shadow-inner rounded-full w-3 h-3" id="maxbtn">
            </div>
            <div class="mx-auto pr-16" id="terminaltitle">
              <p class="text-center text-sm">Terminal</p>
            </div>
      
          </div>
          <div class="pl-1 pt-1 h-auto  text-green-200 font-mono text-xs bg-black" id="console">
            <p class="pb-1">Last login: Wed Sep 25 09:11:04 on UCD SERVER</p>
            <p class="pb-1">$Dublin Bus APP IN PROGRESS$<input type="text" class="bg-black text-blue-600 focus:border-0 focus:outline-0 ml-1" autofocus/></p>
            <br></br>
            <p>SPOTIFY API HERE</p>
            
          </div>
        </div>
        <br></br>
        <WeatherCard/>
      </div>
      
    )
  }
export default Welcome;
