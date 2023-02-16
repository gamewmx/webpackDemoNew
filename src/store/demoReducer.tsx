const init = {
    number: 0
}

export default (state = init, action) => {
    const payload = action.payload
    switch (action.type) {
        case 'addCount':
            return {...state,payload}
        case 'reduceCount':
            return {...state,payload}
        case 'dispatchTest':
            return {...state,dispatchtestArray:payload}
        case 'refTest':
            return {...state,refTest:payload}
        default:
            return state
    }
}