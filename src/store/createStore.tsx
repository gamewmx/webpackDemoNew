import {createStore, applyMiddleware, Store} from 'redux'
// import createSagaMiddleware from 'redux-saga'
// import asyncModule from "./asyncModule"
import rootReducer, {exampleInitialState} from './reducer'
// import rootSaga from './saga'

// const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = (middleware: any) => {
    if (process.env.NODE_ENV !== 'production') {
        const {composeWithDevTools} = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

let store;

export default function initStore(initState: any = null, ctx?: any): Store {
    // let {initialState} = asyncModule(ctx, initState)

    store = createStore(
        rootReducer,
        // initialState,
        // bindMiddleware([sagaMiddleware])
        bindMiddleware([])
    );

    // store.runSagaTask = () => {
    //     store.sagaTask = sagaMiddleware.run(rootSaga)
    // }

    // store.runSagaTask()
    return store
}

export function getStore() {
    if (!store) {
        return initStore()
    }
    return store;
}
