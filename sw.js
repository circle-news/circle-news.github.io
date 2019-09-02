// THE URL RECIEVED IN 'PUSH NOTIFICATION DATA' WHICH IS TO BE OPENED
// ON THE CLICK OF NOTIFICATION
let openUrl = "";

// DATA RECIEVED FROM PUSH EVENT
self.addEventListener('push', function(event) {
    
    if (event.data){    
      // THE DATA COMES FROM THE SERVER AS JSON
      let jsonData = event.data.text();

      // JSON PARSE
      let objData = JSON.parse(jsonData);

      notificationOptions = {
        body: objData.body,
        tag: objData.tag,
        icon: objData.icon,
        image: objData.image,
      }

      // SET THE LINK FOR ON CLICK EVENT OF NOTICATION
      openUrl = objData.openUrl;

      // DISPLAY THE NOTIFICATION
      self.registration.showNotification(objData.title, notificationOptions);
    }
    else{
      console.log('[SW] The Push event had no data');
    }
});

// NOTIFICATION CLICK
self.addEventListener('notificationclick', function(event) {
  
  // OPEN THE 
  clients.openWindow(openUrl);
  
  // CLOSE NOTIFICATION (FOR ANDROID)
  event.notification.close();
});