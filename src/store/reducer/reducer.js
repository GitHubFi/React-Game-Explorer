import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    userName: 'Haider',
    currentUser:'',
    users: [], //all users signed in
    // messages: {},
    recipientID: '',
    Data:[]
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case ActionTypes.DATA:
        
            return({
                 ...state,
                Data: action.payload.results,
            })
        case ActionTypes.USERNAME:
            return ({
                ...state,
                userName: action.payload
            })
        case ActionTypes.CURRENTUSER:
            return ({
                ...state,
                currentUser: action.payload
            })   
        case ActionTypes.ALLUSERS:
            return ({
                ...state,
                users: action.payload
            }) 
        case ActionTypes.CHANGERECPUID:
            return ({
                ...state,
                recipientID: action.payload
            })

              case ActionTypes.DATA:
        
            return({
                 ...state,
                Data: action.payload.results,
                
            })
        // case ActionTypes.MESSAGES:
        //     return ({
        //         ...state,
        //         messages: action.payload
        //     })
        default:
            return state;
    }

}