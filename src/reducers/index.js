import { combineReducers } from "redux";
import TimeTable from "./timetable";
import Work from './work'

const Reducers = combineReducers({
    TimeTable,
    Work
})

export default Reducers;