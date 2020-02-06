import React from "react";
import ReactCardFlip from "react-card-flip";

const Card = ({ id, isFlipped, handleClick, cardNumber, style }) => (
  <ReactCardFlip
    isFlipped={isFlipped}
    flipDirection="horizontal"
    flipSpeedBackToFront={0.0}
    flipSpeedFrontToBack={0.6}
  >
    <button
      id={id}
      className={`card card-front ${cardNumber !== -1 ? "" : "hide-card"}`}
      onClick={handleClick}
      key="front"
    />

    <button
      id={id}
      className={`card card-back ${cardNumber !== -1 ? "" : "hide-card"}`}
      onClick={handleClick}
      key="back"
      style={{ backgroundColor: style }}
    />
  </ReactCardFlip>
);

export default Card;
