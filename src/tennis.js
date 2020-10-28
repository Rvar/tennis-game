import React, { useState } from "react";
import PlayerForm from "./components/playerForm";
import Player from "./components/player";
import Game from "./components/game";
import { nanoid } from "nanoid";

function Tennis(props) {

  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);

  const playerList = players.map(player => (
        <Player
          key={player.id}
          name={player.name}
          number={player.number}
          score={player.score}
        />
      )
    );

    const gameList = games.map(game => (
        <Game
          key={game.id}
          playerOne={game.playerOne}
          playerTwo={game.playerTwo}
        />
      )
    );

    function addPlayer(name, number) {
      const newPlayer ={id: "playerId-"+ nanoid(), name: name, number: number};
      setPlayers([...players, newPlayer]);
    }

    function startGame() {
      const editedplayerList = players.map(player => {
          return {...player, score: 0}
      });
      setPlayers(editedplayerList);
      const newGame = {id: "gameId-"+ nanoid(), playerOne: editedplayerList[0], playerTwo: editedplayerList[1]};

      setGames([...games, newGame]);
    }

    return (
        <div className="player stack-large">
          {playerList.length === 0 &&
            <span> Player 1 Name : <PlayerForm addPlayer={addPlayer} number="1"/> </span>
          }
          {playerList.length === 1 &&
            <span> Player 2 Name : <PlayerForm addPlayer={addPlayer} number="2"/> </span>
          }
          {playerList}
          {playerList.length === 2 && gameList.length === 0 &&
            <button type="button" className="btn" onClick={startGame}> Start Game ! </button>
          }
          <div className="game-list"> {gameList} </div>
        </div>
      );
}

export default Tennis;
