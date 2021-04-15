import './Title.css';
import { NUM_OF_BULBS, TIME } from '../../utility/Constants';

export const Title = (props) => {
  const showInstructions = props.showInstructions;
  const gameOver = props.gameOver;
  const showStartButton = props.showStartButton;
  const level = props.level;
  const startButtonPress = props.startButtonPress;
  const startGame = props.startGame;
  const gameComplete = props.gameComplete;
  const counter = props.counter;

  return (
    <div id='title-wrapper'>
      <div id='level'>{`Level ${level}`}</div>
      {showInstructions && !gameComplete ? (
        <div id='instructions1'>
          {`After pressing start game you will have ${TIME} seconds to remember the
          circles press order`}
        </div>
      ) : null}
      {startButtonPress ? null : !gameOver &&
        !showInstructions &&
        !gameComplete ? (
        <div id='instructions2'>Choose circles in the right order</div>
      ) : null}
      {gameOver ? <div id='game-over'>Game Over</div> : null}
      {showStartButton && !gameComplete ? (
        <button id='start-game-button' onClick={startGame}>
          {gameOver
            ? 'Start Game'
            : level === NUM_OF_BULBS
            ? 'Final Level'
            : level > 1 || counter > level
            ? 'Next Level'
            : 'Start Game'}
        </button>
      ) : null}
    </div>
  );
};
