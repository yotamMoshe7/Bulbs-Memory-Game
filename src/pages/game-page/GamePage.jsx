import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './GamePage.css';
import { Bulb } from '../../components/bulb/Bulb';
import { LeftBar } from '../../components/left-bar/LeftBar';
import { Title } from '../../components/title/Title';
import { NUM_OF_BULBS } from '../../utility/Constants';
import {
  getRandomIndex,
  getRandomNum,
  fillRestArrayWithNull,
} from '../../utility/Utils';
export const GamePage = (props) => {
  const location = useLocation();
  window.scrollTo(0, 0);
  let innerHeight = window.innerHeight;
  let innerWidth = window.innerWidth;
  const [bulbsArray, setBulbsArray] = useState(new Array(NUM_OF_BULBS));
  const [selectOrderArray, setSelectOrderArray] = useState(
    new Array(NUM_OF_BULBS)
  );
  const [level, setLevel] = useState(1);
  const [startButtonPress, setStartButtonPress] = useState(false);
  const [counter, setCounter] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showStartButton, setShowStartButton] = useState(true);

  // Initial memory inedexes array
  useEffect(() => {
    let tempArray = new Array(NUM_OF_BULBS);
    let randomIndex;
    let randomNum;

    for (let i = 0; i < level; i++) {
      randomIndex = getRandomIndex();
      randomNum = getRandomNum(level);

      if (
        !tempArray.includes(randomNum) &&
        tempArray[randomIndex] === undefined
      ) {
        tempArray[randomIndex] = randomNum;
        if (i === level - 1) {
          fillRestArrayWithNull(tempArray);
          break;
        }
      } else i--;
    }
    setSelectOrderArray(tempArray);
  }, [level]);

  useEffect(() => {
    let temp = new Array(NUM_OF_BULBS);
    if (counter > level || gameOver) setShowStartButton(true);

    for (let i = 0; i < temp.length; i++) {
      temp[i] = (
        <Bulb
          key={i}
          selectOrderNum={selectOrderArray[i]}
          startButtonPress={startButtonPress}
          level={level}
          setGameComplete={setGameComplete}
          counter={counter}
          setCounter={setCounter}
          setGameOver={setGameOver}
          gameOver={gameOver}
          setStartButtonPress={setStartButtonPress}
        />
      );
    }
    setBulbsArray(temp);
  }, [startButtonPress, selectOrderArray, level, counter, gameOver]);

  const startGame = async () => {
    if (gameOver) {
      setLevel(1);
    }
    if (counter > level) {
      setLevel(1 + level);
    }

    setShowStartButton(false);
    setCounter(1);
    setStartButtonPress(true);
    setGameOver(false);
    setShowInstructions(false);
  };

  return (
    <div
      className='wrap'
      style={{ height: innerWidth >= 500 ? `${innerHeight}px` : '89vh' }}
    >
      <LeftBar
        playerName={location.state.name}
        counter={counter}
        level={level}
        gameComplete={gameComplete}
        gameOver={gameOver}
      />

      <div id='game-container'>
        <Title
          counter={counter}
          showStartButton={showStartButton}
          level={level}
          showInstructions={showInstructions}
          startButtonPress={startButtonPress}
          gameOver={gameOver}
          startGame={startGame}
          gameComplete={gameComplete}
        />
        {!gameComplete ? (
          <div id='circles-container'>{bulbsArray.map((item) => item)}</div>
        ) : null}

        {gameComplete ? (
          <div>
            <div id='game-finish'>Congratulation!</div>
            <div id='game-finish'>You Finish The Game</div>
          </div>
        ) : null}
        {counter > level && !gameComplete ? (
          <div id='success'>Well Done</div>
        ) : null}
      </div>
    </div>
  );
};
