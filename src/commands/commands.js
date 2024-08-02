Office.onReady((info) => {
  if (info.host === Office.HostType.Excel) {
    // Office is ready
    console.log("Office is ready and manifest");
    let x = document.getElementById("AddinControl2");
    console.log(x, 810);
    function actionButton2(event) {
      // Perform your action here
      console.log("Hello Adam");
      Excel.run(function (context) {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const range = sheet.getRange("A1");
        range.values = [["Hello World"]];
        return context.sync();
      }).catch(function (error) {
        console.log(error);
      });

      // Indicate when the add-in command function is complete
      event.completed();
    }
  }
});
