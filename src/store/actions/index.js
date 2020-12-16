export const ADD_APPLICANT = 'ADD/APPLICANT';
export function addApplicant(data) {
    return {
        type: ADD_APPLICANT,
        payload: data,
    }
}
export const SHOW_ADD_FORM = 'SHOW/ADD/FORM';
export function showAddForm(flag) {
    return {
        type: SHOW_ADD_FORM,
        payload: flag
    }
}
export const DEL_NEW_APPLICANT = 'DEL/NEW/APPLICANT';
export function deleteNewApplicant(index) {
    return {
        type: DEL_NEW_APPLICANT,
        payload: index
    }
}
export const CLEAR_NEW_APPLICANT = 'CLEAR/NEW/APPLICANT';
export function clearNewApplicant() {
    return {
        type: CLEAR_NEW_APPLICANT,
    }
}