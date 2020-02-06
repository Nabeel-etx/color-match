import React, { useState } from "react";
import useEffect from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Card from "./components/Card";
import GameOver from "./components/GameOver";
import Counter from "./components/counter";
import "./styles.css";

class App extends React.Component {
  state = {
    isFlipped: Array(16).fill(false),
    shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
    clickCount: 1,
    prevSelectedCard: -1,
    prevCardId: -1,
    colors: -1,
    secondsLeft: 60
  };

  timer = () => {
    setTimeout(() => {
      this.setState({ secondsLeft: this.state.secondsLeft - 1 });
    }, 1000);
    return this.state.secondsLeft;
  };

  colors = {
    0: "yellow",
    1: "lightgreen",
    2: "orange",
    3: "purple",
    4: "pink",
    5: "red",
    6: "brown",
    7: "deepskyblue"
  };

  static duplicateCard = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7].reduce(
      (preValue, current, index, array) => {
        return preValue.concat([current, current]);
      },
      []
    );
  };

  handleClick = event => {
    event.preventDefault();
    const cardId = event.target.id;
    const newFlipps = this.state.isFlipped.slice();
    this.setState({
      prevSelectedCard: this.state.shuffledCard[cardId],
      prevCardId: cardId,
      colors: cardId
    });
    if (this.state.colors !== -1) {
      if (this.state.colors === 0) return;
      if (this.state.colors === 1) return;
      if (this.state.colors === 2) return;
      if (this.state.colors === 3) return;
      if (this.state.colors === 4) return;
      if (this.state.colors === 5) return;
      if (this.state.colors === 6) return;
      if (this.state.colors === 7) return;
    }

    if (newFlipps[cardId] === false) {
      newFlipps[cardId] = !newFlipps[cardId];
      this.setState(prevState => ({
        isFlipped: newFlipps,
        clickCount: this.state.clickCount + 1
      }));

      if (this.state.clickCount === 2) {
        this.setState({ clickCount: 1 });
        const prevCardId = this.state.prevCardId;
        const newCard = this.state.shuffledCard[cardId];
        const previousCard = this.state.prevSelectedCard;

        this.isCardMatch(previousCard, newCard, prevCardId, cardId);
      }
    }
  };

  isCardMatch = (card1, card2, card1Id, card2Id) => {
    if (card1 === card2) {
      const hideCard = this.state.shuffledCard.slice();
      hideCard[card1Id] = -1;
      hideCard[card2Id] = -1;
      setTimeout(() => {
        this.setState(prevState => ({
          shuffledCard: hideCard
        }));
      }, 1000);
    } else {
      const flipBack = this.state.isFlipped.slice();
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      setTimeout(() => {
        this.setState(prevState => ({ isFlipped: flipBack }));
      }, 1000);
    }
  };

  restartGame = () => {
    this.setState({
      isFlipped: Array(16).fill(false),
      shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
      clickCount: 1,
      prevSelectedCard: -1,
      prevCardId: -1,
      colors: -1,
      secondsLeft: 60
    });
  };

  isGameOver = () => {
    return this.state.isFlipped.every(
      (element, index, array) => element !== false
    );
  };
  render() {
    return (
      <div className="background">
        <div className="main-header">
          <h1>Color-Match Game</h1>
        </div>
        {this.isGameOver() ? (
          <GameOver restartGame={this.restartGame} />
        ) : (
          <div className="grid-container">
            {this.state.shuffledCard.map((cardNumber, index) => (
              <Card
                key={index}
                id={index}
                cardNumber={cardNumber}
                isFlipped={this.state.isFlipped[index]}
                handleClick={this.handleClick}
                style={this.colors[cardNumber]}
              />
            ))}
          </div>
        )}
        <Header restartGame={this.restartGame} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
