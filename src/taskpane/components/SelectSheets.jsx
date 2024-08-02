import { Button, makeStyles, tokens } from "@fluentui/react-components";
import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { readExcelFiles } from "../ReadFiles";
import Slideshow from "./Slideshow";
import logo from "../../../assets/Acumen.png"; // Replace with the path to your logo image

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    backgroundColor: "#f7f7f7",
    minHeight: "100vh",
  },
  instructions: {
    fontWeight: tokens.fontWeightSemibold,
    marginTop: "20px",
    marginBottom: "10px",
    textAlign: "center",
  },
  textPromptAndInsertion: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  textAreaField: {
    margin: "30px 20px 20px 20px",
    maxWidth: "50%",
  },
  input: {
    width: "20px",
    height: "20px",
    marginLeft: "10px",
  },
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
  },
  fileSection: {
    width: "100%",
    maxWidth: "500px",
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    margin: "1rem 0",
  },
  logo: {
    width: "150px",
    marginBottom: "1rem",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
});

const SelectSheets = ({ state, sheets, defaultState }) => {
  const dispatch = useDispatch();
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <img src={logo} alt="Acumen Logo" className={styles.logo} />
      <h2 className={styles.header}>Select File Sheets</h2>
      <div className={styles.textPromptAndInsertion}>
        <Slideshow state={state} />

        {state.map((file, i) => {
          return (
            <div key={i} className={styles.fileSection}>
              <h3>{file.name}</h3>
              {file?.selected &&
                sheets[file?.name]?.sheets.map((obj, j) => {
                  return (
                    <div className={styles.div} key={j}>
                      <label>{obj.name}</label>
                      <input
                        className={styles.input}
                        onChange={async (e) => {
                          obj.selected = e.target.checked;
                          await readExcelFiles(file, obj.name, dispatch);
                        }}
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
          size="large"
          onClick={() => {
            const invoiceData = defaultState.fileContent;
            console.log("Invoice Data: ", invoiceData);
          }}
        >
          Next
        </Button>
      </div>
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
