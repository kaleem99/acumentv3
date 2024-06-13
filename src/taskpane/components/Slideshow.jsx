import React, { useState, useEffect } from "react";

const Slideshow = ({ state }) => {
  const [slideIndex, setSlideIndex] = useState(1);

  const plusSlides = (n) => {
    setSlideIndex((prevIndex) => {
      let newIndex = prevIndex + n;
      if (newIndex > state.length) {
        newIndex = 1;
      } else if (newIndex < 1) {
        newIndex = state.length;
      }
      return newIndex;
    });
  };

  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  const styles = {
    slideshowContainer: {
      maxWidth: "1000px",
      position: "relative",
      margin: "auto",
    },
    prevNext: {
      cursor: "pointer",
      position: "absolute",
      top: "50%",
      width: "auto",
      padding: "16px",
      marginTop: "-22px",
      color: "white",
      fontWeight: "bold",
      fontSize: "18px",
      transition: "0.6s ease",
      borderRadius: "0 3px 3px 0",
      userSelect: "none",
    },
    next: {
      right: "0",
      borderRadius: "3px 0 0 3px",
    },
    text: {
      color: "black",
      fontSize: "15px",
      padding: "8px 12px",
      position: "absolute",
      bottom: "8px",
      width: "100%",
      textAlign: "center",
    },
    numbertext: {
      color: "#f2f2f2",
      fontSize: "12px",
      padding: "8px 12px",
      position: "absolute",
      top: "0",
    },
    dot: {
      cursor: "pointer",
      height: "15px",
      width: "15px",
      margin: "0 2px",
      backgroundColor: "#bbb",
      borderRadius: "50%",
      display: "inline-block",
      transition: "background-color 0.6s ease",
    },
    activeDot: {
      backgroundColor: "#717171",
    },
    fade: {
      animationName: "fade",
      animationDuration: "1.5s",
    },
    fadeKeyframes: `
      @keyframes fade {
        from {opacity: .4} 
        to {opacity: 1}
      }
    `,
  };
  // console.log(state[0].File, 100)
  return (
    <div>
      <style>{styles.fadeKeyframes}</style>
      <div className="slideshow-container" style={styles.slideshowContainer}>
        {state.map((data, index) => {
          const isActive = index + 1 === slideIndex;
          console.log(data, 93);
          console.log(URL.createObjectURL(data), "+++");
          return (
            <div
              className={`mySlides fade ${isActive ? "active" : ""}`}
              style={{ ...styles.fade, display: isActive ? "block" : "none" }}
              key={index}
            >
              <div className="numbertext" style={styles.numbertext}>
                {index + 1} / {state.length}
              </div>
              {data.type.includes("application") ? (
                <iframe
                  src={URL.createObjectURL(data)}
                  width="600"
                  height="400"
                  title="PDF Viewer"
                  style={{ width: "100%" }}
                ></iframe>
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
                      <img src="${URL.createObjectURL(data)}" alt="Preview" />
                    </body>
                    </html>
                  `}
                  width="600"
                  height="400"
                  title="Image Viewer"
                  style={{ width: "100%" }}
                ></iframe>
              )}
              <div className="text" style={styles.text}>
                Caption Text
              </div>
            </div>
          );
        })}

        <a className="prev" onClick={() => plusSlides(-1)} style={styles.prevNext}>
          ❮
        </a>
        <a className="next" onClick={() => plusSlides(1)} style={{ ...styles.prevNext, ...styles.next }}>
          ❯
        </a>
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        {state.map((_, index) => (
          <span
            className={`dot ${index + 1 === slideIndex ? "active" : ""}`}
            onClick={() => currentSlide(index + 1)}
            style={{
              ...styles.dot,
              ...(index + 1 === slideIndex ? styles.activeDot : {}),
            }}
            key={index}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
