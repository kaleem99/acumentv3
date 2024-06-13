import * as React from "react";
import PropTypes from "prop-types";
import { Image, tokens, makeStyles } from "@fluentui/react-components";
import { connect } from "react-redux";
import Slider from "react-slick";
import Slideshow from "./Slideshow";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const useStyles = makeStyles({
  welcome__header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    paddingTop: "100px",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  message: {
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightRegular,
    fontColor: tokens.colorNeutralBackgroundStatic,
  },
});

const Header = (props) => {
  const [state, setState] = React.useState([]);
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      const newState = [...state]; // Create a new state array to avoid mutating the state directly

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = () => {
          let result = "";
          if (file.type === "application/pdf") {
            result = reader.result;
          } else if (file.type.startsWith("image/")) {
            result = reader.result;
          } else {
            console.log("Unsupported file type. Please select a PDF or image file.");
            return; // Exit the function if the file type is unsupported
          }
          newState.push(result); // Add the result to the new state array
          setState(newState); // Update the state
        };

        reader.readAsDataURL(file);
      }
    } else {
      console.log("Please select a file.");
    }
  };
  const { title, logo, message } = props;
  const styles = useStyles();
  // React.useEffect(() => {
  //   if (state.length > 0) {
  //     const fileUrl = URL.createObjectURL(state[0]);
  //     console.log(fileUrl, 27);
  //     setPdfUrl(fileUrl);
  //   }
  // }, [state]);
  // console.log(props, 25);
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     console.log(reader.result, 41);
  //     reader.onload = () => {
  //       let base64String = reader.result.split(",")[1]; // Strip the Base64 prefix
  //       console.log(reader.result);
  //       if (file.type === "application/pdf") {
  //         setPdfBase64(reader.result);
  //       } else if (file.type.startsWith("image/")) {
  //         console.log(reader.result, 48);
  //         setImageBase64(reader.result);
  //       } else {
  //         console.log("Unsupported file type. Please select a PDF or image file.");
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     console.log("Please select a file.");
  //   }
  // };

  return (
    <section className={styles.welcome__header}>
      <Image width="90" height="90" src={logo} alt={title} />
      {/* <input type="file" accept=".pdf, image/*" onChange={handleFileChange} /> */}
      <div>
        <input multiple type="file" accept=".pdf, image/*" onChange={handleFileChange} />
        {/* <div style={{ width: "80%", margin: "auto", textAlign: "center", border: "1px solid" }}>
          <Slider {...settings}>
            {state.map((data) => {
              return (
                <>
                  {data.includes("application") ? (
                    <iframe src={`${data}`} width="600" height="400" title="PDF Viewer"></iframe>
                  ) : (
                    <iframe
                      srcDoc={`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
                    img { max-width: 100%; max-height: 100%; object-fit: contain; }
                  </style>
                </head>
                <body>
                  <img src="${data}" alt="Preview" />
                </body>
                </html>
              `}
                      width="600"
                      height="400"
                      title="Image Viewer"
                    ></iframe>
                  )}
                </>
              );
            })}
          </Slider>
        </div> */}
        <Slideshow state={state} />
      </div>
      <h1 className={styles.message}>{message}</h1>
    </section>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string,
  message: PropTypes.string,
};
const mapStateToProps = (state) => {
  console.log(state, 40);
  return {
    newState: state.state,
  };
};
export default connect(mapStateToProps, {})(Header);
