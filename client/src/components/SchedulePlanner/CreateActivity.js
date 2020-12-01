import React, { useState, useContext } from "react";
import { ActivitiesContext, UpdateAtivitiesContext } from "../App";
import userContext from "../../contexts/UserContext";

import "../../styles/createActivity.css";

import updateUser from "../../hooks/updateUser";

export default function CreateActivity({ toggleIsHidden }) {
  const updateActivitiesArray = useContext(UpdateAtivitiesContext);
  const ActivitiesArray = useContext(ActivitiesContext);
  const user = useContext(userContext);

  const [Description, updateDescription] = useState("");
  const [Activity, updateActivity] = useState("");
  const [Time, updateTime] = useState("");

  const addActivity = () => {
    const fetchUrl = `http://localhost:1337/api/mongoDB/?firstName=${user.userInfo.firstName}`;

    const newActivity = {
      Activity,
      Description,
      Time,
    };

    const newArray = ActivitiesArray;
    newArray.push(newActivity);
    updateActivitiesArray(newArray);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schedule: newArray }),
    };

    fetch(fetchUrl, requestOptions)
      .then(async () => {
        toggleIsHidden(true);
        const fetchUser = await updateUser();
        console.log('--- fetchUser ---\n', fetchUser);
        user.setUserInfo(fetchUser);
      });
  };

  return (
    <>
      <input
        type="text"
        className="input-field"
        name="activity"
        placeholder="Add an activity"
        value={Activity}
        autoComplete="off"
        onChange={(e) => updateActivity(e.currentTarget.value)}
        required
      />
      <hr className="top-input-underline"></hr>
      <input
        type="text"
        className="input-field"
        name="description"
        placeholder="Add a description"
        value={Description}
        autoComplete="off"
        onChange={(e) => updateDescription(e.currentTarget.value)}
        required
      />
      <br></br>
      <div className="date-time-container">
        <input
          type="time"
          className="input-field"
          name="time"
          value={Time}
          onChange={(e) => updateTime(e.currentTarget.value)}
          required
        />
        <input
          type="date"
          className="input-field"
          name="date"
          value={Time}
          onChange={(e) => updateTime(e.currentTarget.value)}
          required
        />
      </div>
      <br></br>
      <button
        className="add-window-button add-act"
        onClick={addActivity}
        type="submit"
      >
        <p>Add Activity</p>
      </button>
    </>
  );
}
