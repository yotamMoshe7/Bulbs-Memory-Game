import React, { useState, useEffect } from 'react';
import './LeftBar.css';
import { addScoreToLocalStorage } from '../../utility/Utils';
import { BestScoreList } from '../best-score-list/BestScoreList';

export const LeftBar = (props) => {
  const [score, setScore] = useState(0);
  const [allTimeScores, setAllTimeScores] = useState(
    JSON.parse(localStorage.getItem('allTimeScores')) || []
  );
  const counter = props.counter;
  const level = props.level;
  const gameComplete = props.gameComplete;
  const gameOver = props.gameOver;
  const playerName = props.playerName;

  useEffect(() => {
    let tempScore = 0;
    for (let i = 0; i < level; i++) {
      tempScore += 10 * i;
    }
    tempScore += (counter - 1) * 10;
    setScore(tempScore);

    // Game complete
    if (gameComplete || gameOver) {
      // clearLocalStorage();
      // localStorage.setItem('allTimeScores', JSON.stringify([]));

      let scoresArray = addScoreToLocalStorage(tempScore, playerName);
      setAllTimeScores(scoresArray);
    }
  }, [counter, level, gameComplete, gameOver, playerName]);

  return (
    <div className='side-bar'>
      <div id='player-name'>{`${playerName}`}</div>
      <div id='score'>
        Score
        <br />
        {score}
      </div>
      <BestScoreList allTimeScores={allTimeScores} />
    </div>
  );
};
