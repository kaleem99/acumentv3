import { makeStyles } from "@fluentui/react-components";
import { BookTheta20Regular, DismissCircle20Regular } from "@fluentui/react-icons";
import React, { useState } from "react";
import { userPool } from "../aws-exports";

const useStyles = makeStyles({
  burgerIcon: {
    position: "fixed",
    top: "15px",
    left: "15px",
    cursor: "pointer",
    zIndex: 1001,
  },
  sideMenu: {
    position: "fixed",
    top: 0,
    left: "-250px",
    width: "250px",
    height: "100%",
    backgroundColor: "#333",
    color: "#fff",
    paddingTop: "60px",
    transition: "left 0.3s ease",
    zIndex: 1000,
  },
  sideMenuOpen: {
    left: 0,
  },
  ul: {
    listStyle: "none",
    padding: 0,
  },
  li: {
    padding: "20px 10px",
  },
  a: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const SideMenu = ({ signOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const styles = useStyles();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.burgerIcon} onClick={toggleMenu}>
        {isOpen ? <DismissCircle20Regular color="white" size={30} /> : <BookTheta20Regular size={30} />}
      </div>
      <div className={`${styles.sideMenu} ${isOpen ? styles.sideMenuOpen : ""}`}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <a href="#import-files" className={styles.a}>
              Import Files
            </a>
          </li>
          <li className={styles.li}>
            <a href="#extract-home" className={styles.a}>
              Extract Home
            </a>
          </li>
          <li
            onClick={() => {
              // userPool.getCurrentUser().signOut();
              // window.location.reload();
              signOut();
            }}
            className={styles.li}
          >
            <a href="#signout" className={styles.a}>
              Signout
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideMenu;
