import React, { useReducer, createContext } from "react";
import pb from "../pages/api/pocketbase";
export const UserContext = createContext();

const initialState = {
  user: {},
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        user: action.payload,
      };
    case "DEL_USER":
      return {
        user: {},
      };

    default:
      throw new Error();
  }
};

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
