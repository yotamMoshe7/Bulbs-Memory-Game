import { NUM_OF_BULBS, ALL_TIME_SCORES_TABLE_SIZE } from './Constants';

export const getRandomIndex = () => {
  return Math.floor(Math.random() * NUM_OF_BULBS);
};

export const getRandomNum = (level) => {
  return Math.floor(Math.random() * level) + 1;
};

export const fillRestArrayWithNull = (array) => {
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i] === undefined ? null : array[i];
  }
};

export const addScoreToLocalStorage = (score, name) => {
  let scoresArray = JSON.parse(localStorage.getItem('allTimeScores')) || [];

  let date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let time = `${day}/${month + 1}/${year} ${hours}:${minutes}`;

  const scoreDetails = {
    name: name,
    time: time,
    score: score,
  };

  // Add element to accurate place in array
  if (scoresArray.length === 0) {
    scoresArray.push(scoreDetails);
  } else {
    for (let i = 0; i < scoresArray.length; i++) {
      if (i > ALL_TIME_SCORES_TABLE_SIZE - 1) {
        break;
      }
      if (score >= scoresArray[i].score) {
        scoresArray.splice(i, 0, scoreDetails);
        if (scoresArray.length > ALL_TIME_SCORES_TABLE_SIZE) {
          scoresArray.pop();
        }
        break;
      }
    }
  }
  localStorage.setItem('allTimeScores', JSON.stringify(scoresArray));

  return scoresArray;
};

export const clearLocalStorage = () => {
  localStorage.setItem('allTimeScores', JSON.stringify([]));
};
