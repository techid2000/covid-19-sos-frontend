import { createContext, useReducer, useContext } from 'react';

import * as counterReducer from './counter/counter.reducer';
import * as registerReducer from './register/register.reducer';

const StoreContext = createContext({});

const getReducerObject = ({ reducer, initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

export const StoreProvider = ({ children }) => {
  const store = {
    counter: getReducerObject(counterReducer),
    register: getReducerObject(registerReducer)
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const StoreConnect = (propsMapper) => Component =>
  function StoreConsumer() {
    const store = useContext(StoreContext);
    return <Component {...propsMapper(store)} />;
  };
