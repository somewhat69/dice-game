"use strict";
const Player0Main = document.querySelector(".player--0");
const Player1Main = document.querySelector(".player--1");
const Player0ScoreElement = document.getElementById("score--0");
const Player1ScoreElement = document.getElementById("score--1");
const Player0ScoreHaving = document.getElementById("current--0");
const Player1ScoreHaving = document.getElementById("current--1");
const RollButton = document.querySelector(".btn--roll");
const NewButton = document.querySelector(".btn--new");
const HoldButton = document.querySelector(".btn--hold");
const DiceImage = document.querySelector(".dice");
const winMoment = document.querySelector(".idk");
const tempScoreBoxes = document.querySelectorAll(".current");
Player0ScoreElement.textContent = 0;
Player1ScoreElement.textContent = 0;
DiceImage.classList.add("hidden");
let ScoreToBeAdded = 0;
let ActivePlayer = 0;
let scoresForPlayers = [0, 0];
let PlayingBeingContinued = true;

function initial() {
  winMoment.classList.add("hidden");
  Player0Main.classList.remove("player--winner");
  Player0Main.classList.add("player--active");
  Player1Main.classList.remove("player--winner");
  Player0ScoreHaving.textContent = 0;
  Player1ScoreHaving.textContent = 0;
  Player0ScoreElement.textContent = 0;
  Player1ScoreElement.textContent = 0;
  DiceImage.classList.remove("hidden");
  HoldButton.classList.remove("hidden");
  RollButton.classList.remove("hidden");
  tempScoreBoxes[0].classList.remove("hidden");
  tempScoreBoxes[1].classList.remove("hidden");
  ScoreToBeAdded = 0;
  ActivePlayer = 0;
  scoresForPlayers = [0, 0];
  PlayingBeingContinued = true;
}

function changingPlayersandResettingScores() {
  ScoreToBeAdded = 0;
  document.getElementById(`current--${ActivePlayer}`).textContent = 0;
  Player1Main.classList.toggle("player--active");
  Player0Main.classList.toggle("player--active");
  ActivePlayer = ActivePlayer === 0 ? 1 : 0;
}

RollButton.addEventListener("click", function () {
  if (PlayingBeingContinued) {
    let diceNo = Math.trunc(Math.random() * 6) + 1;
    DiceImage.classList.remove("hidden");
    DiceImage.src = `dice-${diceNo}.png`;
    if (diceNo !== 1) {
      ScoreToBeAdded += diceNo;
      console.log(ScoreToBeAdded);
      document.getElementById(`current--${ActivePlayer}`).textContent =
        ScoreToBeAdded;
    } else {
      changingPlayersandResettingScores();
    }
  }
});

HoldButton.addEventListener("click", function () {
  if (PlayingBeingContinued) {
    scoresForPlayers[ActivePlayer] += ScoreToBeAdded;
    document.getElementById(`score--${ActivePlayer}`).textContent =
      scoresForPlayers[ActivePlayer];
    if (scoresForPlayers[ActivePlayer] >= 10) {
      PlayingBeingContinued = false;
      DiceImage.classList.add("hidden");
      winMoment.classList.remove("hidden");
      HoldButton.classList.add("hidden");
      RollButton.classList.add("hidden");
      DiceImage.classList.add("hidden");
      tempScoreBoxes[0].classList.add("hidden");
      tempScoreBoxes[1].classList.add("hidden");
      winMoment.textContent = `Player ${ActivePlayer + 1} has won the game`;
      document.getElementById(`current--${ActivePlayer}`).textContent = 0;
      document
        .querySelector(`.player--${ActivePlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.player--${ActivePlayer}`)
        .classList.add("player--winner");
    } else {
      changingPlayersandResettingScores();
      DiceImage.classList.add("hidden");
    }
  }
});

NewButton.addEventListener("click", function () {
  initial();
});
