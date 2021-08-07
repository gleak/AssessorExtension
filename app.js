console.log("Load");

const controller = new ExtensionSeleniumController('{a6fd85ed-e919-4a43-a5af-8da18bda539f}'); //Firefox KEY
controller.activateListenerHealth();

const view = new ExtensionSeleniumView(controller);

document.addEventListener('keydown',(event)=>{
  let name = event.key;
  switch(name){
    case "F8":
      openModalPO();
    break;
    case "F4":
      stopRecordingPO();
    break;
    default:
      console.log(name);
  }
  
},false);

function openModalPO(){
  let checkRecording = document.getElementById('selenium-ide-indicator');
  if(checkRecording==null){
    alert("La registrazione non è attiva!");
    return;
  }  
  view.openModal();
}

function stopRecordingPO(){
	controller.stopRecordPO();
}

console.log("Init Complete");
  