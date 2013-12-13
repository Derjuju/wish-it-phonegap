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
var donneesJson;

var rubriqueActuelle = 0;

var IS_ANDROID = navigator.userAgent.match( /android/gi ),
    IS_IPHONE = navigator.userAgent.match( /iphone/gi );
    
// url des services
var webservice_version = "http://wishit.freetouch.fr/webservices/check-version.php";
var webservice_update = "http://wishit.freetouch.fr/webservices/update.php";

var cdn_visuel = "http://wishit.freetouch.fr/webservices/";


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
        
        // simulation du chargement
        setTimeout(function() { myApp.initialise(); }, 1000);
        // pour la prod : 
        //myApp.initialise();
        
    }
};

//---------------------------------
// APPLICATION PRINCIPALE
//---------------------------------
function MyApplication(){
  var self = this;
  var menuNav;
  var contenuPrincipal;
  var connexion;
  
  // constructeur
  this.initialise = function() {
    navigator.splashscreen.show();
    connexion = new Connexion();    
    
    $("#eventManager").on('versionVerifiee', function() { onVersionVerifiee(); } );
    
    if(!connexion.verifieVersion())
    {
      $("#eventManager").off('versionVerifiee');
      notificationMessage('Vous devez être connecté pour pouvoir utiliser cette application.', null, 'Absence de connectivité', 'OK');
      
      //initialise les Données depuis le cache
      $("#eventManager").on('initialiseDonneesReady', function() { onInitialiseDonneesReady(); } );
      connexion.initialiseDonnees();
    }
  };
  
  function onVersionVerifiee() {
    $("#eventManager").off('versionVerifiee');
    // on teste la valeur de la verification
    var etatApplication = connexion.getEtatApplication();
    
    if(etatApplication >= 0)
    {
      // charge les données du cache
      $("#eventManager").on('initialiseDonneesReady', function() { onInitialiseDonneesReady(); } );
      if(!connexion.initialiseDonnees())
      {
        $("#eventManager").off('initialiseDonneesReady');
        //initialise les Données depuis le cache
        //@todo : initialise les Données
        // charge les données du cache
        // pour le moment on bloque en réclamant une connectivité
        notificationMessage('Vous devez être connecté pour pouvoir utiliser cette application.', null, 'Absence de connectivité', 'OK');        
      }

    }else{
      notificationMessage("Vous devez mettre à jour l'application pour pouvoir l'utiliser", goToStore, 'Application périmée', 'OK');
    }
    
  }
  
  function onInitialiseDonneesReady(){
    $("#eventManager").off('initialiseDonneesReady');
    // données chargées en local, lance UI
    initialiseUI(); 
  }
  
  function initialiseUI() {
    $("#eventManager").on('menuNavigationReady', function() { onMenuNavigationReady(); } );
    self.menuNav = new MenuNavigation();
    self.menuNav.fabricationListeMenu(self);
  }  
  
  function onMenuNavigationReady(){
    $("#eventManager").off('menuNavigationReady');
    navigator.splashscreen.hide();
    self.menuNav.ouvreMenu();

    self.contenuPrincipal = new ContenuPrincipal();
    self.contenuPrincipal.initialise(self); 
    self.miseAjourContenu();  
  }
  
  this.miseAjourContenu = function(){   
    self.contenuPrincipal.chargeRubriqueActuelle();   
  };
  
  
  
  
  function notificationMessage(message, callback, title, buttonName){
    navigator.notification.alert(message, callback, title, buttonName);
  }
  
  function goToStore(){
    //@TODO : envoyer vers le store correspondant pour mettre à jour
    console.log("envoyer vers le store correspondant pour mettre à jour");
  }
  
}


