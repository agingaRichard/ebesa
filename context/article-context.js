import React, { useReducer, createContext } from "react";

export const ArticleContext = createContext();
//userData = null;
const initialState = {
  article: {title: "", body: ""},
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
        case "SELECT_ARTICLE":
      return {
        article: action.payload.article,
      };
    default:
      throw new Error();
  }
};

export const ArticleContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ArticleContext.Provider value={[state, dispatch]}>
    
      {props.children}
    
    </ArticleContext.Provider>
  );
};
