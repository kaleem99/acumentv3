import { Button, makeStyles } from "@fluentui/react-components";
// import { DesignIdeas24Regular, LockOpen24Regular, Ribbon24Regular } from "@fluentui/react-icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import insertText from "../office-document";

import Header from "./Header";
import SelectFiles from "./SelectFiles";
import SelectSheets from "./SelectSheets";
import TextInsertion from "./TextInsertion";
import { readExcelFiles } from "../ReadFiles";
import { getExcelSheets } from "../ReadFiles";
// import "../../css/test.css";
import { SET_STATE, SET_CREDITS, SET_SESSION } from "../../redux/actions";
import { userPool, client } from "./aws-exports";
import Login from "./Login";
import SideMenu from "./SideMenu";
import FileUpload from "./FilePicker";
const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = ({ title, section, state, defaultState, session }) => {
  const [loading, setLoading] = React.useState(true);
  // const [isAuthenticated, setIsAuthenticated] = React.useState("Login");
  const [isAuthenticated, setIsAuthenticated] = React.useState("Login");

  const dispatch = useDispatch();
  React.useEffect(() => {
    Office.onReady((info) => {
      if (info.host === Office.HostType.Excel) {
        console.log("Office is ready");
        let x = document.getElementById("AddinControl2");
        console.log(x, 33);
      }
    });
  }, []);
  const handleButtonClick = () => {
    console.log("Extract button clicked in React");
    window.actionButton2(); // Call the global function if needed
  };

  React.useEffect(() => {
    console.log(state, "STATE", 46, defaultState);
    // fetch("https://uh3wulfyxd.execute-api.eu-west-1.amazonaws.com/prod/tenant/{tenantid}/balance", {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //       }
    //       return response.json();
    //     })
    const fetchData = async (token, group) => {
      console.log(token, group, "TOKEN AND GROUP");
      fetch(`https://uh3wulfyxd.execute-api.eu-west-1.amazonaws.com/prod/tenant/${group}/balance`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          dispatch({ type: SET_CREDITS, payload: data.tenantBalance });
          // console.log(data, "UNIQUE_ID_++", data.filter((obj) => obj.tenantId === group)[0].tenantBalance);
          console.log(data, 76, 76);
        })
        .catch((error) => console.error("Error:", error));
    };
    const checkAuth = async () => {
      const user = userPool.getCurrentUser();
      // user.signOut();
      // *** check if user is logged in ****
      if (user) {
        user.getSession(async (err, session) => {
          if (err || !session.isValid()) {
            dispatch({ type: SET_STATE, payload: "Login" });
            setIsAuthenticated("Login");

            console.log(err, !session.isValid(), 200);
            // history.push("/login"); // Redirect to login if not authenticated
          } else {
            setIsAuthenticated("Home");
            // console.log(9999, session.idToken.jwtToken);
            console.log(session, "SESSION_NEW");
            let group = session.accessToken.payload["cognito:groups"][0];
            console.log(group, "GROUP_100", session.idToken["payload"]);
            // await fetchData(session.idToken.jwtToken, group);
            dispatch({ type: SET_STATE, payload: "" });
            dispatch({ type: SET_SESSION, payload: session });
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
    let x = document.querySelectorAll("button");
    let newX = document.getElementById("AddinControl2");

    console.log("Buttons below", x, newX);
  }, []);
  const styles = useStyles();
  // const [state, setState] = React.useState([]);
  // const [section, setSection] = React.useState("");
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.
  // const listItems = [
  //   {
  //     icon: <Ribbon24Regular />,
  //     primaryText: "Achieve more with Office integration",
  //   },
  //   {
  //     icon: <LockOpen24Regular />,
  //     primaryText: "Unlock features and functionality",
  //   },
  //   {
  //     icon: <DesignIdeas24Regular />,
  //     primaryText: "Create and visualize like a pro",
  //   },
  // ];
  const checkState = () => {
    console.log(isAuthenticated, 98);
    switch (isAuthenticated) {
      case "Sheets":
        return <SelectSheets setIsAuthenticated={setIsAuthenticated} />;
      case "Login":
        return <Login setIsAuthenticated={setIsAuthenticated} />;
      default:
        return state.length === 0 ? (
          <>
            <Header logo="assets/Acumen.png" title={title} message="Welcome" />
            <TextInsertion setIsAuthenticated={setIsAuthenticated} />
            {/* <Login /> */}
          </>
        ) : (
          <>
            <Header logo="assets/Acumen.png" title={title} message="Select files" />
            <SelectFiles setIsAuthenticated={setIsAuthenticated} />
            {/* <Login /> */}
          </>
        );
    }
  };
  return (
    <div className={styles.root}>
      <SideMenu />
      {checkState()}
      {/* {console.log("SESSION", session)}
      {session && <FileUpload session={session} />} */}
      {/* <SelectFiles setIsAuthenticated={setIsAuthenticated} />      <p className="Test">Hello</p> */}
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
    session: state.session,
  };
};

export default connect(mapStateToProps, {})(App);
