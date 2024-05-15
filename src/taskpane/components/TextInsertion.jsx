import { Button, makeStyles, tokens } from "@fluentui/react-components";
import * as React from "react";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { SetState } from "../../redux/actions";
import insertText from "../office-document";

const useStyles = makeStyles({
  instructions: {
    fontWeight: tokens.fontWeightSemibold,
    marginTop: "20px",
    marginBottom: "10px",
  },
  textPromptAndInsertion: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textAreaField: {
    marginLeft: "20px",
    marginTop: "30px",
    marginBottom: "20px",
    marginRight: "20px",
    maxWidth: "50%",
  },
});

const TextInsertion = ({ state, defaultState }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("Some text.");
  // const [state, setState] = useState([]);
  const fileInputRef = React.useRef(null);

  const handleTextInsertion = async () => {
    await insertText(text);
  };

  const handleTextChange = async (event) => {
    setText(event.target.value);
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const arr = [];
    if (files && files.length > 0) {
      dispatch(SetState(Object.values(files)));
      // console.log(files, 45);
      // console.log(Object.values(files), 46);
      // readExcelFile(files);
      // console.log("State", state, "files", files);
      // for (let key in files) {
      //   console.log(200, files[key], 200);
      // }
    }
  };

  const styles = useStyles();
  // console.log(state, 100);
  return (
    <div className={styles.textPromptAndInsertion}>
      {/* <Field className={styles.textAreaField} size="large" label="Enter text to be inserted into the document.">
        <Textarea size="large" value={text} onChange={handleTextChange} />
      </Field>
      <Field className={styles.instructions}>Click the button to insert text.</Field>
      <Button appearance="primary" disabled={false} size="large" onClick={handleTextInsertion}>
        Insert text
      </Button> */}

      <Button appearance="primary" m disabled={false} size="large" onClick={() => fileInputRef.current.click()}>
        Select Excel File
      </Button>
     
      <input multiple type="file" style={{ display: "none" }} ref={fileInputRef} onChange={handleFileInputChange} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    state: state.state,
    sheets: state.sheets,
    defaultState: state,
  };
};
export default connect(mapStateToProps, {})(TextInsertion);
