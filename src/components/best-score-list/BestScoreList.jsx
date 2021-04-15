import './BestScoreList.css';

export const BestScoreList = (props) => {
  const allTimeScores = props.allTimeScores;

  const createListElement = (element, index) => {
    return (
      <div key={index} id='score-element'>
        <div />
        <div id='score-name'>{element.name}</div>
        {/* <div id='score-date'>{element.time}</div> */}
        <div id='score-result'>{element.score}</div>
        <div />
      </div>
    );
  };
  return (
    <div id='scores-list-wrapper'>
      <div id='best-score-title'>Best Scores</div>
      {allTimeScores.map((item, index) => createListElement(item, index))}
    </div>
  );
};
