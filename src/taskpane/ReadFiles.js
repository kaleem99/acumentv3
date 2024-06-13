/* global Excel console */
import * as XLSX from "xlsx";
import { SetFileSheetsContent, SetSheets } from "../redux/actions";
import pdfToText from "react-pdftotext";

function workbook(fileContent) {
  const workbook2 = XLSX.read(fileContent, {
    type: "binary",
  });
  return workbook2;
}
function getSheets(workbook2) {
  const sheetNames = Object.keys(workbook2.Sheets);
  for (let i = 0; i < sheetNames.length; i++) {
    let obj = {};
    obj.name = sheetNames[i];
    obj.selected = false;
    sheetNames[i] = obj;
  }
  return sheetNames;
}

async function getExcelSheets(file, dispatch) {
  // console.log(file, 5, e.target.checked);
  if (!Promise.allSettled) {
    Promise.allSettled = function (promises) {
      return Promise.all(
        promises.map((p) =>
          Promise.resolve(p).then(
            (value) => ({ status: "fulfilled", value }),
            (reason) => ({ status: "rejected", reason })
          )
        )
      );
    };
  }

  try {
    // const fileContent = await extractText();
    await Excel.run(async (context) => {
      const worksheet = context.workbook.worksheets.getActiveWorksheet();
      const range = worksheet.getRange("F2"); // Specify the target range for import

      // Import file content into Excel
      // range.insertText(fileContent, "values");
      range.values = "Hello";
      // console.log(fileContent);
      // const workbook2 = workbook(fileContent);
      // const formattedContent = formatFileContent(fileContent); // Example formatting function
      // const sheetNames = getSheets(workbook2);
      // file.sheets = sheetNames;
      // await dispatch(SetSheets(file));

      // console.log(sheetNames);
      // console.log(workbook2.Sheets[sheetNames]);
      pdfToText(file)
        .then((text) => console.log(text))
        .catch((error) => console.error("Failed to extract text from pdf"));
      pdfToText(file)
        .then((text) => {
          const lines = text.split("\n"); // Assuming each line represents a key-value pair
          const jsonObject = {};

          lines.forEach((line) => {
            const [key, value] = line.split(":").map((str) => str.trim()); // Assuming key-value pairs are separated by ":"
            jsonObject[key] = value;
          });

          return jsonObject;
        })
        .then((jsonObject) => console.log(jsonObject))
        .catch((error) => console.error("Failed to extract text from pdf"));
      await context.sync();
      console.log("File imported successfully.");
      // console.log(fileContent, 43);
    });
  } catch (error) {
    console.log("Error:", error);
  }
}
async function getFileContent(file) {
  const fileContent = await readFileAsBinaryString(file);
  return fileContent;
}
async function readExcelFiles(file, sheetName, dispatch) {
  try {
    const fileContent = await getFileContent(file);
    await Excel.run(async (context) => {
      const worksheet = context.workbook.worksheets.getActiveWorksheet();
      const range = worksheet.getRange("F2"); // Specify the target range for import

      // Import file content into Excel
      // range.insertText(fileContent, "values");
      // range.values = "Hello";
      // console.log(fileContent);
      // const workbook2 = workbook(fileContent);

      // const formattedContent = formatFileContent(fileContent); // Example formatting function
      // const sheetNames = getSheets(workbook2);
      // console.log(sheetNames);
      context.sync();
      // console.log(range.values);
      // console.log(workbook2.Sheets[sheetName]);

      await context.sync();
      console.log("File imported successfully.");
      // dispatch(SetFileSheetsContent(workbook2.Sheets[sheetName], sheetName, file.name));
      console.log(fileContent, "filecontent");
      return fileContent;
    });
  } catch (error) {
    console.log("Error:", error);
  }
}
function readFileAsBinaryString(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsBinaryString(file);
  });
}

export { getExcelSheets, readExcelFiles };
