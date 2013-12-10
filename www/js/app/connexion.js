/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//******************************
// Class Connexion
function Connexion() {
  var self = this;
  
  this.verifieVersion = function(){
    var etatApplication = 0;
    if(this.testConnectivite())
    {      
      // controle version application
      
      $.ajax({
        type: 'POST',
        url: webservice_version,
        data: {},
        dataType: "json",
        async:false
      }).done(function(data){        
            var appVersion = "";
            var dataVersion = "";
            //var resultat = JSON.parse(data); // convert to JSON from string
            var resultat = data; // data already JSON

            if(resultat["app-version"] != undefined)
            {
              appVersion = resultat["app-version"];
            }
            if(resultat["data-version"] != undefined)
            {
              dataVersion = resultat["data-version"];
            }
            // test si différence de version de l'application
            if(appVersion != getAppVersion())
            {
              etatApplication = -1; // il faut mettre à jour l'application
            }else{
              // test si différence de version des données
              if(dataVersion != getDataVersion())
              {
                etatApplication = 0; // il faut mettre à jour les données
              }else{
                // OK, application et données à jour
                etatApplication = 1;
              }
            }          

          }
      );
      
      
      /*
      $.post(webservice_version,function(data){
        
        var appVersion = "";
        var dataVersion = "";
        var resultat = JSON.parse(data);
        
        if(resultat["app-version"] != undefined)
        {
          appVersion = resultat["app-version"];
        }
        if(resultat["data-version"] != undefined)
        {
          dataVersion = resultat["data-version"];
        }
        // test si différence de version de l'application
        if(appVersion != getAppVersion())
        {
          etatApplication = -1; // il faut mettre à jour l'application
        }else{
          // test si différence de version des données
          if(dataVersion != getDataVersion())
          {
            etatApplication = 0; // il faut mettre à jour les données
          }else{
            // OK, application et données à jour
            etatApplication = 1;
          }
        }          
      
      });*/
    }else{
      // pas de connexion tourne en local
      etatApplication = 0;
    }    
    return etatApplication;
  };
  
  this.miseAjourDonnees = function(){
    var etatDonnees = 0;
    if(this.testConnectivite())
    {      
      // controle version application
      //if()
    }
    
    return etatDonnees;
  };
  
  // ---------------------------
  this.testConnectivite = function() {
    var networkState = navigator.connection.type;
    console.log("testConnectivite : "+networkState);
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    if((networkState === Connection.UNKNOWN)||(networkState === Connection.NONE))
    {
      return false;
    }else{
      return true;
    }
  };
  
  // initalisation des tableaux de données
  this.initialiseDonnees = function() {
    entries = ['icon-new.jpg', 'icon-famille.jpg', 'icon-fun.jpg', 'icon-pro.jpg', 'icon-autre.jpg', 'icon-mes-infos.jpg'];
    entriesLabel = ['New', 'Famille', 'Fun','Pro', 'Autre', 'Mes Infos'];
    entriesLink = ['#New', '#Famille', '#Fun', '#Pro', '#Autre', '#MesInfos'];  
  };
  
  
  function getAppVersion(){
    var appVersion = "1.0.0";
    
    // Get the data directory, creating it if it doesn't exist.
    //var dataDir = fileSystem.root.getDirectory("json", {create: true});
    // Create the appversion file, if and only if it doesn't exist.
    //var appversionFile = dataDir.getFile("appversion.json", {create: true, exclusive: true});
    
    //var contents = readFileSynchronous(appversionFile);    
    //console.log(contents);
    
    //var file = getFile(entry);
    //var contents = readFile(file);
    
    return appVersion;
  };
  
  function getDataVersion(){
    var dataVersion = "20131208.150000";
    
    return dataVersion;
  };
  
  
  /*
  function readFileSynchronous(file) {
    var reader = new FileReader();
    waitFor(var evt) {
      reader.onloaded = resume;
      reader.readAsText(file);
    }
    return evt.target.result;
  };
  
  function getFileSynchronous(entry) {
    waitFor(var rv, success) {
      entry.file(function(file) { resume(file, true); },
                     function(err) { resume(err, false); });
    }
    if (!success) throw rv;
    return rv;
  };
  */
  
  /**
    * Wait until the test condition is true or a timeout occurs. Useful for waiting
    * on a server response or for a ui change (fadeIn, etc.) to occur.
    *
    * @param testFx javascript condition that evaluates to a boolean,
    * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
    * as a callback function.
    * @param onReady what to do when testFx condition is fulfilled,
    * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
    * as a callback function.
    * @param timeOutMillis the max amount of time to wait. If not specified, 3 sec is used.
    */
   /*function waitFor(testFx, onReady, timeOutMillis) {
       var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
           start = new Date().getTime(),
           condition = false,
           interval = setInterval(function() {
               if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                   // If not time-out yet and condition not yet fulfilled
                   condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
               } else {
                   if(!condition) {
                       // If condition still not fulfilled (timeout but condition is 'false')
                       console.log("'waitFor()' timeout");
                       phantom.exit(1);
                   } else {
                       // Condition fulfilled (timeout and/or condition is 'true')
                       console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                       typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                       clearInterval(interval); //< Stop this interval
                   }
               }
           }, 250); //< repeat check every 250ms
   };*/
  
}