if (typeof browser === "undefined") {
    var browser = chrome;
}
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
  browser.runtime.onMessage.addListener((content)=>{
    if(content.func == 'getCookie'){
        getCookie(content, function(cookieData){
           alert("COOOKIE: "+cookieData)
          })
    }
    if(content.func == 'setCookie'){
        return setCookie(content)
    }
    
  });

  // COOKIES

async function setCookie(content){
    await browser.cookies.set({
        url: content.url,
        name: content.name,
        value: content.value
    });
    return 'o';
}

async function getCookie(content, callback){
    try{
        browser.cookies.get(
            {url: content.url, name: content.name},
            function(data){
                callback(data);
            }
        );
        

    }
    catch(err){
        alert(err)
    }
}