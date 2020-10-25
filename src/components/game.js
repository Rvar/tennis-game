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
                  {scoreRow.scorePlayerOne} {scoreRow.scorePlayerTwo}
                <div className="message">
                  {scoreRow.message}
                </div>
            </li>
      )
    );

  /*Add points player One*/
  function addPointPlayerOne() {
    setScorePlayerOne(++props.playerOne.score);
    updateScoreTable();
  }

  /*Add points player Two*/
  function addPointPlayerTwo() {
    setScorePlayerTwo(++props.playerTwo.score);
    updateScoreTable();
  }

  /*Update score table*/
  function updateScoreTable() {

    let message = checkScore();

    let scorePlOne = <span className = "tableScore">
                      {props.playerOne.name} :
                      <span className = "score"> {translateScore[props.playerOne.score]} </span>
                    </span>;
    let scorePlTwo = <span className = "tableScore">
                      <span className = "score"> {translateScore[props.playerTwo.score]} </span> :
                       {props.playerTwo.name}
                    </span>;

      if(translateScore[props.playerOne.score] == null || translateScore[props.playerTwo.score] == null ){
        scorePlOne = "";
        scorePlTwo = "";
      }

      const newScoreRow = {
        scorePlayerOne: scorePlOne,
        scorePlayerTwo: scorePlTwo,
        message: message
      };

      setScoreTable([...scoreTable, newScoreRow]);
  }

  /*Check scores player one and two*/
  function checkScore(){

    if(hasWinner()){
      setHaveAWinner(true);
      return playerWithHighestScore() + " Wins";
    }

    if(isDeuce()){
      return "Deuce";
    }

    if(hasAdvantage()){
      return "Advantage : " + playerWithHighestScore();
    }
  }

  function isDeuce() {
    let isDeuce = props.playerOne.score >= 3 &&
     props.playerOne.score === props.playerTwo.score;

    //Each player goes back to 3 when Deuce
    if(isDeuce){
      setScorePlayerOne(3);
      setScorePlayerTwo(3);
      props.playerOne.score = 3;
      props.playerTwo.score = 3;
    }

		return isDeuce;
	}

  function playerWithHighestScore() {
		if (props.playerOne.score > props.playerTwo.score) {
			return props.playerOne.name;
		} else {
			return props.playerTwo.name;
		}
	}

   function hasWinner() {
       return (props.playerTwo.score >= 4 && props.playerTwo.score >= props.playerOne.score + 2) ||
        (props.playerOne.score >= 4 && props.playerOne.score >= props.playerTwo.score + 2)
  	}

    function hasAdvantage() {
    		return (props.playerTwo.score >= 4 && props.playerTwo.score === props.playerOne.score + 1) ||
         (props.playerOne.score >= 4 && props.playerOne.score === props.playerTwo.score + 1)
	   }


  function resetGame(){
    props.playerOne.score = 0;
    props.playerTwo.score = 0;
    setScorePlayerOne(0);
    setScorePlayerTwo(0);
    setScoreTable([]);
    setHaveAWinner(false);
  }

  var scorePlOne = <span className = "score"> {translateScore[scorePlayerOne]}</span>;
  var scorePlTwo = <span className = "score">  {translateScore[scorePlayerTwo]} </span>;
  var btnWinPlOne = <button type="button" className="btnWin" onClick={addPointPlayerOne}> win </button>;
  var btnWinPlTwo =  <button type="button" className="btnWin" onClick={addPointPlayerTwo}> win </button>;

  //In order to display Av
  if(translateScore[props.playerOne.score] == null) {
    scorePlOne = <span className = "score"> Av </span>;
  }
  if(translateScore[props.playerTwo.score] == null) {
    scorePlTwo = <span className = "score"> Av </span>;
  }

  return (
    <div className="point">
      <ul>
        {listScoreTable}
      </ul>
      <label className="label-score">
        {!haveAWinner &&
          <span> {props.playerOne.name} : {scorePlOne} {btnWinPlOne} - </span>
        }
        {!haveAWinner &&
          <span> {btnWinPlTwo} {scorePlTwo} : {props.playerTwo.name} </span>
        }
      </label>
      {haveAWinner &&
        <button type="button" className="btnReset" onClick={resetGame}> Reset </button>
      }
    </div>
  );
}

export default Game;
