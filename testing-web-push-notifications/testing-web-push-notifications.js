const webpush = require('web-push');
const vapidKeys = require('./web-push-notification-secret');

/* ==> PASTE OWN 'GCMapiKey' FROM GOOGLE CONSOLE */
const GCMapiKey = "AIzaSyBNmo3DGk_mrJzV_39HE6csGo8sdfw6d28";

webpush.setGCMAPIKey(GCMapiKey);
webpush.setVapidDetails(
  'mailto:vipul@circle.news',
  vapidKeys.public,
  vapidKeys.private
);

/* ==> PUSH MESSAGE OBJECT <== */
let obj = {
  title: 'TITLE NOTIFICATION',
  body: 'NOTIFICATION BODY',
  tag: 'NOTIFICATION TAG',
  image: 'IMAGE URL WITH EXTENSION',
  icon: 'ICON URL WITH EXTENSION',
  vibrate: [100,200,100], // <== CHANGE THIS VIBRATION ARRAY ACCORDINGLY
  openUrl: 'URL TO BE OPENED ON CLICK OF NOTIFICATION',
}

let pushSubscription = [

  // SAMPLE SUBSCRIPTION OBJECT <== SAVED IN LOCAL STORAGE IN BROWSER, HERE IT IS ARRAY OF SUCH OBJECTS TO SEND PUSH MESSAGES
  {"endpoint":"https://fcm.googleapis.com/fcm/send/cPFKr-m15N0:APA91bGUSzR-voGPWm4xn78ReSsOyhkVdemEMJWDiGPXwq0ZcGI0PyK69DWe_hyNm6EXNJnkaOtuBy_uLJz6OWEw8RfKP0YqRBMgb3QE7pboX8xgRnnc2dVA-fYAKojM1ZwArIB6ve-H","expirationTime":null,"keys":{"p256dh":"BFshpdmqiRnMMwdyQMdGgTNDlTxdle-2aR7522v5_pMXf8W-gKAQcoT_u6DiaLoO7k3hErnpnGyfkurYiF_2aW4","auth":"KpIRpDOV_Ys9n-EUiqX_MQ"}},

];

for(let i=0;i!=pushSubscription.length;++i){
  
  // RETURN PROMISE
  webpush.sendNotification(pushSubscription[i], JSON.stringify(obj)).then(function(result){
    console.log(`Subscription ${i++} : SUCCESS`);
  }, function(error){
    console.log(`Subscription ${i++} : FAILURE`);  
  });
}