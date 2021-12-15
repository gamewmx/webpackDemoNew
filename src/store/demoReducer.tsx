const init = {
    number: 0
}

export default (state = init, {type,payload}) => {

    switch (type) {
        case 'addCount':
            return {...state,payload}
        case 'reduceCount':
            return {...state,payload}
        default:
            return state
    }
}