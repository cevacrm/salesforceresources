 'use strict';
(function() {
 
 
    var onLoadFunction = function() {
        buildStyle(); 
        setTimeout(function(){
          var x = document.getElementsByClassName("message");  
          var pngUrl = 'https://service-cview.cs88.force.com/service/resource/1591275544000/chatIcon2?';
          if(x.length == 1){
              var msg = x[0].innerHTML;
              if(msg != null && msg == 'Contact Us' ){
                 pngUrl = 'https://service-cview.cs88.force.com/service/resource/1591310016000/formIcon?';
              }
              } 
              buildStyle(pngUrl );
        }, 1000);

    }

   function buildStyle(urlpicture){
        var style = document.createElement('style');
        style.innerHTML = '';
        style.innerHTML = ` .message { display:none;}`;
        style.innerHTML += ` .embeddedServiceHelpButton .embeddedServiceIcon{display:none;} `;
        style.innerHTML += ` .embeddedServiceHelpButton .embeddedServiceIcon::before{display:none;} `;
        style.innerHTML += ` .embeddedServiceHelpButton .helpButton .uiButton { `;
        style.innerHTML += ` border-radius: 50px; min-width: 70px;  height: 70px;  width: 70px; `;
        style.innerHTML += ` background: #ffffff  url(` + urlpicture + `) no-repeat center/contain;background-size: auto;  `   
        style.innerHTML += ` } `;
        style.innerHTML += `.embeddedServiceHelpButton .helpButton .uiButton:focus {outline: 0px solid #ED0404;width: 100%;}`;
        style.innerHTML += `.embeddedServiceHelpButton .helpButton .uiButton:hover {background-color: #ED0404;} `; 
        style.innerHTML += `.embeddedServiceHelpButton .helpButton { position: fixed;height: 77px;bottom: 0;} `; 
        style.innerHTML += `.embeddedServiceHelpButton .helpButton .uiButton { background-color: #ED0404;   font-family: "Arial", sans-serif; }`;
        style.innerHTML +=  `.embeddedServiceHelpButton .helpButton .uiButton:focus {  outline: 1px solid #ED0404; }`;
        document.body.appendChild(style);     
    }




    var initESW = function(gslbBaseURL) {

	//--getButtonId start here--
	 function getButtonId() { 
            var locationData = function () {
                var tmp = null;
                    $.ajax({
                        'async': false,
                        'type': "POST",
                        'global': false,
                        'dataType': 'json',
                        'url': "https://ipinfo.io",
                        'success': function (data) {
                            tmp = data;
                        }
                    });
                    return tmp;
            }(); 
            if (locationData.region!== 'undefined' || locationData.region!== null)  
            {   
                var userRegion = locationData.region;    
            }
            else {
                var userRegion = "";
            }
            if (locationData.country!== 'undefined' || locationData.country!== null)  
            {   
                var userCountry = locationData.country;    
            }
            else{
                var userCountry = ""; 
            }
            
            var userLang = navigator.language || navigator.userLanguage;
                       
            //**********NORTAM Digital CS***************
            var digitalCMH=['Alabama','Connecticut','Delaware','Florida','Georgia','Kentucky','Maine','Maryland','Massachusetts','Mississippi',
            'New Hampshire','New Jersey','New York','North Carolina','Ohio','Pennsylvania','Puerto Rico','Rhode Island','South Carolina',
            'Tennesse','Vermont','Virginia','West Virginia'];
            
            var digitalDFW=['Arkansas','Louisiana','Mexico','New Mexico','Oklahoma','Texas'];
            
            var digitalLAX=['Alaska','Alberta','Arizona','British Columbia','California','Colorado','Hawai','Idaho','Montana','Nevada',
            'Oregon','Saskatchewan','Utah','Washington','Wyoming'];
            
            var digitalORD=['Illinois','Indiana','Iowa','Kansas','Manitoba','Michigan','Minnesota','Missouri','Nebraska','North Dakota',
            'Ontario','Quebec','South Dakota','Wisconsin'];
            
            //**********CHINA Digital CS***************
            var digitalSHA=['Beijing','Tianjin','Hebei','Shanxi','Liaoning','Jilin','Heilongjiang','Shandong','Henan','Shaanxi','Gansu','Qinghai',
            'Ningxia','Inner Mongolia','Shanghai','Chongqing','Jiangsu','Zhejiang','Anhui','Jiangxi','Hubei','Hunan','Sichuan'];
            
            var digitalSHZ=['Fujian','Guangdong','Hainan','Guizhou','Yunnan','Guangxi','Hong Kong','Macau'];
            
            //*************INDIA Digital CS*************
            var digitalBOM=['Goa','Gujarat','Haryana','Himachal Pradesh','Madhya Pradesh','Maharashtra','Punjab','Rajasthan','Uttar Pradesh',
            'Uttarakhand','Chandigarh','Dadra','Nagar Haveli','Daman','Diu','Delhi','Jammu and Kashmir','Ladakh'];
            
            var digitalMAA=['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Jharkhand','Karnataka','Kerala','Manipur',
            'Meghalaya','Mizoram','Nagaland','Odisha','Sikkim','Tamil Nadu','Telangana','Tripura','West Bengal','Andaman and Nicobar',
            'Lakshadweep','Puducherry'];
            
            //*************JAPAN Digital CS*************
            var digitalTOK=['Hokkaido','Aomori','Akita','Iwate','Yamagata','Miyagi','Fukushima','Tochigi','Gunma','Ibaraki','Saitama','Tokyo',
            'Chiba','Kanagawa','Niigata','Ishikawa','Toyama','Nagano','Fukui','Gifu','Yamanashi','Aichi','Shizuoka','Hyogo','Kyoto','Shiga',
            'Osaka','Nara','Mie','Wakayama','Tottori','Shimane','Okayama','Hiroshima','Yamaguchi','Kagawa','Ehime','Tokushima','Kochi','Fukuoka',
            'Saga','Nagasaki','Kumamoto','Oita','Miyazaki','Kagoshima','Okinawa'];
            
            //*************KOREA Digital CS*************
            var digitalBUS=['Seoul','Incheon','Gyeonggi-do','Gangwon-do','Daejeon','Sejong','Chungcheongnam-do','Chungcheongbuk-do','Busan','Ulsan',
            'Daegu','Gyeongsangnam-do','Gwangju','Jeollanam-do','Jeollabuk-do','Jeju-do','Gyeongsangbuk-do'];
            
            //*************TAIWAN Digital CS*************
            var digitalTPE=['Taipei','New Taipei City','Keelung','Taoyuan','Hsin-Chu','Miao-Li','Taichung','Chang-Hua','Nan-Tou','Yunlin','Chiayi',
            'Tainan','Kaohsiung','Pingtung','I-Lan','Hualien','Taitung'];
            
            if(userCountry!== ""){            
                // ************ NORTAM Digital agents**************
                if(userCountry.includes("US") || userCountry.includes("MX") || userCountry.includes("CA")){
                    //English speaking customer
                    if(userLang.includes("en")){
                        //*************CMH_English_Agents*********************
                        var valueCMH = 0;
                        digitalCMH.forEach(function(word){
                          valueCMH = valueCMH + userRegion.includes(word);
                        });
                        
                        if (valueCMH==1){
                            return "5735E0000008PvD";    
                        }
                        else{ 
                            //*************DFW_English_Agents*********************
                            var valueDFW = 0;
                            digitalDFW.forEach(function(word){
                            valueDFW = valueDFW + userRegion.includes(word);
                            });
                            if(valueDFW==1){
                                return "5735E0000008PvI";
                            }
                            else{
                                //*************LAX_English_Agents*********************
                                var valueLAX = 0;
                                digitalLAX.forEach(function(word){
                                valueLAX = valueLAX + userRegion.includes(word);
                                });
                                if(valueLAX==1){
                                    return "5735E0000008PvN";
                                }
                                else{
                                    //*************ORD_English_Agents*********************
                                    var valueORD = 0;
                                    digitalORD.forEach(function(word){
                                    valueORD = valueORD + userRegion.includes(word);
                                    });
                                    if(valueORD==1){
                                        return "5735E0000008PvS";
                                    }
                                    else{
                                        //*************English_Agents*********************
                                        return "5735E0000008Ptq";
                                    }
                                }
                            }
                        } 
                    }
                }
                
                // ************ CHINA Digital agents**************
                else if(userCountry.includes("CN")){
                    //Chinese speaking customer           
                    if(userLang.includes("zh")){
                        //*************SHA_Chinese_Agents*********************
                        var valueSHA = 0;
                        digitalSHA.forEach(function(word){
                          valueSHA = valueSHA+ userRegion.includes(word);
                        });
                        
                        if (valueSHA==1){
                            return "5735E0000008Ptv";    
                        }
                        else{
                            //*************SHZ_Chinese_Agents*********************
                            var valueSHZ = 0;
                            digitalSHZ.forEach(function(word){
                            valueSHZ = valueSHZ + userRegion.includes(word);
                            });
                            if(valueSHZ==1){
                                return "5735E0000008Pu5";
                            }
                            else{
                                //*************Chinese_Agents*********************
                                return "";
                            }
                        }
                    }
                    //English speaking customer           
                    else if(userLang.includes("en")){
                        //*************SHA_English_Agents*********************
                        var valueSHAe = 0;
                        digitalSHA.forEach(function(word){
                          valueSHAe = valueSHAe+ userRegion.includes(word);
                        });
                        
                        if (valueSHAe==1){
                            return "5735E0000008Pu0";    
                        }
                        else{
                            //*************SHZ_English_Agents*********************
                            var valueSHZe = 0;
                            digitalSHZ.forEach(function(word){
                            valueSHZe = valueSHZe + userRegion.includes(word);
                            });
                            if(valueSHZe==1){
                                return "5735E0000008PuA";
                            }
                            else{
                                //*************English_Agents*********************
                                return "";
                            }
                        }
                    }
                    else{
                        return "";
                    }
                }
                
                // ************ INDIA Digital agents**************
                else if(userCountry.includes("IN")){
                    //Hindi speaking customer
                    if(userLang.includes("hi")){
                        //*************BOM_Hindi_Agents*********************
                        var valueBOM = 0;
                        digitalBOM.forEach(function(word){
                          valueBOM = valueBOM + userRegion.includes(word);
                        });
                        
                        if (valueBOM==1){ 
                            return "5735E0000008Pue";    
                        }
                        else{
                            //*************MAA_Hindi_Agents*********************
                            var valueMAA = 0;
                            digitalMAA.forEach(function(word){
                            valueMAA= valueMAA+ userRegion.includes(word);
                            });
                            if(valueMAA==1){
                                return "5735E0000008Puo";
                            }
                            else{
                                //*************Hindi_Agents*********************
                                return "";
                            }
                        }
                    }
                    //English speaking customer
                    else if(userLang.includes("en")){
                        //*************BOM_English_Agents*********************
                        var valueBOMe = 0;
                        digitalBOM.forEach(function(word){
                          valueBOMe = valueBOMe + userRegion.includes(word);
                        });
                        
                        if (valueBOMe==1){
                            return "5735E0000008PuZ";    
                        }
                        else{
                            //*************MAA_English_Agents*********************
                            var valueMAAe = 0;
                            digitalMAA.forEach(function(word){
                            valueMAAe= valueMAAe+ userRegion.includes(word);
                            });
                            if(valueMAAe==1){
                                return "5735E0000008Puj";
                            }
                            else{
                                //*************English_Agents*********************
                                return "";
                            }
                        }
                    }
                    else{
                        return "";
                    }    
                }
                
                // ************ JAPAN Digital agents**************
                else if(userCountry.includes("JP")){
                    //Japanese speaking customer
                    if(userLang.includes("ja")){
                        //*************TOK_Japanese_Agents*********************
                        var valueTOK = 0;
                        digitalTOK.forEach(function(word){
                        valueTOK = valueTOK + userRegion.includes(word);
                        });
                        
                        if (valueTOK ==1){
                            return "5735E0000008Puy";    
                        }
                        else{
                            //*************Japanese_Agents*********************
                            return "";
                        }    
                    }
                    //English speaking customer
                    else if(userLang.includes("en")){
                        //*************TOK_English_Agents*********************
                        var valueTOKe = 0;
                        digitalTOK.forEach(function(word){
                        valueTOKe = valueTOKe + userRegion.includes(word);
                        });
                        
                        if (valueTOKe ==1){
                            return "5735E0000008Put";    
                        }
                        else{
                            //*************English_Agents*******************
                            return "";
                        }    
                    }
                    else{
                        return "";
                    }
                }
                
                // ************ KOREA Digital agents**************
                else if(userCountry.includes("KR") || userCountry.includes("KP")) {
                    //Korean speaking customer
                    if(userLang.includes("ko")){
                        //*************BUS_Korean_Agents*********************
                        var valueBUS = 0;
                        digitalBUS.forEach(function(word){
                        valueBUS = valueBUS + userRegion.includes(word);
                        });
                        
                        if (valueBUS ==1){
                            return "5735E0000008Pv8";    
                        }
                        else{
                            //*************Korean_Agents*********************
                            return "";
                        }               
                    }
                    //English speaking customer
                    if(userLang.includes("en")){
                        //*************BUS_English_Agents*********************
                        var valueBUSe = 0;
                        digitalBUS.forEach(function(word){
                        valueBUSe = valueBUSe + userRegion.includes(word);
                        });
                        
                        if (valueBUSe ==1){
                            return "5735E0000008Pv3";    
                        }
                        else{
                            //*************English_Agents*********************
                            return "";
                        }               
                    }
                    else{
                        return "";
                    }
                    
                }
                
                // ************ TAIWAN Digital agents**************
                else if(userCountry.includes("TW")){
                    //Mandarin speaking customer
                    if(userLang.includes("tw")){
                        //*************TPE_Taiwan_Agents*********************
                        var valueTPE = 0;
                        digitalTPE.forEach(function(word){
                        valueTPE = valueTPE + userRegion.includes(word);
                        });
                        
                        if (valueTPE ==1){
                            return "5735E0000008Pvh";    
                        }
                        else{
                            //*************Taiwan_Agents*********************
                            return "";
                        }  
                    }
                     //English speaking customer
                    else if(userLang.includes("en")){
                        //*************TPE_English_Agents*********************
                        var valueTPEe = 0;
                        digitalTPE.forEach(function(word){
                        valueTPEe = valueTPEe + userRegion.includes(word);
                        });
                        
                        if (valueTPeE ==1){
                            return "5735E0000008Pvc";    
                        }
                        else{
                            //*************English_Agents*********************
                            return "";
                        }  
                    }
                    else{
                        return "";
                    }
                }
                else if(userCountry.includes("FR")){
                    //French speaking customer
                    if(userLang.includes("fr")){
                        return "5735E0000008PuK";
                    }
                    else{
                        return "5735E0000008Ptq";
                    }
                }
                else if(userCountry.includes("ES")){
                    //Spanish speaking customer
                    if(userLang.includes("es")){
                        return "5735E0000008PvX";
                    }
                    else{
                        return "5735E0000008Ptq";
                    }
                }
                else if(userCountry.includes("DE")){
                    //German speaking customer
                    if(userLang.includes("de")){
                        return "5735E0000008PuP";
                    }
                    else{
                        return "5735E0000008Ptq";
                    }
                }
                //English speaking customer
                else{
                    return "5735E0000008Ptq"; 
                }
            }
            // if country is null, return english
            else{
                return "5735E0000008Ptq"; 
            }
        }
	//--getButtonId end here--

        console.log('initESW ');
        //setupSessionStorage();
        var sessiondata = JSON.parse(sessionStorage.getItem('ember_simple_auth-session'));
        
        var session = sessionStorage.getItem('ember_simple_auth-session');
    
    
        if(session && sessiondata && sessiondata.authenticated  && sessiondata.authenticated.lastName){
 
           
         embedded_svc.settings.extraPrechatFormDetails = [{
            "label":"FirstName",
            "name":"FirstName",
            "value":  sessiondata.authenticated.firstName +' ' + sessiondata.authenticated.lastName,
            "displayToAgent":true
        },{
                "label": "KontainersId",
                "value":  sessiondata.authenticated.id ,
                "displayToAgent": true
        }

        ];           
          
    
        
        embedded_svc.settings.extraPrechatInfo = [{
            "entityName":"Contact",
            "showOnCreate":true,
            "linkToEntityName":"Case",
            "linkToEntityField":"ContactId",
            "saveToTranscript":"ContactId",
            "entityFieldMaps": [{
                    "doCreate": false,
                    "doFind": true,
                    "fieldName": "KontainersId__c",
                    "isExactMatch": true,
                    "label": "KontainersId"
                  }]
        }, {
            "entityName":"Case",
            "showOnCreate":true,
            "saveToTranscript":"CaseId",
            "entityFieldMaps": [{
                "isExactMatch":false,
                "fieldName":"Subject",
                "doCreate":true,
                "doFind":false,
                "label":"sxxxx"
              }, {
                "isExactMatch":false,
                "fieldName":"Status",
                "doCreate":true,
                "doFind":false,
                "label":"Status"
              }, {
                "isExactMatch":false,
                "fieldName":"Origin",
                "doCreate":true,
                "doFind":false,
                "label":"Origin"
            }]
        }];       
       } 
        
       
    
        embedded_svc.settings.displayHelpButton = true; //Or false
        embedded_svc.settings.language = '';       
        embedded_svc.addEventHandler("onHelpButtonClick", function(data) {
        console.log('online event handler');
        });
       
        
        embedded_svc.addEventHandler("onHelpButtonClick", function(data) { 
        startFormListen();
        console.log('offline event handler');
      
    });     
    
        
        embedded_svc.settings.enabledFeatures = ['LiveAgent'];
        embedded_svc.settings.entryFeature = 'LiveAgent';
        embedded_svc.init(
            'https://ceva--training.my.salesforce.com',
			'https://training-cview.cs84.force.com/service',
			gslbBaseURL,
			'00D5E000000DeIT',
			'Service_Queue',
			{
				baseLiveAgentContentURL: 'https://c.la2-c1cs-fra.salesforceliveagent.com/content',
				deploymentId: '5725E0000008P7X',
				buttonId: getButtonId(),
				baseLiveAgentURL: 'https://d.la2-c1cs-fra.salesforceliveagent.com/chat',
				eswLiveAgentDevName: 'Service_Queue',
				isOfflineSupportEnabled: true
			}
        );
    };
    
 



var submitInterval;
var formInterval;

function startSubmitListen(){
    submitInterval = setInterval(doSubmit, 50);
    setTimeout(function(){ 
        clearInterval(submitInterval);
    }, 2000);

}

 function doSubmit(){
         var btnSubmit = document.getElementsByClassName("startButton");
        console.log('doSubmit' + btnSubmit);
        if(btnSubmit.length  > 0){
            clearInterval(submitInterval);
            btnSubmit[0].click();
        }          
}


function startFormListen(){
 formInterval = setInterval(doForm, 300);
    setTimeout(function(){ 
        clearInterval(formInterval);
    }, 6000);

}

function doForm(){
        var phoneField = document.getElementById('Phone__c');
        console.log('do form');
        if(phoneField  != null){
            populateFormFields();
            document.getElementById('Phone__c').onchange = function() {
            var phoneInput = document.getElementById("Phone__c");
            var submitButton = document.getElementsByClassName('submitButton')[0];
            if(isPhoneNumberOk(phoneInput)){
                if(document.getElementById("phoneInputErrorArea") === null)
                    displayPhoneError(phoneInput);
                submitButton.disabled = true;
            }else{
                hidePhoneError();
                submitButton.disabled = false;
            }
        
        
           } 
           clearInterval(formInterval); 
        }
                        
}





function displayPhoneError(phoneInput){
    var errorTag = '<ul class="has-error uiInputDefaultError uiInput uiInputText uiInput--default uiInput--input" id="phoneInputErrorArea"   data-aura-class="uiInputDefaultError uiInput uiInputText uiInput--default uiInput--input">';
    errorTag += '<li class="form-element__help" >';
    errorTag += 'Please enter a valid phone number.';
    errorTag += '</li></ul>';
    var parentDiv = phoneInput.parentElement;
    parentDiv.insertAdjacentHTML('afterend', errorTag);
}
function hidePhoneError(){
    if(document.getElementById("phoneInputErrorArea") !== null)
        document.getElementById("phoneInputErrorArea").remove();
}
function isPhoneNumberOk(inputPhone){
    var phoneRE = /^\+?([0-9]{2,4})\)?[-. ]?([0-9]{3,4})[-. ]?([0-9]{3,4})$/;
    if(inputPhone.value.match(phoneRE)){
       return false;   
    }else{
        return true;
    }
}


function populateFormFields(){
    var session = sessionStorage.getItem('ember_simple_auth-session');
    
    
    if(session  ){
    
    var sessiondata = JSON.parse(sessionStorage.getItem('ember_simple_auth-session'));
    console.log('sessionStorage ' + sessiondata );
    
    var event = new Event('change');
    if(sessiondata.authenticated.lastName ){
        document.getElementById('Last_Name__c').value = sessiondata.authenticated.lastName;
        document.getElementById('Last_Name__c').dispatchEvent(event);
        document.getElementById('Last_Name__c').style.color = "grey";
        document.getElementById('Last_Name__c').disabled = true;
    }
     
     
    if(sessiondata.authenticated.firstName){ 
        document.getElementById('First_Name__c').value = sessiondata.authenticated.firstName;
        document.getElementById('First_Name__c').dispatchEvent(event);
        document.getElementById('First_Name__c').style.color = "grey";
        document.getElementById('First_Name__c').disabled = true;
    }   
     
    if(sessiondata.authenticated.email ){
        document.getElementById('Email__c').value = sessiondata.authenticated.email;
        document.getElementById('Email__c').dispatchEvent(event);
        document.getElementById('Email__c').style.color = "grey";
        document.getElementById('Email__c').disabled = true;
    }
    
    if(sessiondata.authenticated.company.companyAddress.phone ){
        document.getElementById('Phone__c').value = sessiondata.authenticated.company.companyAddress.phone;
        document.getElementById('Phone__c').dispatchEvent(event);
        document.getElementById('Phone__c').style.color = "grey";
        document.getElementById('Phone__c').disabled = true; 


    }
    
    if(sessiondata.authenticated.company.name ){
        document.getElementById('Company__c').value = sessiondata.authenticated.company.name;  
        document.getElementById('Company__c').dispatchEvent(event);  
        document.getElementById('Company__c').style.color = "grey";
        document.getElementById('Company__c').disabled = true;      

    }
    
    if(sessiondata.authenticated.company.companyAddress.country ){
        document.getElementById('Contact_Country__c').value = sessiondata.authenticated.company.companyAddress.country;
        document.getElementById('Contact_Country__c').dispatchEvent(event);
        document.getElementById('Contact_Country__c').style.color = "grey";
        document.getElementById('Contact_Country__c').disabled = true;
    }
    
    if(sessiondata.authenticated.id ){
        document.getElementById('ContactKontainersId__c').value = sessiondata.authenticated.id;
        document.getElementById('ContactKontainersId__c').dispatchEvent(event);
    }
    
    }
    document.getElementById('ContactKontainersId__c').parentNode.style.display = "none";
    
    }
	
	
	
  var  launchInit = new Promise(function (resolve, reject) {
    if (!window.embedded_svc) {
      var jq = document.createElement('script');
      jq.setAttribute('src', 'https://code.jquery.com/jquery-1.7.1.min.js');    
      var s = document.createElement('script');
      s.setAttribute('src', 'https://ceva--training.my.salesforce.com/embeddedservice/5.0/esw.min.js');

      s.onload = function() {  
      console.log('script loaded');
      jq.onload = function() {


              console.log('jq loaded');
              initESW(null);
          
        };
    };    
    document.body.appendChild(s);
    document.body.appendChild(jq);
    } else {
      initESW('https://service.force.com');
    }
    resolve('success');
    reject(error);
  });

  var launchLoad = function () {
    launchInit.then(function (fulfilled) {
      onLoadFunction();
    }).catch(function (error) {
      console.log(error.message);
    });
  };

  launchLoad();
  
})();	
	
