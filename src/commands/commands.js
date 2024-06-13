/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global Office */

Office.onReady(() => {
  // If needed, Office.js is ready to be called.
  Office.ribbon.requestUpdate({
    tabs: [
      {
        id: "CustomTab.acumentv3", // Match the id from the manifest
        groups: [
          {
            id: "CustomGroup.acumentv3", // Match the id from the manifest
            controls: [
              {
                id: "TaskpaneButton",
                visible: false,
              },
              {
                id: "Button2",
                visible: true,
              },
            ],
          },
        ],
      },
    ],
  });
});

/**
 * Function to be called when Button2 is clicked.
 * @param event {Office.AddinCommands.Event}
 */
function actionButton2(event) {
  Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    sheet.getRange("A1").values = [["Button2 clicked!"]];
    await context.sync();
  }).catch((error) => {
    console.error(error);
  });

  // Indicate when the function is complete
  event.completed();
}

/**
 * Shows a notification when the add-in command is executed.
 * @param event {Office.AddinCommands.Event}
 */
function action(event) {
  const message = {
    type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
    message: "Performed action.",
    icon: "Icon.80x80",
    persistent: true,
  };

  // Show a notification message.
  Office.context.mailbox.item.notificationMessages.replaceAsync("ActionPerformanceNotification", message);

  // Be sure to indicate when the add-in command function is complete.
  event.completed();
}

// Register the function with Office.
Office.actions.associate("action", action);
Office.actions.associate("actionButton2", actionButton2);
