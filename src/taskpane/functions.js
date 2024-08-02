Office.onReady((info) => {
  if (info.host === Office.HostType.Excel) {
    // Office is ready
    // alert("Hello World");
    console.log("Are you ready");
    console.log(document.getElementById("AddinControl2"));
  }
});

function actionFunction(event) {
  console.log("Super fragilistic espialodocias");
  // Perform your action here
  //   Excel.run(function (context) {
  //     const sheet = context.workbook.worksheets.getActiveWorksheet();
  //     const range = sheet.getRange("A1");
  //     range.values = [["Hello World"]];
  //     return context.sync();
  //   }).catch(function (error) {
  //     console.log(error);
  //   });

  // Indicate when the add-in command function is complete
  //   event.completed();
}
