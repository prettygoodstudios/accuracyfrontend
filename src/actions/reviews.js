import axios from "axios";

import {generateUrl} from "./urlHelpers";
import {GET_REVIEWS, LEAVE_REVIEW, APPROVE_REVIEW} from "./types";

export const getReviews = () => {
    return function(dispatch){
        axios.get(generateUrl('/reviews', {})).then(({data}) => {
            if(!data.error){
                dispatch({
                    type: GET_REVIEWS,
                    payload: data
                });
            }else{
                alert(data.error);
            }
        }).catch((error) => {
            alert(error);
        });
    }
}

export const leaveReview = (params, success, error) => {
    return function(dispatch){
        axios.post(generateUrl('/reviews', params)).then(({data}) => {
            if(!data.error){
                dispatch({
                    type: LEAVE_REVIEW,
                    payload: data
                });
                success();
            }else{
                error(data.error);
            }
        }).catch((e) => {
            error(e);
        });
    }
}

export const approveReview = (params, success, error) => {
    return function(dispatch){
        axios.post(generateUrl('/reviews/approve', params)).then(({data}) => {
            if(!data.error){
                dispatch({
                    type: APPROVE_REVIEW,
                    payload: data
                });
                success();
            }else{
                error(data.error);
            }
        }).catch((e) => {
            error(e);
        });
    }
}