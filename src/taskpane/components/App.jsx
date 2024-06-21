import { Button, makeStyles } from "@fluentui/react-components";
import { DesignIdeas24Regular, LockOpen24Regular, Ribbon24Regular } from "@fluentui/react-icons";
import * as React from "react";
import { connect } from "react-redux";
import insertText from "../office-document";
import Header from "./Header";
import SelectFiles from "./SelectFiles";
import SelectSheets from "./SelectSheets";
import TextInsertion from "./TextInsertion";
import { readExcelFiles } from "../ReadFiles";
import { getExcelSheets } from "../ReadFiles";
// import "../../css/test.css";
import { SET_STATE } from "../../redux/actions";
import { userPool, client } from "./aws-exports";
import Login from "./Login";
const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = ({ title, section, state, defaultState }) => {
  const [loading, setLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState("Login");

  React.useEffect(() => {
    const checkAuth = async () => {
      const user = userPool.getCurrentUser();
      // user.signOut();
      if (user) {
        user.getSession(async (err, session) => {
          if (err || !session.isValid()) {
            dispatch({ type: SET_STATE, payload: "Login" });
            setIsAuthenticated("Login");

            console.log(err, !session.isValid(), 200);
            // history.push("/login"); // Redirect to login if not authenticated
          } else {
            setIsAuthenticated("Home");
            dispatch({ type: SET_STATE, payload: "" });
            console.log(session, 1000);
            try {
              const input = {
                // UserPoolId: process.env.REACT_APP_API_POOLID,
                GroupName: session["accessToken"].payload["cognito:groups"][0],
              };
              // const command = new ListUsersInGroupCommand(input);

              // const response = await client.send(command);
              // console.log(response);
              // dispatch({ type: "GET_USERS", payload: response });
              // fetchData(session.idToken.jwtToken);
            } catch (error) {
              console.error("Error listing users:", error);
            }
            // dispatch({ type: "SESSION_DATA", payload: session });
          }
          setLoading(false);
        });
        user.getUserAttributes((err, attributes) => {
          if (err) {
            console.log(err);
          } else {
            console.log(attributes);
            // dispatch({ type: "GET_USERS", payload: attributes });
          }
        });
        user.getUserData((err, data) => {
          if (err) {
            console.log(err);
          } else {
            // console.log(data, 1);
          }
        });
      } else {
        setIsAuthenticated("Login");
        // history.push("/login"); // Redirect to login if not authenticated
        setLoading(false);
      }
    };

    checkAuth();
  }, []);
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
    console.log(isAuthenticated, 98);
    switch (isAuthenticated) {
      case "Sheets":
        return <SelectSheets setIsAuthenticated={setIsAuthenticated} />;
      case "Login":
        return <Login />;
      default:
        return state.length === 0 ? (
          <>
            <Header logo="assets/logo-filled.png" title={title} message="Welcome" />
            <TextInsertion setIsAuthenticated={setIsAuthenticated} />
            {/* <Login /> */}
          </>
        ) : (
          <>
            <Header logo="assets/logo-filled.png" title={title} message="Select files" />
            <SelectFiles setIsAuthenticated={setIsAuthenticated} />
            {/* <Login /> */}
          </>
        );
    }
  };
  return (
    <div className={styles.root}>
      {checkState()}
      {/* <p className="Test">Hello</p> */}
      {/* <Button appearance="primary" m disabled={false} size="large" onClick={() => getExcelSheets(state[0])}>
        Test Range Selection
      </Button> */}
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
