"use strict";

const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const currentScore0Element = document.getElementById("current--0");
const currentScore1Element = document.getElementById("current--1");

//starting conditions

let scores, currentScore, activePlayer, isPlaying;

function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;

    score0Element.textContent = "0";
    score1Element.textContent = "0";
    currentScore0Element.textContent = "0";
    currentScore1Element.textContent = "0";

    diceElement.classList.add("hidden");
    player0Element.classList.remove("player--winner");
    player1Element.classList.remove("player--winner");
    player0Element.classList.add("player--active");
    player1Element.classList.remove("player--active");
}

init();

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = "0";
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0Element.classList.toggle("player--active");
    player1Element.classList.toggle("player--active");
}

btnRoll.addEventListener("click", function () {
    if (isPlaying) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        diceElement.classList.remove("hidden");
        diceElement.src = `dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            //Switching
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", function () {
    if (isPlaying) {
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            isPlaying = false;
            document.querySelector(".dice").classList.add("hidden");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            document
                .querySelector(`player--${activePlayer}`)
                .classList.remove("player--active");
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener("click", init);
