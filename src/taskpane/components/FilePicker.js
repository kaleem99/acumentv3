import React, { useState } from "react";

const FileUpload = ({ session }) => {
  const [files, setFiles] = useState([]);
  console.log("File Session FilePicker");
  console.log(session);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div style={{ width: "300px", height: "400px" }}>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        <button style={{ color: "black", fontSize: "30px" }} type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
