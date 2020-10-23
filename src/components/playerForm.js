import React, { useState } from "react";

function PlayerForm(props) {

  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.addPlayer(name, props.number);
    setName("");
  }


  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
    <input
        type="text"
        id="new-player-input"
        className="input new-player"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn add">
        Ok
      </button>
    </form>
  );
}

export default PlayerForm;
