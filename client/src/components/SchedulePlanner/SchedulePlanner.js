import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../contexts/UserContext";
import { ActivitiesContext, UpdateAtivitiesContext } from "../App";
import { v4 as uuid } from "uuid";

import Activity from "./Activity";
import Header from "../static/Header";
import Footer from "../static/Footer";
import Background from "../static/Background";
import AddActivity from "./AddActivity";

import "../../styles/schedulePlanner.css";

export default function SchedulePlanner() {
  const history = useHistory();

  let ActivitiesArray = useContext(ActivitiesContext);
  const updateActivitiesArray = useContext(UpdateAtivitiesContext);
  const userInfo = useContext(Context).userInfo;

  const [deleted, updateDeleted] = useState(false);
  const [isHidden, toggleIsHidden] = useState(true);
  const [position, setPosition] = useState({ x: 20, y: 480 });

  useEffect(() => {
    console.log("I am going to update ActivitiesArray");
    ActivitiesArray = userInfo.schedule;
    updateActivitiesArray(ActivitiesArray);
  }, []);

  const mapActivities = () => {
    if (ActivitiesArray.length === 0) {
      return <p>--Schedule Empty! --</p>;
    } else {
      return ActivitiesArray.map((act) => (
        <Activity
          key={uuid()}
          Activity={act.Activity}
          Description={act.Description}
          Time={act.Time}
          userDate={act.Date}
          deleted={deleted}
          updateDeleted={updateDeleted}
          
        />
      ));
    }
  };

  return (
    <>
      <Header />
      <Background />
      {isHidden ? null : (
        <AddActivity
          isHidden={isHidden}
          toggleIsHidden={toggleIsHidden}
          position={position}
          setPosition={setPosition}
        />
      )}
      <div className="">{mapActivities()}</div>
      <button
        className="add-activity-button"
        onClick={() => toggleIsHidden(!isHidden)}
        type="submit"
      >
        <p>Add +</p>
      </button>
      <Footer />
    </>
  );
}
