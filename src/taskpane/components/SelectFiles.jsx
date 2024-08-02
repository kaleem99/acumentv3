import { Button, Checkbox, makeStyles, tokens, Text } from "@fluentui/react-components";
import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { SetSection } from "../../redux/actions";
import { getExcelSheets } from "../ReadFiles";
import Slideshow from "./Slideshow";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    boxShadow: tokens.shadow4,
    width: "80%",
    margin: "auto",
    marginTop: "20px",
  },
  header: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSize600,
    marginBottom: "20px",
  },
  fileList: {
    width: "100%",
    marginBottom: "20px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "8px",
    padding: "10px",
  },
  fileItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    fontSize: tokens.fontSize400,
    fontWeight: tokens.fontWeightSemibold,
  },
});

const SelectFiles = ({ state, setIsAuthenticated }) => {
  const dispatch = useDispatch();
  const styles = useStyles();

  // Local state to manage the file selection
  const [files, setFiles] = useState(state);

  useEffect(() => {
    setFiles(state);
  }, [state]);

  const handleCheckboxChange = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index].selected = !updatedFiles[index].selected;
    setFiles(updatedFiles);
    console.log(updatedFiles);
  };

  return (
    <div className={styles.container}>
      <Text className={styles.header}>Select Files</Text>
      <div className={styles.fileList}>
        {files.map((file, i) => (
          <div className={styles.fileItem} key={i}>
            <Text>{file.name}</Text>
            <Checkbox
              checked={file.selected || false}
              onChange={() => handleCheckboxChange(i)}
            />
          </div>
        ))}
      </div>
      <Button
        appearance="primary"
        className={styles.button}
        size="large"
        onClick={() => setIsAuthenticated("Sheets")}
      >
        Next
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state, 99999);
  return {
    state: state.state,
  };
};

export default connect(mapStateToProps, {})(SelectFiles);
