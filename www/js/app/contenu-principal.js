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
// Class ContenuPrincipal
function ContenuPrincipal() {
  var self = this;  
  var contenuSelector = null;
  var zoneContenuSelector = null;
  var detailSelector = null;
  var parent = null;
  
  var ficheDetail = null;
  
  var premierChargement;
  
  var messagePerso;
  
  var largeurEcran;
  var largeurVignette;
  var hauteurVignette;
  
  // constructeur
  this.initialise = function(_parent) {
    self.parent = _parent;
    self.contenuSelector = $('.mainContent');
    self.zoneContenuSelector = self.contenuSelector.find('.zoneContenu');
    self.detailSelector = $('#detailManager');
    
    self.premierChargement = true;
    
    self.largeurEcran = Math.floor(window.innerWidth * 0.9);
    self.largeurVignette = Math.floor(self.largeurEcran * 0.5);
    self.hauteurVignette = Math.floor(400 * self.largeurVignette / 300);
    
    //updateHeightInner();
    
    //charge affichage de la rubrique Actuelle;
    //this.chargeRubriqueActuelle();
  };
  
  this.chargeRubriqueActuelle = function(){
    //self.parent.menuNav.fermeMenu();
    //navigator.notification.loadingStart();
      //href data-tpl data-id
      var itemMenu = self.parent.menuNav.getItemMenu(rubriqueActuelle);
      
      var itemIndice = itemMenu.attr('data-indice');

      var templateAAfficher = "";
      var typeContenu = "";

      /*if((itemMenu.attr('data-tpl') == 'new')||(itemMenu.attr('data-tpl') == 'mes-infos')){
        templateAAfficher = itemMenu.attr('data-tpl')+'.html';
        typeContenu = itemMenu.attr('data-tpl');
      }else{
        templateAAfficher = 'liste.html';
        typeContenu = "liste";
      }*/
    
      templateAAfficher = entriesTpl[itemIndice]+'.html';
      typeContenu = entriesTpl[itemIndice];
      

      self.zoneContenuSelector.load('js/tpl/'+templateAAfficher, function(){
        //navigator.notification.loadingStop();
        contenuRempli(typeContenu);
      });
    
  };
  
  function contenuRempli(typeContenu){ 
    var rubriqueCherchee = ""+rubriqueActuelle;
    var itemMenu = self.parent.menuNav.getItemMenu(rubriqueActuelle);
    var itemIndice = itemMenu.attr('data-indice');
    
    
    var zoneTitre = "";
    if(typeContenu == "accueil")
    {
      var zoneMessageDynamique = self.zoneContenuSelector.find('.messageDynamique');
      var htmlMessage = self.parent.getAccueilMessage();
      zoneMessageDynamique.html(htmlMessage);
    }else if((typeContenu == "new")||(typeContenu == "liste"))
    {
      zoneTitre = self.zoneContenuSelector.find('.infoRubrique');
      zoneTitre.find('h1').html(entriesTitle[itemIndice]);
    }
    else if(typeContenu == "a-propos")
    {
      self.zoneContenuSelector.find('.appVersion').html(self.parent.getAppVersion());
      self.zoneContenuSelector.find('.dataVersion').html(self.parent.getDataVersion());
      var etatUI = "";
      if(useTransition3D) { etatUI +="3d"; } else { etatUI +="2d"; }
      self.zoneContenuSelector.find('.transformVersion').html(etatUI);
    }
    
    /*if(typeContenu == "mes-infos")
    {
      self.zoneContenuSelector.find('.envoyer a').bind('click', function(event){
        event.preventDefault();
        if($(this).hasClass('sms'))
        {
          envoiChoixParSMS();
        }else{
          ouvreChoixPartage(element,idElement);
        }
      });
    }*/
    
    
    var zoneCible = self.zoneContenuSelector.find('.visuels');
    //zoneCible.addClass('small');
    var html = "";
    var position = 0;
    for(var i = 0; i<donneesJson.length; i++)
    {
      var cat = donneesJson[i]['cat'];
      if($.inArray(rubriqueCherchee, cat) > -1)
      {
        html += insereVignette(donneesJson[i],i,position);
        position++;
      }
    }
    
    zoneCible.html(html);
    
    zoneCible.find('img').bind('click', function(){ clickSurVignette(this); });
    
    var zoneRetourMenu;
    if(typeContenu == "accueil") {
      zoneRetourMenu = self.zoneContenuSelector.find('#retourMenuAccueil a');
    }else{
      zoneRetourMenu = self.zoneContenuSelector.find('#retourMenu a');
    }
    zoneRetourMenu.bind('click', function(event){ 
      event.preventDefault();
      self.parent.menuNav.ouvreMenu();
    });
    
    
    contenuPret();
  }
  
  function insereVignette(elementVignette,indice,position){
    var html = "";    
    //html+='<img data-id="'+indice+'" data-position="'+position+'" src="'+cdn_visuel+'images/preview/'+elementVignette["preview"]+'">';    
    html+='<img data-id="'+indice+'" data-position="'+position+'" src="img/vignette-vide.png" height="'+self.hauteurVignette+'" width="'+self.largeurVignette+'">';    
    return html;
  }
  
  function lanceSubstitution(){
    
    var zoneCible = self.zoneContenuSelector.find('.visuels');
    zoneCible.find('img').each(function(){      
      $(this).attr('src', cdn_visuel+'images/preview/'+donneesJson[$(this).attr('data-id')]["preview"]) ;
    });
    
  }
  
  function contenuPret(){ 
    //console.log("contenuPret");
    //self.zoneContenuSelector.scrollTop(0);  
    
    if(self.premierChargement){
      self.premierChargement = false;
      
      // ajout de l'element iScroll pour gérer le contenu
      setTimeout(function () { 
        myScroll = new iScroll('wrapper',{ zoom:true, bounce:false, hScrollbar:false, hScroll:false}); 
        updateHeightInner();
      }, 100);
      
      setTimeout(function () { 
        // lance fermeture menu
        self.parent.menuNav.fermeMenu();
      }, 2000);  
      
    }else{
      // mise à jour des dimensions + appel au iscroll refresh  
      updateHeightInner();
      // lance fermeture menu
      self.parent.menuNav.fermeMenu();  
    }  
    
    lanceSubstitution();
    
  }
  
  function clickSurVignette(element){
    // à tester pour prévenir d'un click pendant le scroll
    //if (myScroll.moved) return;
    
    var vignette = $(element);
    /*if(!vignette.parent().hasClass('small'))
    {
      modePersonnalisation(element);
    }else{
      // click sur petite on agrandit
      vignette.parent().removeClass('small');
      deplaceScrollbar(element);
    } */   
    modePersonnalisation(element);
  }
  
  function deplaceScrollbar(element)
  {
    var vignette = $(element);
    var decalage = 0;
    if(self.zoneContenuSelector.find('.messageWelcome').length > 0)
    {
      decalage = self.zoneContenuSelector.find('.messageWelcome').height();
    }
    var distance = (vignette.attr('data-position')*vignette.height()) + decalage;
    self.zoneContenuSelector.animate({'scrollTop':distance},500);
    
  }
  
  function modePersonnalisation(element){
    // désactive navigation
    self.parent.menuNav.desactiveMenu();
    
    var vignette = $(element);
    vignette.addClass('selected');
    
    ficheDetail = new FicheDetail();
    ficheDetail.initialise(self, vignette);
  }
  
  // à déplacer dans la partie gestion de contenu
  function updateHeightInner() {
    self.contenuSelector.height(window.innerHeight);
    if(useTransition3D)
    {
      self.contenuSelector.width((window.innerWidth - 10));
      self.contenuSelector.css('margin-left','10px');
    }
    //self.zoneContenuSelector.height(window.innerHeight);
    
    $("#wrapper").height(window.innerHeight);
	
    myScroll.refresh();
    // remonte le scroll en 0, 0 en 0 ms
    myScroll.scrollTo(0, 0, 0);
    
    
  }
}