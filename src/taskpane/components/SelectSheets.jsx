import { Button, makeStyles, tokens } from "@fluentui/react-components";
import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { readExcelFiles } from "../ReadFiles";

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

const SelectSheets = ({ state, sheets, defaultState }) => {
  const dispatch = useDispatch();
  //   const [sheets, setSheets] = useState([]);
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
  return (
    <div className={styles.textPromptAndInsertion}>
      {/* <Field className={styles.textAreaField} size="large" label="Enter text to be inserted into the document.">
        <Textarea size="large" value={text} onChange={handleTextChange} />
      </Field>
      <Field className={styles.instructions}>Click the button to insert text.</Field>
      <Button appearance="primary" disabled={false} size="large" onClick={handleTextInsertion}>
        Insert text
      </Button> */}
      <h3>Select File Sheets</h3>
      {state.map((file, i) => {
        return (
          <div key={i}>
            <h3>{file.name}</h3>
            {file.selected &&
              sheets[file.name].sheets.map((obj) => {
                return (
                  <div className={styles.div} key={i}>
                    <label>{obj.name}</label>
                    <input
                      className={styles.input}
                      onChange={async (e) => {
                        obj.selected = e.target.checked;
                        await readExcelFiles(file, obj.name, dispatch);
                      }}
                      key={i}
                      type="checkbox"
                    />
                  </div>
                );
              })}
          </div>
        );
      })}
      <Button
        appearance="primary"
        disabled={false}
        size="large"
        onClick={() => {
          const invoiceData = defaultState.fileContent["Book 4.xlsx"]["Invoice"];
          const columnNames = Object.keys(invoiceData).filter((key) => key !== "!ref");
          console.log("Column names (entity names):", columnNames);
          console.log("Invoice Data: ", invoiceData);
        }}
      >
        Next
      </Button>
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
export default connect(mapStateToProps, {})(SelectSheets);
