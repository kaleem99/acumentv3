import { Button, makeStyles } from "@fluentui/react-components";
import { DesignIdeas24Regular, LockOpen24Regular, Ribbon24Regular } from "@fluentui/react-icons";
import * as React from "react";
import { connect } from "react-redux";
import insertText from "../office-document";
import Header from "./Header";
import SelectFiles from "./SelectFiles";
import SelectSheets from "./SelectSheets";
import TextInsertion from "./TextInsertion";
const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = ({ title, section, state, defaultState }) => {
  const styles = useStyles();
  // const [state, setState] = React.useState([]);
  // const [section, setSection] = React.useState("");
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.
  const listItems = [
    {
      icon: <Ribbon24Regular />,
      primaryText: "Achieve more with Office integration",
    },
    {
      icon: <LockOpen24Regular />,
      primaryText: "Unlock features and functionality",
    },
    {
      icon: <DesignIdeas24Regular />,
      primaryText: "Create and visualize like a pro",
    },
  ];
  const checkState = () => {
    switch (section) {
      case "Sheets":
        return <SelectSheets />;
      default:
        return state.length === 0 ? (
          <>
            <Header logo="assets/logo-filled.png" title={title} message="Welcome" />
            <TextInsertion />
          </>
        ) : (
          <>
            <Header logo="assets/logo-filled.png" title={title} message="Select files" />
            <SelectFiles />
          </>
        );
    }
  };
  return (
    <div className={styles.root}>
      {checkState()}
      <Button
        appearance="primary"
        m
        disabled={false}
        size="large"
        onClick={() => insertText(defaultState.fileContent["Book 4.xlsx"]["Invoice"])}
      >
        Test Range Selection
      </Button>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state, 59);
  return {
    section: state.section,
    state: state.state,
    defaultState: state,
  };
};

export default connect(mapStateToProps, {})(App);
