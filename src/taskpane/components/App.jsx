import { makeStyles } from "@fluentui/react-components";
// import { DesignIdeas24Regular, LockOpen24Regular, Ribbon24Regular } from "@fluentui/react-icons";
import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import Header from "./Header";
import SelectFiles from "./SelectFiles";
import SelectSheets from "./SelectSheets";
import TextInsertion from "./TextInsertion";
// import "../../css/test.css";
import { SET_CREDITS } from "../../redux/actions";
// import { userPool } from "../aws-exports";
// import { getUrl } from "@aws-amplify/storage";

import { getUrl } from "aws-amplify/storage";

import { Authenticator } from "@aws-amplify/ui-react";
// import Login from "./Login";
import SideMenu from "./SideMenu";
import { Amplify } from "aws-amplify";
// import awsconfig from "../aws-exports";
import config from "./config.json";
import { fetchAuthSession } from "@aws-amplify/auth";

const REGION = "eu-west-1";
const userPoolId = "eu-west-1_dEIVZDohi";
const ClientId = "4vh1o9t9fb6qqceba5nt9bm3oj";
const identityPoolId = "eu-west-1:842387ba-0984-4dbd-ae86-9da6310b6460";
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "eu-west-1_dEIVZDohi",
      userPoolClientId: "4vh1o9t9fb6qqceba5nt9bm3oj",
      identityPoolId: "eu-west-1:831a7d21-17e9-443e-860a-b98b9e68df4d",
      loginWith: {
        username: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
      },
      allowGuestAccess: false,
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },

  Storage: {
    S3: {
      bucket: "stack-pooled-eu-west-1-625075209381",
      region: "eu-west-1",
    },
  },
});
// const awsconfig = {
//   Auth: {
//     region: REGION,
//     userPoolId: userPoolId,
//     userPoolWebClientId: ClientId,
//     identityPoolId: identityPoolId,
//   },
//   Storage: {
//     AWSS3: {
//       bucket: "stack-pooled-eu-west-1-625075209381",
//       region: REGION,
//     },
//   },
// };

