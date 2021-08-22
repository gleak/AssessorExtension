let __SeleniumIDEExtController = null;
let __SeleniumIDEView = null;

console.log("Selenium IDE Script loaded");

document.addEventListener('keydown',(event)=>{
  let name = event.key;
  switch(name){
    case "F8":
      openModalPO();
    break;
    case "F4":
      stopRecordingPO();
    break;   
  }  
},true);


function openModalPO(){  
  let checkRecording = document.getElementById('selenium-ide-indicator');
  if(checkRecording==null){
    alert("The recording is not active!");
    return;
  }  
  checkInitialization();
  __SeleniumIDEView.openModal();
}

function stopRecordingPO(){
  checkInitialization();
  __SeleniumIDEExtController.stopRecordPO();
}

function checkInitialization(){
  if(__SeleniumIDEExtController==null){
    __SeleniumIDEExtController = new ExtensionSeleniumController('{a6fd85ed-e919-4a43-a5af-8da18bda539f}'); //Firefox KEY
    __SeleniumIDEExtController.activateListenerHealth();
  }
  if(__SeleniumIDEView==null){
    __SeleniumIDEView = new ExtensionSeleniumView(__SeleniumIDEExtController);
  }
}