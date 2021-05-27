import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import Popup from './Popup';

export default class RecruiterProfile extends Component {

    constructor(props) {
        super(props);
        this.state = { profile: [], modal_edit_show: false };
        this.modal_hide=this.modal_hide.bind(this);
    }


    componentDidMount() {
        let token = localStorage.getItem('token');
        console.log(token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }

        axios.get('http://localhost:4000/api/rprofile', { headers: headers })
            .then(response => {
                //  console.log("hey");
                console.log(response.data)
                this.setState({ profile: response.data });
            })
            .catch(function (error) {
                // if(error.response.data.message)
                // alert(error.response.data.message);
                console.log(error);
            })
    }

    deleteDetail(id) {
        let token = localStorage.getItem('token');
        console.log(token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }
        axios.post('http://localhost:4000/api/details/delete/', { 'id': id }, { headers: headers })
            .then(response => {
                window.location.reload();
                console.log(response.data);
            });

        window.location.reload();
    }

    modal_hide()
    {
        console.log("AMIN ki mkc");
        // console.log(this.state.modal_edit_)
        this.setState({ modal_edit_show: false });
    }

    render() {
        let user = localStorage.getItem('user_name');
        let username = ""
        if (this.state.profile.flag == 1)
            username = ""
        else
            username = this.state.profile.username

        return (
            <div>
                <h2>{user}'s Profile:</h2>
                <br></br>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Detail Type</th>
                            <th>Value</th>
                            <th>Edit</th>
                            <th>Delete</th>
           
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td>{"1."}</td>
                            <td>{"Username"}</td>
                            <td>{username}</td>

                            <td> <Button variant="warning" onClick={() => { this.setState({ modal_edit_show: true }) }}>Edit</Button></td>
                            <Popup
                                onHide={this.modal_hide}
                                show={this.state.modal_edit_show}
                                // update={() => this.getCoin_info()}
                                // curr_quan={this.state.curr_quan}
                                curr_id="1"
                            ></Popup>
                            <td> <Button variant="danger" onClick={() => { this.deleteDetail(1) }}>Delete</Button></td>
                        </tr>

                        <tr>
                            <td>{"2."}</td>
                            <td>{"Email"}</td>
                            <td>{this.state.profile.email}</td>
                            <td> <Button variant="warning" onClick={() => { this.setState({ modal_edit_show: true }) }}>Edit</Button></td>
                            <Popup
                                onHide={this.modal_hide}
                                show={this.state.modal_edit_show}
                                // update={() => this.getCoin_info()}
                                // curr_quan={this.state.curr_quan}
                                curr_id="1"
                            ></Popup>
                            <td> <Button variant="danger" onClick={() => { this.deleteDetail(1) }}>Delete</Button></td>

                        </tr>

                        <tr>
                            <td>{"3."}</td>
                            <td>{"Address"}</td>
                            <td>{this.state.profile.address}</td>
                            <td> <Button variant="warning" onClick={() => { this.setState({ modal_edit_show: true }) }}>Edit</Button></td>
                            <Popup
                                onHide={this.modal_hide}
                                show={this.state.modal_edit_show}
                                // update={() => this.getCoin_info()}
                                // curr_quan={this.state.curr_quan}
                                curr_id="1"
                            ></Popup>
                            <td> <Button variant="danger" onClick={() => { this.deleteDetail(1) }}>Delete</Button></td>

                        </tr>

                    </tbody>
                </table>
            </div>
        )
    }
}