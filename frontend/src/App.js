import React from 'react';
import './App.css';


class Rating extends React.Component {
  render() {
    return (
      <div className="rating">
        <button class="btn"><i class="fa fa-home"></i></button>
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
