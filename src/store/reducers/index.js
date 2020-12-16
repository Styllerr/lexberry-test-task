import { ADD_APPLICANT } from "../actions";

const initialState = {
    newApplicant: [],
};

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case ADD_APPLICANT:
            return { ...state, newApplicant: [...newApplicant, payload] };
        
        default:
            return state

    }
}