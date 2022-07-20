import { createContext, useContext } from 'react';

export const DarkModeContext = createContext(true);
export const DarkModeContextProvider = DarkModeContext.Provider;

export const useDarkModeContext = () => {
	return useContext(DarkModeContext);
};
