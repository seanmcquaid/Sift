export default (state = [], action)=>{
    if(action.type === "LOGIN_ACTION" || action.type === "REG_ACTION"){
        console.log(action.payload.data)
        return action.payload.data
    } else {
        return state
    }
}