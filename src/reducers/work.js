const work = {
    work: []
}

const Work = (state=work,action)=>{
    switch(action.type){
        case 'UPDATE_WORK':{
            return {
                ...state,
                work: action.payload
            }
        }
        default: return state;
    }
}

export default Work;