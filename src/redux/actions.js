const SET_SECTION = "SET_SECTION";
const SET_STATE = "SET_STATE";
const SET_SHEETS = "SET_SHEETS";
const SET_FILE_SHEETS_CONTENT = "SET_FILE_SHEETS_CONTENT";
const SetSection = (name) => {
  return {
    type: SET_SECTION,
    payload: name,
  };
};
const SetState = (data) => {
  return {
    type: SET_STATE,
    payload: data,
  };
};
const SetSheets = (data) => {
  return {
    type: SET_SHEETS,
    payload: data,
  };
};
const SetFileSheetsContent = (data, name, fileName) => {
  return {
    type: SET_FILE_SHEETS_CONTENT,
    payload: data,
    name: name,
    fileName: fileName,
  };
};
export {
    SET_FILE_SHEETS_CONTENT,
    SET_SECTION,
    SET_SHEETS,
    SET_STATE,
    SetFileSheetsContent,
    SetSection,
    SetSheets,
    SetState
};

