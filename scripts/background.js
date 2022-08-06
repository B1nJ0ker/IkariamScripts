/*
Log that we received the message.
Then display a notification. The notification contains the URL,
which we read from the message.
*/
function notify(n) {

    browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.extension.getURL("icons/prefeito.png"),
        "title": n.title,
        "message": n.msg,
    });
}
  
  /*
  Assign `notify()` as a listener to messages from the content script.
  */
  browser.runtime.onMessage.addListener(notify);