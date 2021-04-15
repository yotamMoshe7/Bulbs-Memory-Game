import React, { useState, useEffect } from 'react';
import './WelcomePage.css';
import { useHistory } from 'react-router';

export const WelcomePage = () => {
  const history = useHistory();
  const [input, setInput] = useState('');
  const [errorText, setErrorText] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener('resize', handleResize);

    return (_) => {
      window.removeEventListener('resize', handleResize);
    };
  });

  // let innerHeight = useRef(window.innerHeight);

  const onClick = () => {
    if (input !== '') {
      setErrorText(false);
      history.push({
        pathname: '/game',
        state: { name: input },
      });
    } else {
      setErrorText(true);
    }
  };

  return (
    <div id='welcome-container' style={{ height: `${dimensions.height}px` }}>
      <div id='welcome-page-title'>Welcome To Memory Game</div>
      <div id='welcome-page-sub-title'>Please enter your name</div>
      <input
        id='input'
        type='text'
        name='name'
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <button id='welcome-start-game-button' onClick={onClick}>
        Start Game
      </button>
      {errorText ? <h2>Enter your name</h2> : null}
    </div>
  );
};
