import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import userReducer from './ReduxUser'
import sellerReducer from './ReduxSeller'
import thunk from 'redux-thunk'
import { reviewCreateReducer, reviewReducer } from './Reducers/reviewReducer'

const initialState = {}

const reducer = combineReducers({
  user: userReducer,
  seller: sellerReducer,
  reviews: reviewReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
