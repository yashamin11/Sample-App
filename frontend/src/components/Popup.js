import React, { Component } from "react";
// import { connect } from "react-redux";
import axios from "axios";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangebudget = this.onChangebudget.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.onHide();
  }
  onChangebudget(event) {
    this.setState({ budget: event.target.value });
  }
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Update detail: </label>
              <input
                type="text"
                min='0'
                max="150"
                className="form-control"
                value={this.state.budget}
                onChange={this.onChangebudget}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide} variant="danger">
            Go Back
          </Button>
          <Button onClick={this.onSubmit} variant="success">
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}