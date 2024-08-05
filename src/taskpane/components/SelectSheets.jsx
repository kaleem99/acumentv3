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

const SelectSheets = ({ files, sheets, defaultState, session }) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  console.log("files state 97 97");
  console.log(files, session);
  const handleSubmit = async () => {
    // e.preventDefault();
    console.log(files, 70);
    if (files.length > 25) {
      alert("Upload attempt exceeds limit of 25 files.");
      return;
    }

    const fileData = await Promise.all(
      Array.from(files).map(async (file) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = (event) => {
            const base64File = event.target.result.split(",")[1];
            resolve({ file: base64File, file_name: file.name });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );

    const body = { documents: fileData };

    try {
      const response = await fetch("https://jms1n3u7yl.execute-api.eu-west-1.amazonaws.com/prod/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.idToken.jwtToken}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("Files uploaded successfully:", await response.json());
      } else {
        const errorData = await response.json();
        console.error("File upload failed:", errorData);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };
  return (
    <div className={styles.container}>
      <img src={logo} alt="Acumen Logo" className={styles.logo} />
      <h2 className={styles.header}>Select File Sheets</h2>
      <div className={styles.textPromptAndInsertion}>
        <Slideshow state={files} />

        {files.map((file, i) => {
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

        <Button appearance="primary" size="large" onClick={() => handleSubmit()}>
          Upload Files
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    files: state.state,
    sheets: state.sheets,
    defaultState: state,
    session: state.session,
  };
};

export default connect(mapStateToProps, {})(SelectSheets);
