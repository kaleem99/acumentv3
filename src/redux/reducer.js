import { SET_FILE_SHEETS_CONTENT, SET_SECTION, SET_SHEETS, SET_STATE, SET_CREDITS, SET_SESSION } from "./actions";

const defaultState = { section: "Login", state: [], sheets: {}, fileContent: {}, credits: 0, session: null };
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SECTION:
      state.section = action.payload;
      return { ...state };
    case SET_STATE:
      state.state = action.payload;
      return { ...state };
    case SET_SHEETS:
      state.sheets[action.payload.name] = action.payload;
      //   state.sheets = action.payload;
      return { ...state };
    case SET_FILE_SHEETS_CONTENT:
      const { fileName, name, payload } = action;
      return {
        ...state,
        fileContent: {
          ...state.fileContent,
          [fileName]: { ...state.fileContent[fileName], [name]: payload },
        },
      };
    case SET_CREDITS:
      console.log("I am working on it", action.payload)
      return { ...state, credits: action.payload };
    case SET_SESSION:
      return {...state, session: action.payload}
    default:
      return state;
  }
};
export default reducer;
