import React from "react";
import "./styles.css";
import { ReactTerminal } from "react-terminal";

export default function App() {
  const commands = {
    whoami: "Sibu Stephen Front end Developer by profession",
    // cd: directory => `changed path to ${directory}`,
    "tellmore": "Sibu likes to write, likes to code, also likes to DJ at times (Trying to be extrovert) :)",
    "wheretofind": "Sibu Currently resides in  pune , (loves to explore new places).",
    "TechInterests": "Has a hands on Web Technologies including HTML, css, Javascript, jQuery, Drupal Front End, React(Learning phase)."
  };

  const welcomeMessage = (
    <span>
      welcome to Sibu terminal type any of the following available commands: &nbsp;
      <span style={{color:"green"}}>{Object.keys(commands).join(", ")}</span>
      <br />
    </span>
  );

  return (
    <div className="App">
      <ReactTerminal welcomeMessage={welcomeMessage} commands={commands} />
    </div>
  );
}
