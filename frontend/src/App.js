import React, { useState } from 'react';
import './App.css';

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Modal, Button } from "react-bootstrap";


class RatingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {note: "", sending: "notsent"};
  }

  saveRating(e) {
    // Send rating to backend with note and score.
    console.log("Saving rating of " + this.props.score + " for coffee " + this.props.name + " with note " + this.state.note + ".");
    this.setState({saveStatus: "sending"})
    setTimeout(() => {this.props.closeModal(null)}, 1000);
  }

  render() {
    console.log(this.state)
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        {this.state.saveStatus == "sending" ? <Modal show={true}><h1>Sending...</h1></Modal> : null}
        <Modal.Header closeButton>
            <Modal.Title>Rate {this.props.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Give {this.props.name} a score of {this.props.score} out of 5?</h5>
            <div><input type="text" value={this.state.note} onChange={(e) => this.setState({note: e.target.value})} placeholder="Enter an optional note..." /></div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => this.saveRating(e)}>
              Save Changes
            </Button>
          </Modal.Footer>
      </Modal>
    )
  }
}


class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {score: 3, showModal: false};
  }

  mouseOver(e) {
    let newScore = parseInt(e.target.id);
    if (isNaN(newScore)) {
      return null;
    }
    this.setState({score: newScore})
  }

  changeModal(e, showState) {
    this.setState({showModal: showState})
  }

  render() {
    return (
      <div>
        <div className="rating" onClick={(e) => this.changeModal(e, true)}  onMouseOver={(e) => this.mouseOver(e)}>
          <FontAwesomeIcon icon={faStar} id="1" style={{color: this.state.score >= 1 ? "black" : "gray"}} />
          <FontAwesomeIcon icon={faStar} id="2" style={{color: this.state.score >= 2 ? "black" : "gray"}} />
          <FontAwesomeIcon icon={faStar} id="3" style={{color: this.state.score >= 3 ? "black" : "gray"}} />
          <FontAwesomeIcon icon={faStar} id="4" style={{color: this.state.score >= 4 ? "black" : "gray"}} />
          <FontAwesomeIcon icon={faStar} id="5" style={{color: this.state.score >= 5 ? "black" : "gray"}} />
        </div>
        <RatingModal name={this.props.name} score={this.state.score} showModal={this.state.showModal} closeModal={(e) => this.changeModal(e, false)} />
      </div>
    )
  }
}


class Coffee extends React.Component {
  render() {
    return (
      <div class="coffee">
        <img src={this.props.img} className="coffeeImg" />
        <div class="coffeeName">{this.props.name}</div>
        <Rating name={this.props.name} />
      </div>
    );
  }
}


class CoffeesHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flavors: null };
  }

  componentDidMount() {
    // Load coffee flavors from backend
    this.setState({flavors: [
      {name: "one", img: "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"},
      {name: "two", img: "https://specials-images.forbesimg.com/imageserve/1152308114/960x0.jpg?fit=scale"},
      {name: "three", img: "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F1072007868%2F960x0.jpg%3Ffit%3Dscale"}
    ]})
  }

  render() {
    if (!this.state.flavors) {
      return (<div>Loading...</div>)
    }

    let coffeeDivs = [];
    for (let i = 0; i < this.state.flavors.length; i++) {
      coffeeDivs.push(<Coffee name={this.state.flavors[i].name} img={this.state.flavors[i].img} />)
    }

    return (<div className="coffees">{coffeeDivs}</div>)
  }

}


function App() {
  return (
    <div className="App">
      <CoffeesHolder />
    </div>
  );
}

export default App;
