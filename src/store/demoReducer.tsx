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
            console.log('===')
            return {...state,dispatchtestArray:payload}
        case 'refTest':
            console.log('===',action)
            return {...state,refTest:payload}
        default:
            return state
    }
}