import React, { useState, useEffect } from 'react';
import './Bulb.css';
import { COLOR_ARRAY, NUM_OF_BULBS } from '../../utility/Constants';

export const Bulb = (props) => {
  const [showBackground, setShowBackground] = useState(false);
  const [time, setTime] = useState(0);
  let counter = props.counter;
  let setCounter = props.setCounter;
  let startButtonPress = props.startButtonPress;
  let selectOrderNum = props.selectOrderNum;
  let setGameOver = props.setGameOver;
  let level = props.level;
  let setGameComplete = props.setGameComplete;
  let gameOver = props.gameOver;
  let setStartButtonPress = props.setStartButtonPress;

  const bulbClicked = () => {
    if (!startButtonPress && !gameOver && counter <= level) {
      if (counter !== selectOrderNum) {
        setGameOver(true);
      } else {
        // Game complete
        if (counter === NUM_OF_BULBS) {
          setGameComplete(true);
        }
        setCounter(++counter);
      }
      setShowBackground(true);
    }
  };

  useEffect(() => {
    setShowBackground(false);
  }, [level]);

  useEffect(() => {
    if (startButtonPress) {
      let timeCounter = 0;
      new Promise((resolve, reject) => {
        let timer = setInterval(myTimer, 1000);
        function myTimer() {
          timeCounter++;

          setTime(timeCounter);
          if (timeCounter === level + 1) {
            console.log('timer');
            clearInterval(timer);
            setStartButtonPress(false);
            resolve(setTime(0));
          }
        }
      });
    }
  }, [startButtonPress, level, setStartButtonPress]);

  return (
    <div id='wrapper'>
      <div id='circle-container'>
        <div
          id='circle'
          onClick={bulbClicked}
          style={{
            background:
              time === selectOrderNum || showBackground || gameOver
                ? COLOR_ARRAY[selectOrderNum - 1]
                : null,
          }}
        >
          <div id='order-num'>
            {time === selectOrderNum || gameOver ? selectOrderNum : null}
          </div>
        </div>
      </div>
    </div>
  );
};
