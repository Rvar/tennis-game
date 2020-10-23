import React from "react";

function Player(props) {
  return (
    <div className="player">
      <label className="label-player">
          Player {props.number} : {props.name}
      </label>
    </div>
  );
}

export default Player;
