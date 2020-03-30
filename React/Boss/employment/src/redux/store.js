import { createStore ,applyMiddleware} from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
// import redux from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// let store = process.env.NODE_ENV === 'production' ? (
//     createStore(reducer, applyMiddleware(thunk))
// ) : (
//     window.__REDUX_DEVTOOLS_EXTENSION__ ? (
//         createStore(reducer, composeWithDevTools(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()))
//     ) : (
//         createStore(reducer, applyMiddleware(thunk))
//     )
// )
export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))