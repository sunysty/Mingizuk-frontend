// * import basic libary
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

// * import slices
import routineSlice from './modules/routine'
import actionSlice from './modules/updateRoutine'
import userSlice from './modules/userSlice'

export const history = createBrowserHistory()

// * reducers
const reducer = combineReducers({
    router: connectRouter(history),
    routine: routineSlice.reducer,
    updateAction: actionSlice.reducer,
    user: userSlice.reducer,
})

const middlewares = [thunkMiddleware]
const env = process.env.NODE_ENV

if (env === 'development') {
    const { logger } = require('redux-logger')
    middlewares.push(logger)
}

const store = configureStore({
    reducer,
    middleware: [...middlewares],
    devTools: env !== 'production',
})

export default store
