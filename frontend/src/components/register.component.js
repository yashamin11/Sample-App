import React, {Component} from 'react';
import axios from 'axios';
export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password:'',
            email: '',
            confirm_password : '',
            address : ''
        }
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeconfirmPassword = this.onChangeconfirmPassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeaddress = this.onChangeaddress.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }
    onChangeemail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeaddress(event) {
        this.setState({ address: event.target.value });
    }

    onChangeconfirmPassword(event) {
        this.setState({ confirm_password: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password:  this.state.password,
            email: this.state.email,
            address: this.state.address,
            confirm_password: this.state.confirm_password
        }
        console.log(newUser);
        axios.post('http://localhost:4000/api/users/add', newUser)
             .then(res => 
            {
                let noice = "Happy to have you on board, "+ res.data.username +"!";
                alert(noice);
                console.log(res.data)
            })
             .catch(err => {
                if(err.response.data.message)
                alert(err.response.data.message);
                console.log(err)});

        this.setState({
            username: '',
            password: '',
            confirm_password:'',
            address: '',
            email:''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeemail}
                               />
                    </div>

                    <div className="form-group">
                        <label>Address: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.address}
                               onChange={this.onChangeaddress}
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>   
                    <div className="form-group">
                        <label>Confirm Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.confirm_password}
                               onChange={this.onChangeconfirmPassword}
                               />  
                    </div>   

                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}