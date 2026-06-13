// Firebase C & C Distribuidora - v74
// Este arquivo é carregado antes do assets/app.js
window.CEC_FIREBASE_CONFIG = {
  apiKey: "AIzaSyCgpovM_p83K_IDwrN385M5JknW4LN6ZNw",
  authDomain: "lojacecdistribuidora.firebaseapp.com",
  projectId: "lojacecdistribuidora",
  storageBucket: "lojacecdistribuidora.firebasestorage.app",
  messagingSenderId: "405360507397",
  appId: "1:405360507397:web:78ced6eb3b1cb64cff7a6c",
  measurementId: "G-CVEVZQXCX2"
};

(function(){
  try{
    if(typeof firebase === "undefined"){
      window.CEC_FIREBASE_READY = false;
      window.CEC_FIREBASE_ERROR = "SDK Firebase não carregou.";
      return;
    }

    if(!firebase.apps || !firebase.apps.length){
      firebase.initializeApp(window.CEC_FIREBASE_CONFIG);
    }

    window.CEC_FIREBASE_APP = firebase.app();
    window.CEC_DB = firebase.firestore();
    if(firebase.auth){
      window.CEC_AUTH = firebase.auth();
    }
    window.CEC_FIREBASE_READY = true;

    try{
      if(firebase.analytics && location.protocol === "https:"){
        firebase.analytics();
      }
    }catch(e){
      console.warn("Analytics não iniciado:", e);
    }
  }catch(err){
    console.error("Erro ao iniciar Firebase:", err);
    window.CEC_FIREBASE_READY = false;
    window.CEC_FIREBASE_ERROR = err && err.message ? err.message : String(err);
  }
})();
