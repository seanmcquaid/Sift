export default (state = [], action) => {
    if (action.type === "CHANGE_CATEGORY") {
        return action.payload
    } else {
        return state
    }
}