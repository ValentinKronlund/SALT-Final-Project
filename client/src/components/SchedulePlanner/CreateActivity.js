import React, { useState, useContext } from 'react';
import { ActivitiesContext, UpdateAtivitiesContext } from '../App';
import Context from '../../contexts/Context';

import '../../styles/createActivity.css';

import updateUser from '../../hooks/updateUser';

export default function CreateActivity({ toggleIsHidden }) {
  const updateActivitiesArray = useContext(UpdateAtivitiesContext);
  const ActivitiesArray = useContext(ActivitiesContext);
  const user = useContext(Context);

  const [Description, updateDescription] = useState('');
  const [Activity, updateActivity] = useState('');
  const [Time, updateTime] = useState('');

  const addActivity = () => {
    const newActivity = {
      Activity,
      Description,
      Time,
    };

    const newArray = ActivitiesArray;
    newArray.push(newActivity);
    updateActivitiesArray(newArray);

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schedule: newArray }),
    };

    fetch(`http://localhost:1337/api/mongoDB/?firstName=${user.userInfo.firstName}`, requestOptions)
      .then( async (data) => {
        console.log('--- data ---\n', data);
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
      <input
        type="time"
        className="input-field"
        name="time"
        placeholder="Time"
        value={Time}
        onChange={(e) => updateTime(e.currentTarget.value)}
        required
      />
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
