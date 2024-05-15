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
      console.log("rows: ", range.values);
      console.log("Column names:", columnNames);
      const extractedData = [];

      // Iterate through the keys of the invoice data object
      Object.keys(invoiceData).forEach((key) => {
        const columnData = invoiceData[key];

        // Check if the column name exists in the columnNamesToCheck array
        if (columnNames.includes(columnData.v)) {
          // Push the column name and its corresponding value to the extractedData array
          extractedData.push({ [columnData.v]: columnData.w });
        }
      });

      // Display the extracted data
      console.log("Extracted data:", extractedData);
      // Update the fill color of the selected range to yellow
      range.format.fill.color = "yellow";

      // Autofit columns for better visibility
      range.format.autofitColumns();

      return context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
};

export default insertText;
