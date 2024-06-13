import React, { useState } from "react";
import { userPool, client, userPoolId } from "./aws-exports";
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const authenticate = (Email, Password, newPassword) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: Email,
      Pool: userPool,
    });
    const authDetails = new AuthenticationDetails({
      Username: Email,
      Password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: async (result) => {
        console.log("Login successful");
        console.log(result);

        // Update email as verified
        try {
          const command = new AdminUpdateUserAttributesCommand({
            UserPoolId: userPoolId,
            Username: Email,
            UserAttributes: [
              {
                Name: "email_verified",
                Value: "true",
              },
            ],
          });

          await client.send(command);
          console.log("Email verified");
          resolve(result);
        } catch (error) {
          console.error("Error verifying email: ", error);
          reject(error);
        }
      },
      onFailure: (err) => {
        console.log("Login failed", err);
        reject(err);
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        // The API requires attributes to be returned, even if they are not used
        delete userAttributes.email_verified;
        delete userAttributes.phone_number_verified;
        resolve({ user, userAttributes, requiredAttributes });
      },
    });
  });
};

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [cognitoUser, setCognitoUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await authenticate(username, password);
      if (result.user) {
        setCognitoUser(result.user);
        setShowNewPassword(true);
      } else {
        setError("");
        console.log("Logged in user:", result);
        window.location.reload();
        // Perform further actions after successful login, e.g., redirect
      }
    } catch (err) {
      console.error("Error logging in", err);
      setError("Error logging in. Please check your username and password.");
    }
  };

  const handleNewPassword = async () => {
    try {
      cognitoUser.completeNewPasswordChallenge(
        newPassword,
        {},
        {
          onSuccess: (result) => {
            console.log("Password changed successfully", result);
            setError("");
            setShowNewPassword(false);
            // Perform further actions after successful password change, e.g., redirect
          },
          onFailure: (err) => {
            console.error("Error setting new password", err);
            setError("Error setting new password. Please try again.");
          },
        }
      );
    } catch (err) {
      console.error("Error setting new password", err);
      setError("Error setting new password. Please try again.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f7f7f7",
    },
    form: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
      display: "flex",
      flexDirection: "column",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      marginBottom: "1rem",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "1rem",
    },
    button: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "0.75rem",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
      color: "white",
    },
    error: {
      color: "red",
      marginTop: "1rem",
      fontSize: "0.875rem",
      textAlign: "center",
    },
    link: {
      color: "#007bff",
      cursor: "pointer",
      marginTop: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2>Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={styles.input}
        />
        <button
          onClick={handleLogin}
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Login
        </button>
        <a onClick={() => setIsAuthenticated("ForgotPassword")} style={styles.link}>
          Forgot Password
        </a>
        {showNewPassword && (
          <>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              style={styles.input}
            />
            <button
              onClick={handleNewPassword}
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              Set New Password
            </button>
          </>
        )}
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

export default Login;
