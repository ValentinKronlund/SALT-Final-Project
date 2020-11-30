import React from "react";
import Draggable from 'react-draggable';
import CreateActivity from "./CreateActivity";

export default function AddActivity({isHidden, toggleIsHidden, position, setPosition}) {
  
  const getNewPosition = (e, ui) => {
    console.log(`Window coords are:\n x:${ui.x} | y:${ui.y}`);
    
    setPosition({
      x:ui.x, 
      y:ui.y
    });
  }

  return (
    <>
    <Draggable defaultPosition={position} onStop={getNewPosition} bounds=".background" handle=".add-window-bar">
    <div className="add-window-container">
      <div className="add-window-bar">
        <button className="add-window-close-btn" onClick={() => toggleIsHidden(!isHidden)}>X</button>
      </div>
      <div className="add-window-content">
        <CreateActivity toggleIsHidden={toggleIsHidden}/>
      </div>
    </div>
    </Draggable>
    </>
  )
}
