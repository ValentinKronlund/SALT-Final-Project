import React, { useContext, useState } from 'react'

const ActivityContext = React.createContext();
const UpdateActivityContext = React.createContext();

export function ActivityProvider({ children }) {
    const [ActivitiesArray, updateActivitiesArray] = useState([{
        Activity: "Eat",
        Description: "Please work",
        Time: "Now"
    }]);

    function updateActivityState(Activity) {
        const newArray = ActivitiesArray;
        newArray.push(Activity);
        updateActivitiesArray(newArray);
    }

    return (
        <ActivityContext.Provider value={ActivitiesArray}>
            <UpdateActivityContext.Provider value={updateActivitiesArray}>

            </UpdateActivityContext.Provider>
        </ActivityContext.Provider>
    )
}