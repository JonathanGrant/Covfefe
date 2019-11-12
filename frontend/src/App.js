import React from 'react';
import './App.css';

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {score: 3};
  }

  mouseOver(e) {
    let newScore = parseInt(e.target.id);
    if (isNaN(newScore)) {
      return null;
    }
    this.setState({score: newScore})
  }

  render() {
    return (
      <div className="rating" onMouseOver={(e) => this.mouseOver(e)}>
        <FontAwesomeIcon icon={faStar} id="1" style={{color: this.state.score >= 1 ? "black" : "gray"}} />
        <FontAwesomeIcon icon={faStar} id="2" style={{color: this.state.score >= 2 ? "black" : "gray"}} />
        <FontAwesomeIcon icon={faStar} id="3" style={{color: this.state.score >= 3 ? "black" : "gray"}} />
        <FontAwesomeIcon icon={faStar} id="4" style={{color: this.state.score >= 4 ? "black" : "gray"}} />
        <FontAwesomeIcon icon={faStar} id="5" style={{color: this.state.score >= 5 ? "black" : "gray"}} />
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
        <Rating />
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
