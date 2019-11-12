import React from 'react';
import './App.css';
import axios from 'axios';
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
    axios.post('/vote', {
      score: this.props.score,
      flavor: this.props.name,
      note: this.state.note
    }).then(response => {
      this.props.closeModal(null)
    });
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        {this.state.saveStatus === "sending" ? <Modal show={true}><h1>Sending...</h1></Modal> : null}
        <Modal.Header closeButton>
            <Modal.Title>Rate {this.props.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Give {this.props.name} a score of {this.props.score} out of 5?</h5>
            <div><input type="text" value={this.state.note} onChange={(e) => this.setState({note: e.target.value})} placeholder="Enter an optional note..." /></div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.closeModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={(e) => this.saveRating(e)}>
              Submit Rating
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
        <img src={this.props.data.img} className="coffeeImg" alt="ALTERNATIVE FAX" />
        <div class="coffeeName">{this.props.data.name}</div>
        <Rating name={this.props.data.name} />
      </div>
    );
  }
}


class CoffeesHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    // Load config from backend
    axios.get('/config').then(response => {
      console.log(response);
      this.setState({data: response.data})
    });
  }

  render() {
    if (!this.state.data) {
      return (<div>Loading...</div>)
    }

    let coffeeDivs = [];
    for (let i = 0; i < this.state.data.coffees.length; i++) {
      coffeeDivs.push(<Coffee data={this.state.data.coffees[i]} />)
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