// Amplify.configure(config);
// Amplify.configure({
//   Auth: {
//     Cognito: {
//       userPoolClientId: ClientId,
//       userPoolId: userPoolId,
//       // loginWith: { // Optional
//       //   oauth: {
//       //     domain: 'abcdefghij1234567890-29051e27.auth.us-east-1.amazoncognito.com',
//       //     scopes: ['openid','email','phone','profile','aws.cognito.signin.user.admin'],
//       //     redirectSignIn: ['http://localhost:3000/','https://example.com/'],
//       //     redirectSignOut: ['http://localhost:3000/','https://example.com/'],
//       //     responseType: 'code',
//       //   },
//       //   username: 'true',
//       //   email: 'false', // Optional
//       //   phone: 'false', // Optional
//       // }
//     }
//   }
// });
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
    const testing = async () => {
      try {
        const session = await fetchAuthSession();

        const tokens = session.tokens; // Fetches the AuthTokens object
        const jwtToken = tokens.idToken; // JWT Token
        let accessToken = tokens.accessToken;
        const jwtToken2 = session.tokens.idToken.toString(); // Raw JWT token string

        console.log("JWT Token:", jwtToken.payload);
        console.log("JWT Token2:", jwtToken2);
        dispatch({ type: "SET_SESSION", payload: session.tokens.idToken });
        console.log("ACCESS TOKEN:", accessToken);

        return jwtToken;
      } catch (error) {
        console.error("Error getting JWT token:", error);
      }
      try {
        // const signedUrl = await getUrl({
        //   key: "analyse-expense/1722322129-39a1387e2c-1inv.png",
        // });
        // console.log("File URL:", signedUrl.url.toString());
        // const linkToStorageFile = await getUrl({
        //   path: "analyse-expense/1723035041-19782ebc88-invoice_66.png",
        //   // Alternatively, path: ({identityId}) => `album/{identityId}/1.jpg`
        //   options: {
        //     validateObjectExistence: false,
        //     expiresIn: 20,
        //     useAccelerateEndpoint: true, // Whether to use accelerate endpoint.
        //   },
        // });
        // console.log("signed URL: ", linkToStorageFile.url);
        // console.log("URL expires at: ", linkToStorageFile.expiresAt);
      } catch (error) {
        console.error("Error fetching file URL:", error);
      }
    };
    testing();
    Office.onReady((info) => {
      if (info.host === Office.HostType.Excel) {
        console.log("Office is ready");
        let x = document.getElementById("AddinControl2");
        console.log(x, 33);
      }
    });
  }, [isAuthenticated]);
  const handleButtonClick = () => {
    console.log("Extract button clicked in React");
    window.actionButton2(); // Call the global function if needed
  };
  // const checkAuth = async () => {
  //   const user = userPool.getCurrentUser();
  //   // user.signOut();
  //   // *** check if user is logged in ****
  //   if (user) {
  //     user.getSession(async (err, session) => {
  //       if (err || !session.isValid()) {
  //         dispatch({ type: SET_STATE, payload: "Login" });
  //         setIsAuthenticated("Login");

  //         console.log(err, !session.isValid(), 200);
  //         // history.push("/login"); // Redirect to login if not authenticated
  //       } else {
  //         setIsAuthenticated("Home");
  //         // console.log(9999, session.idToken.jwtToken);
  //         console.log(session, "SESSION_NEW");
  //         let group = session.accessToken.payload["cognito:groups"][0];
  //         console.log(group, "GROUP_100", session.idToken["payload"]);
  //         // await fetchData(session.idToken.jwtToken, group);
  //         dispatch({ type: SET_STATE, payload: "" });
  //         dispatch({ type: SET_SESSION, payload: session });
  //         try {
  //           const input = {
  //             // UserPoolId: process.env.REACT_APP_API_POOLID,
  //             GroupName: session["accessToken"].payload["cognito:groups"][0],
  //           };
  //           // const command = new ListUsersInGroupCommand(input);

  //           // const response = await client.send(command);
  //           // console.log(response);
  //           // dispatch({ type: "GET_USERS", payload: response });
  //           // fetchData(session.idToken.jwtToken);
  //         } catch (error) {
  //           console.error("Error listing users:", error);
  //         }
  //         // dispatch({ type: "SESSION_DATA", payload: session });
  //       }
  //       setLoading(false);
  //     });
  //     user.getUserAttributes((err, attributes) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log(attributes);
  //         // dispatch({ type: "GET_USERS", payload: attributes });
  //       }
  //     });
  //     user.getUserData((err, data) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         // console.log(data, 1);
  //       }
  //     });
  //   } else {
  //     setIsAuthenticated("Login");
  //     // history.push("/login"); // Redirect to login if not authenticated
  //     setLoading(false);
  //   }
  // };
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

    // checkAuth();
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
      // case "Login":
      //   return <Login setIsAuthenticated={setIsAuthenticated} />;
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
    <Authenticator>
      {({ signOut, user }) => (
        <div className={styles.root}>
          <SideMenu signOut={signOut} />
          {console.log(user, "USER")}
          {checkState()}
          {/* <StorageImage alt="invoice" path="analyse-expense/1722322129-39a1387e2c-1inv.png" /> */}
          {/* <StorageManager path="analyse-expense" maxFileCount={3} /> */}
          {/* <StorageImage alt="sleepy-cat" path={"analyse-expense/1722322129-39a1387e2c-1inv.png"} /> */}
          {/* {console.log("SESSION", session)}
      {session && <FileUpload session={session} />} */}
          {/* <SelectFiles setIsAuthenticated={setIsAuthenticated} />      <p className="Test">Hello</p> */}
          {/* <Button appearance="primary" m disabled={false} size="large" onClick={() => getExcelSheets(state[0])}>
        Test Range Selection
      </Button> */}
        </div>
      )}
    </Authenticator>
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
