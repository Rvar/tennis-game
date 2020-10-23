import React, { useState } from "react";

function Game(props) {

  let translateScore = {
      0 : "Love",
      1 : "Fifteen",
      2 : "Thirty",
      3 : "Forty"
    }

  const [scorePlayerOne, setScorePlayerOne] = useState(0);
  const [scorePlayerTwo, setScorePlayerTwo] = useState(0);

  const [haveAWinner, setHaveAWinner] = useState(false);

  const [scoreTable, setScoreTable] = useState([]);

  const listScoreTable = scoreTable.map(scoreRow => (
      <li className="label-score-row">
          {props.playerOne.name} : {scoreRow.scorePlayerOne} {translateScore[0]} - {scoreRow.scorePlayerTwo} : {props.playerTwo.name}
          <div>
            {scoreRow.message}
          </div>
      </li>
      )
    );



  function addPointPlayerOne() {
    setScorePlayerOne(++props.playerOne.score);
    updateScoreTable();
  }

  function addPointPlayerTwo() {
    setScorePlayerTwo(++props.playerTwo.score);
    updateScoreTable();
  }

  function checkScore(){

    if(hasWinner()){
      setHaveAWinner(true);
      return "Winner : " + playerWithHighestScore();
    }

    if(isDeuce()){
      return "Deuce";
    }

    if(hasAdvantage()){
      return "Advantage " + playerWithHighestScore();
    }
  }

  function isDeuce() {
    let splO = props.playerOne.score;
    let splT = props.playerTwo.score;

		return splO >= 3 && splO === splT;
	}

  function playerWithHighestScore() {
		if (props.playerOne.score > props.playerTwo.score) {
			return props.playerOne.name;
		} else {
			return props.playerTwo.name;
		}
	}

   function hasWinner() {
       let splO = props.playerOne.score;
       let splT = props.playerTwo.score;

       return (splT >= 4 && splT >= splO + 2) || (splO >= 4 && splO >= splT + 2)
  	}

    function hasAdvantage() {
        let splO = props.playerOne.score;
        let splT = props.playerTwo.score;

    		return (splT >= 4 && splT === splO + 1) || (splO >= 4 && splO === splT + 1)
	   }

  //Update scoreTable
  function updateScoreTable() {

    let message = checkScore();

    const newScoreRow = {
      scorePlayerOne: props.playerOne.score,
      scorePlayerTwo: props.playerTwo.score,
      message: message
    };

    setScoreTable([...scoreTable, newScoreRow]);
  }

  return (
    <div className="point">
      <label className="label-score">
        {props.playerOne.name} {scorePlayerOne}
        {!haveAWinner &&
          <button type="button" className="btnWin" onClick={addPointPlayerOne}>
            win
          </button>
        }
         -
         {!haveAWinner &&
           <button type="button" className="btnWin" onClick={addPointPlayerTwo}>
             win
           </button>
        }
        {scorePlayerTwo} {props.playerTwo.name}
      </label>
      <ul>
        {listScoreTable}
      </ul>
    </div>
  );
}

export default Game;
