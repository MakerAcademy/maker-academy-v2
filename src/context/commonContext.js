import { createContext, useEffect, useState } from "react";

// Create Context Object
export const CommonContext = createContext({});

// Create a provider for components to consume and subscribe to changes
export const CommonContextProvider = ({ initialState = {}, children }) => {
  const [state, setState] = useState({ ...initialState });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const setCommonState = (data = {}) => {
    setState((old) => ({
      ...old,
      ...data,
    }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <CommonContext.Provider value={{ commonState: state, setCommonState }}>
      {children}
    </CommonContext.Provider>
  );
};
