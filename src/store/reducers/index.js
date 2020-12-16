import { ADD_APPLICANT, CLEAR_NEW_APPLICANT, DEL_NEW_APPLICANT, SHOW_ADD_FORM } from "../actions";

const initialState = {
    newApplicants: [],
    addForm: false,
};

export default function (state = initialState, { type, payload }) {

    const deleteNew = (i) => state.newApplicants.filter((item, index) => index !== i)

    switch (type) {
        case ADD_APPLICANT:
            return { ...state, newApplicants: [...state.newApplicants, payload], addForm: false };
        case SHOW_ADD_FORM:
            return { ...state, addForm: payload };
        case DEL_NEW_APPLICANT:
            return { ...state, newApplicants: deleteNew(payload) };
        case CLEAR_NEW_APPLICANT:
            return { ...state, newApplicants: [] };

        default:
            return state

    }
}