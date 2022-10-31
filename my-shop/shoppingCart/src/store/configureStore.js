import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../reducer/cartReducer';
// import thunk from 'redux-thunk';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = configureStore(
        {reducer:{cart:cartReducer}
        // composeEnhancers(applyMiddleware(thunk))
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    }
    );

    return store;
};