export const ADD_APPLICANT = 'ADD/APPLICANT'

export function addApplicant(data) {
    return {
        type: ADD_APPLICANT,
        payload: data,
    }
}