class ExtensionSeleniumView{
    constructor(controller){
        this.controller = controller;
        this.uniqueId = "modal_"+this.generateGuid();        
        this.__injectView();
        this.__addListener();
    }

    generateGuid(){
        let result = this.generateFourUniqueValue(2);
        for(let i=1;i<4;i++) 
            result+="-"+this.generateFourUniqueValue(2);        
        return result;
    }

    generateFourUniqueValue(sequeneOf4){
        let result = "";
        for(let i=0;i<sequeneOf4;i++){
            result += Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return result;
    }

    
    checkFields(){
        let pageObj =  this.__val(this.__getIdPageObject());
        let pageMethod = this.__val(this.__getIdPageMethod());
        if(pageObj.trim().length==0){
            alert("Page Object empty!");
            return false;
        }
        if(pageMethod.trim().length==0){
            alert("Page Method empty!");
            return false;
        }
        return true;
    }

    openModal(){
        let that = this;
        this.controller.getCommands().then( res=>{
            that.controller.setStartingCommands(res);
            that.__el(that.__getIdModal()).style.display = 'block';
        });   
    }

    clearModal(){
        this.__el(this.__getIdPageObject()).value = "";
        this.__el(this.__getIdPageMethod()).value = "";
    }

    closeModal(clearCommands){
        if(clearCommands){
            this.controller.clearCommandFromStartingPoint();
        }
        this.__el(this.__getIdModal()).style.display = 'none';
    }

    __getIdModal(){
        return this.uniqueId+"_modal";
    }

    __getIdClose(){
        return this.uniqueId+"_close";
    }

    __getIdPageObject(){
        return this.uniqueId+"_pageObject";
    }

    __getIdPageMethod(){
        return this.uniqueId+"_method";
    }

    __getIdBtnConfirm(){
        return this.uniqueId+"_confirm";
    }

    __getIdBtnCancel(){
        return this.uniqueId+"_cancel";
    }

    __injectView(){        
        document.body.innerHTML +=  `
        <div id="${this.__getIdModal()}" class="seleniumExtension-modal" style='display:none'>        
            <div class="seleniumExtension-modal-content">
                <span class="seleniumExtension-close" id="${this.__getIdClose()}">&times;</span>
                <h5>Extension PO</h5>
            
                <div class='seleniumExtension-col-12'>
                    <label for='${this.__getIdPageObject()}'>Page Object</label>
                    <input type='text' class='seleniumExtension-form-control' id='${this.__getIdPageObject()}'>
                </div>
                <div class='seleniumExtension-col-12'>
                    <label for='${this.__getIdPageMethod()}'>Method Name</label>
                    <input type='text' id='${this.__getIdPageMethod()}' class='seleniumExtension-form-control'>
                </div>    
                <br>
                <div class='text-center'>
                    <input type='button' class='seleniumExtension-btn seleniumExtension-btn-success' id='${this.__getIdBtnConfirm()}' value='Confirm'>
                    &nbsp;&nbsp;
                    <input type='button' class='seleniumExtension-btn seleniumExtension-btn-danger' id='${this.__getIdBtnCancel()}' value='Cancel'>
                </div>
            </div>
        </div>`;
    }

    __el(id){
        return document.getElementById(id);
    }

    __val(id){
        return document.getElementById(id).value;
    }

    __addListener(){
        let that = this;
        console.log("Apply Listener");

        this.__el(this.__getIdClose()).addEventListener("click",function(){
            that.clearModal();
            that.closeModal(true);
        });

        this.__el(this.__getIdBtnCancel()).addEventListener("click",function(){
            that.clearModal();
            that.closeModal(true);
        });

        this.__el(this.__getIdBtnConfirm()).addEventListener("click",function(){
            if(!that.checkFields()) 
                return;            
            that.controller.recordPO(
                that.__val(that.__getIdPageObject()).trim(),
                that.__val(that.__getIdPageMethod()).trim()
            );
            that.closeModal(false);
        });
    }

}