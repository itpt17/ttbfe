const timetable = {
    TimeTable: []
}

const TimeTable = (state = timetable, action)=>{
    switch(action.type){
        case 'UPDATE_TIMETABLE':{
            return {
                ...timetable,
                TimeTable: action.payload
            }
        }
        default: return state;
    }
}

export default TimeTable;