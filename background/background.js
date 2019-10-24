console.log("I am from background script!!");

// const div = document.createElement("div");
// div.setAttribute("id", "player");

// // 2. This code loads the IFrame Player API code asynchronously.
// var tag = document.createElement("script");

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName("script")[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// // 3. This function creates an <iframe> (and YouTube player)
// //    after the API code downloads.
// var player;
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("player", {
//     height: "390",
//     width: "640",
//     videoId: "M7lc1UVf-VE",
//     events: {
//       "onReady": onPlayerReady,
//       "onStateChange": onPlayerStateChange,
//     },
//   });
// }

// // 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//   event.target.playVideo();
// }

// // 5. The API calls this function when the player's state changes.
// //    The function indicates that when playing a video (state=1),
// //    the player should play for six seconds and then stop.
// var done = false;
// function onPlayerStateChange(event) {
//   if (event.data == YT.PlayerState.PLAYING && !done) {
//     setTimeout(stopVideo, 6000);
//     done = true;
//   }
// }
// function stopVideo() {
//   player.stopVideo();
// }

const contextMenuMainItem = {
  "id": "addVideo",
  "title": "Add Video Link",
  "contexts": ["all"],
};

chrome.contextMenus.create(contextMenuMainItem);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  localStorage.setItem("title", tab.title);
  localStorage.setItem("url", tab.url);
  window.location.reload();
});

// chrome.browserAction.onClicked.addListener(tab => {
  // chrome.windows.create({
  //   url: chrome.runtime.getURL("index.html"),
  //   type: "popup",
  //   focused: true,
  // });
  // alert("hihi")
  // window.open(window.location.href,'_blank');

// });

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
