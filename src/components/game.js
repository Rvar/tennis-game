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

  function addPointPlayerOne() {
    setScorePlayerOne(++props.playerOne.score);
    updateScoreTable();
  }

  function addPointPlayerTwo() {
    setScorePlayerTwo(++props.playerTwo.score);
    updateScoreTable();
  }

  //Update scoreTable
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

    if(translateScore[props.playerOne.score] == null) {
      scorePlOne = "";
    }
    if(translateScore[props.playerTwo.score] == null) {
      scorePlTwo = "";
    }

      const newScoreRow = {
        scorePlayerOne: scorePlOne,
        scorePlayerTwo: scorePlTwo,
        message: message
      };

      setScoreTable([...scoreTable, newScoreRow]);
  }

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
    let splO = props.playerOne.score;
    let splT = props.playerTwo.score;
    let isDeuce = splO >= 3 && splO === splT;

    //On revient toujours à 3 pour un Deuce
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
       let splO = props.playerOne.score;
       let splT = props.playerTwo.score;

       return (splT >= 4 && splT >= splO + 2) || (splO >= 4 && splO >= splT + 2)
  	}

    function hasAdvantage() {
        let splO = props.playerOne.score;
        let splT = props.playerTwo.score;

    		return (splT >= 4 && splT === splO + 1) || (splO >= 4 && splO === splT + 1)
	   }


  function resetGame(){
    props.playerOne.score = 0;
    props.playerTwo.score = 0;
    setScorePlayerOne(0);
    setScorePlayerTwo(0);
    setScoreTable([]);
    setHaveAWinner(false);
  }

  return (
    <div className="point">
      <label className="label-score">
      {!haveAWinner &&
          <span>
            {props.playerOne.name} :   <span className = "score"> {translateScore[scorePlayerOne]}</span>
            <button type="button" className="btnWin" onClick={addPointPlayerOne}>
              win
            </button>
            -
          </span>
        }
         {!haveAWinner &&
           <span>
             <button type="button" className="btnWin" onClick={addPointPlayerTwo}>
               win
             </button>
             <span className = "score">  {translateScore[scorePlayerTwo]} </span> : {props.playerTwo.name}
           </span>
         }
      </label>
      <ul>
        {listScoreTable}
      </ul>
      {haveAWinner &&
        <button type="button" className="btnReset" onClick={resetGame}>
          Reset
        </button>
      }
    </div>
  );
}

export default Game;
