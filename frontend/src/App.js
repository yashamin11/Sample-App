import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Button} from "react-router-dom";

import Navbar from "./components/navbar.component"
import RecruiterNavbar from "./components/Navbar"
import Register from "./components/register.component";
import Login from "./components/login.component";
import Front from "./components/front.component";
import RecruiterProfile from "./components/Profile";


class App extends React.Component {
  render() {

    let user_type = localStorage.getItem('user_id');  
    console.log("10");
    console.log(user_type);
    let navbar = null;
    if(user_type)
      navbar = <RecruiterNavbar />;
    else
      navbar = <Navbar />;

    
    return (
      <Router>
   <div>
   {navbar}
        <div className="container">
         

          <br></br>
          <Route exact path="/" render={()=> {
            if(user_type === "R") 
            {
              return <RecruiterProfile/>
            }
            else return <Front/>
          }}  />
          <Route path="/front" component={Front} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/recruiterprofile" component={RecruiterProfile} />
        </div>
      
</div>
      </Router>
    
    );

  }
}

export default App;
