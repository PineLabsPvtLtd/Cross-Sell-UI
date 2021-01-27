import { createContext } from 'react';
const GlobalContext = createContext({});
export const GlobalContextProvider = GlobalContext.Provider;
export default GlobalContext;
