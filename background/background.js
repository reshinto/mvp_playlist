const contextMenuMainItem = {
  "id": "addNewVideo",
  "title": "Add Video",
  "contexts": ["all"],
};

chrome.contextMenus.create(contextMenuMainItem);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  localStorage.setItem("title", tab.title);
  localStorage.setItem("video_link", tab.url);
  // window.location.reload();
});

chrome.browserAction.onClicked.addListener(tab => {
  if (!window.opener) {
    window.open(
      "index.html",
      "popUpWindow",
      `height=550,width=400,left=${window.screen.width -
        500},top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes`,
    );
  }
});

// chrome.runtime.onMessage.addListener(function(req, sender, res) {
//   if (req.message == "openWindow") {
//     console.log(req.message)
//     openCustomWindow();
//   }
// });

// function openCustomWindow() {
//   var winObj = {
//     url: chrome.runtime.getURL("index.html"),
//     width: 600,
//     height: 600,
//     left: Math.round(window.innerWidth / 2 - 400 / 2),
//     top: Math.round(window.innerHeight / 2 - 400 / 2),
//     focused: true,
//     type: "normal",
//     state: "normal",
//   };
//   chrome.windows.create(winObj);
// }
