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

//---------------------------------
// DEPENDANCES
//---------------------------------



//---------------------------------
// GLOBAL
//---------------------------------
var myApp;
var entries, entriesLink, entriesLabel;

var IS_ANDROID = navigator.userAgent.match( /android/gi ),
    IS_IPHONE = navigator.userAgent.match( /iphone/gi );
    
// url des services
var webservice_version = "http://localhost:8888/phonegap/wish-it/webservices/check-version.php";
var webservice_update = "http://localhost:8888/phonegap/wish-it/webservices/update.php";


//---------------------------------
// APPLICATION RACINE
//---------------------------------
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    // Events Handlers
    //
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        myApp = new MyApplication();
        myApp.initialise();
    }
};

//---------------------------------
// APPLICATION PRINCIPALE
//---------------------------------
function MyApplication(){
  var self = this;
  var menuNav;
  var connexion;
  
  // constructeur
  this.initialise = function() {
    /*setTimeout(function() {
        navigator.splashscreen.hide();
    }, 2000);
    navigator.splashscreen.show();*/
    
    connexion = new Connexion();
    
    var etatApplication = connexion.verifieVersion();
    if(etatApplication >= 0)
    {
      // donnees périmées
      if(etatApplication == 0)
      {
        var etatDonnees = connexion.miseAjourDonnees();
        // impossible de mettre à jour, alerte que l'on travaille en local
        if(etatDonnees == 0)
        {
          //@todo : affichage message erreur version des données périmée
          console.log("[Alerte][version des données périmée]");
        }
      }
      
      // charge les données du cache
      connexion.initialiseDonnees();
        
      // données chargées en local, lance UI
      initialiseUI();      
    }else{
      //@todo : affichage message erreur version de l'application périmée
      console.log("[Erreur][version de l'application périmée]");
    }
  }; 
  
  function initialiseUI() {
    menuNav = new MenuNavigation();
    menuNav.fabricationListeMenu();
  }  
  
}


