/* global Excel console */

const insertText = async (invoiceData) => {
  // Write text to the top left cell.
  try {
    Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      // const range = sheet.getRange("A2:A10");
      // range.values = [[text], [text], [text], [text], [text], [text], [text], [text], [text]];
      // range.getCell(0, 1).values = [["Selected"]];
      const range = context.workbook.getSelectedRange();
      range.load(["values"]);

      // Synchronize to retrieve the values
      await context.sync();

      // Get the values from the first row of the selected range
      const firstRowValues = range.values[0];
      // console.log(range.values);
      range.load(["valueTypes"]);
      await context.sync();

      console.log(range.valueTypes);
      // Extract column names from the first row values
      const columnNames = firstRowValues.map((value) => value.toString());
      const x = range.values.shift();
      range.values = [[10], [20], [30]];
      console.log("rows: ", range.values);
      console.log("Column names:", columnNames);
      const extractedData = [];

      // Iterate through the keys of the invoice data object
      // Object.keys(invoiceData).forEach((key) => {
      //   const columnData = invoiceData[key];

      //   // Check if the column name exists in the columnNamesToCheck array
      //   if (columnNames.includes(columnData.v)) {
      //     // Push the column name and its corresponding value to the extractedData array
      //     extractedData.push({ [columnData.v]: columnData.w });
      //   }
      // });

      // Display the extracted data
      console.log("Extracted data:", extractedData);
      // Update the fill color of the selected range to yellow
      // range.format.fill.color = "yellow";

      // Autofit columns for better visibility
      range.format.autofitColumns();

      return context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
};
function actionFunction(event) {
  // Perform your action here
  Excel.run(function (context) {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    const range = sheet.getRange("A1");
    console.log("action Button", 1000000);
    range.values = [["Hello World"]];
    return context.sync();
  }).catch(function (error) {
    console.log(error);
  });

  // Indicate when the add-in command function is complete
  event.completed();
}
export default insertText;
// pdf, jpeg, jpg, png

// npm run start:web -- --document 'https://onedrive.live.com/edit?action=editnew&id=5385D7DE29463E8C!357772&resid=5385D7DE29463E8C!357772&ithint=file,xlsx&ct=1714556500994&wdNewAndOpenCt=1714556500140&wdOrigin=OFFICECOM-WEB.START.NEW&wdPreviousSessionSrc=HarmonyWeb&wdPreviousSession=f0c0dcc1-3c26-4a64-a41c-3492ecc970cb&wdo=2&cid=5385d7de29463e8c&wdaddindevserverport=3000&wdaddinmanifestfile=manifest.xml&wdaddinmanifestguid=f133859a-dcc5-4ed5-b576-259a194f2078'
