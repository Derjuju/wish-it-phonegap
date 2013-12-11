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
      //@todo : affichage message pas de connectivité
      console.log("[Alerte][pas de connectivité]");
      
      //initialise les Données depuis le cache
      //@todo : initialise les Données
      // charge les données du cache
      $("#eventManager").on('initialiseDonneesReady', function() { onInitialiseDonneesReady(); } );
      connexion.initialiseDonnees();
    }
  };
  
  function onVersionVerifiee() {
    $("#eventManager").off('versionVerifiee');
    // on teste la valeur de la verification
    var etatApplication = connexion.getEtatApplication();
    console.log("etat Application : "+etatApplication);
    
    if(etatApplication >= 0)
    {
      // charge les données du cache
      $("#eventManager").on('initialiseDonneesReady', function() { onInitialiseDonneesReady(); } );
      connexion.initialiseDonnees();
      
    }else{
      //@todo : affichage message erreur version de l'application périmée
      console.log("[Erreur][version de l'application périmée]");
    }
    
  }
  
  function onInitialiseDonneesReady(){
    $("#eventManager").off('initialiseDonneesReady');
    console.log("onInitialiseDonneesReady");
    // données chargées en local, lance UI
    initialiseUI(); 
  }
  
  function initialiseUI() {
    $("#eventManager").on('menuNavigationReady', function() { onMenuNavigationReady(); } );
    menuNav = new MenuNavigation();
    menuNav.fabricationListeMenu();
  }  
  
  function onMenuNavigationReady(){
    $("#eventManager").off('menuNavigationReady');
    navigator.splashscreen.hide();
    menuNav.ouvreMenu();
    
    updateHeightInner();
    
    
    
  }
  
  
  // à déplacer dans la partie gestion de contenu
  function updateHeightInner() {
    //newsList.style.height = window.innerHeight + 'px';
    //$(newsList).css('height',(window.innerHeight - 220) + 'px');
    $(".mainContent").height(window.innerHeight);
    $(".mainContent").width((window.innerWidth - 10));
    $(".mainContent").css('margin-left','10px');
    
    //$(newsListInner).css('height',window.innerHeight + 'px');	
    //stroll.bind( $(newsListInner));
  }
  
}


