import {GET_REVIEWS, LEAVE_REVIEW} from "../actions/types";

const INIT_STATE = {
    reviews: []
}

export default function(state = INIT_STATE, action){
    switch(action.type){
        case LEAVE_REVIEW:
        case GET_REVIEWS:
            return{
                ...state,
                reviews: action.payload
            }
        default:
            return{
                ...state
            }
    }
}