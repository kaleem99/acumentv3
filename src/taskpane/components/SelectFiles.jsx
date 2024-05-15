import { Button, makeStyles, tokens } from "@fluentui/react-components";
import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { SetSection } from "../../redux/actions";
import { getExcelSheets } from "../ReadFiles";

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
  input: {
    width: "40px",
    height: "40px",
    marginLeft: "5px",
  },
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const SelectFiles = ({ state }) => {
  const dispatch = useDispatch();
  // const [text, setText] = useState("Some text.");
  // // const [state, setState] = useState([]);
  // const fileInputRef = React.useRef(null);

  // const handleTextInsertion = async () => {
  //   await insertText(text);
  // };

  // const handleTextChange = async (event) => {
  //   setText(event.target.value);
  // };

  // const handleFileInputChange = (event) => {
  //   const files = event.target.files;
  //   const arr = [];
  //   if (files && files.length > 0) {
  //     setState(Object.values(files));
  //     readExcelFile(files);
  //     // console.log("State", state, "files", files);
  //     // for (let key in files) {
  //     //   console.log(200, files[key], 200);
  //     // }
  //   }
  // };

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

      {state.map((file, i) => (
        <div className={styles.div} key={i}>
          <label>{file.name}</label>
          <input
            className={styles.input}
            onChange={(e) => {
              file.selected = e.target.checked;
              getExcelSheets(file, dispatch);
            }}
            key={i}
            type="checkbox"
          />
        </div>
      ))}
      <Button appearance="primary" disabled={false} size="large" onClick={() => dispatch(SetSection("Sheets"))}>
        Next
      </Button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    state: state.state,
  };
};
export default connect(mapStateToProps, {})(SelectFiles);
