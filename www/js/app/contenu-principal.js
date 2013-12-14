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
  
  var premierChargement;
  
  // constructeur
  this.initialise = function(_parent) {
    self.parent = _parent;
    self.contenuSelector = $('.mainContent');
    self.zoneContenuSelector = self.contenuSelector.find('.zoneContenu');
    self.detailSelector = $('#detailManager');
    
    self.premierChargement = true;
    
    updateHeightInner();
    
    //charge affichage de la rubrique Actuelle;
    this.chargeRubriqueActuelle();
  };
  
  this.chargeRubriqueActuelle = function(){
    //self.parent.menuNav.fermeMenu();
    //navigator.notification.loadingStart();
    //href data-tpl data-id
    var itemMenu = self.parent.menuNav.getItemMenu(rubriqueActuelle);
    
    var templateAAfficher = "";
    
    if((itemMenu.attr('data-tpl') == 'new')||(itemMenu.attr('data-tpl') == 'mes-infos')){
      templateAAfficher = itemMenu.attr('data-tpl')+'.html';
    }else{
      templateAAfficher = 'liste.html';
    }
    
    self.zoneContenuSelector.load('js/tpl/'+templateAAfficher, function(){
      //navigator.notification.loadingStop();
      contenuRempli();
    });
  };
  
  function contenuRempli(){ 
    var rubriqueCherchee = ""+rubriqueActuelle;
    var zoneCible = self.zoneContenuSelector.find('.visuels');
    zoneCible.addClass('small');
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
    
    contenuPret();
  }
  
  function insereVignette(elementVignette,indice,position){
    var html = "";    
    html+='<img data-id="'+indice+'" data-position="'+position+'" src="'+cdn_visuel+'images/preview/'+elementVignette["preview"]+'">';    
    return html;
  }
  
  function contenuPret(){ 
    console.log("contenuPret");
    self.zoneContenuSelector.scrollTop(0);  
    updateHeightInner();
    if(self.premierChargement){
      self.premierChargement = false;
    }else{
      // lance fermeture menu
      self.parent.menuNav.fermeMenu();  
    }
  }
  
  function clickSurVignette(element){
    var vignette = $(element);
    if(!vignette.parent().hasClass('small'))
    {
      modePersonnalisation(element);
    }else{
      // click sur petite on agrandit
      vignette.parent().removeClass('small');
      deplaceScrollbar(element);
    }    
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
    self.detailSelector.load('js/tpl/detail.html', function(){
      // récuperation de la fiche de l'élément
      var idElement = vignette.attr('data-id');
      var elementVignette = donneesJson[idElement];
            
      var titre = elementVignette["texte"].split('<br>')[0];
      
      var imagePreview = cdn_visuel+'images/preview/'+elementVignette["preview"];
      var imageVierge = cdn_visuel+'images/image/'+elementVignette["preview"];
      
      // customisation de la fiche detail
      self.detailSelector.find('.titre').html('<h1>'+titre+'...</h1>');
      self.detailSelector.find('.visuel').html('<img src="'+imagePreview+'" >');
      
      // liaison des boutons
      self.detailSelector.find('.fermer a').bind('click', function(event){
        event.preventDefault();
        fermerDetail(element);
      });
      self.detailSelector.find('.envoyer a').bind('click', function(event){
        event.preventDefault();
        ouvreChoixPartage(element,idElement);
      });
      
      self.detailSelector.addClass('affiche');
      self.detailSelector.height(window.innerHeight);
      self.detailSelector.animate({'opacity':1},500);
    });
  }
  
  function fermerDetail(element){
    // désactive navigation
    self.parent.menuNav.activeMenu();
    
    var vignette = $(element);
    vignette.removeClass('selected');
    
    self.detailSelector.animate({'opacity':0},500, function(){
      self.detailSelector.removeClass('affiche');
      
      self.detailSelector.find('.fermer a').unbind('click');
      
      //vide detail
      self.detailSelector.html('');
    });
  }
  
  function ouvreChoixPartage(element,idElement){
    var vignette = $(element);
    var elementVignette = donneesJson[idElement];
    
    var imageToShare = cdn_visuel+'images/preview/'+elementVignette["preview"];
        
        //window.plugins.socialsharing.share(null, null, imageToShare);
        console.log("appel du plugin social sharing");
        var socialShare = window.plugins.socialsharing;
        socialShare.available(function(isAvailable) {
          if (isAvailable) {
            console.log("plugin social sharing : dispo");
          }else{
            console.log("plugin social sharing : non dispo");
          }
        });
    
    /*window.plugins.socialsharing.available(function(isAvailable) {
      console.log("appel du plugin social sharing");
      if (isAvailable) {
        // use a local image from inside the www folder:
        //window.plugins.socialsharing.share(null, null, 'www/image.gif', null); // succes/error callback params may be added as 5th and 6th param
        // .. or a local image from anywhere else (if permitted):
        // local-iOS:
        //window.plugins.socialsharing.share(null, null, '/Users/username/Library/Application Support/iPhone/6.1/Applications/25A1E7CF-079F-438D-823B-55C6F8CD2DC0/Documents/.nl.x-services.appname/pics/img.jpg');
        // local-iOS-alt:
        //window.plugins.socialsharing.share(null, null, 'file:///Users/username/Library/Application Support/iPhone/6.1/Applications/25A1E7CF-079F-438D-823B-55C6F8CD2DC0/Documents/.nl.x-services.appname/pics/img.jpg');
        // local-Android:
        //window.plugins.socialsharing.share(null, null, 'file:///storage/emulated/0/nl.xservices.testapp/5359/Photos/16832/Thumb.jpg');
        // .. or an image from the internet:
        //window.plugins.socialsharing.share(null, null, 'http://domain.com/image.jpg');
        
        var imageToShare = cdn_visuel+'images/preview/'+elementVignette["preview"];
        
        window.plugins.socialsharing.share(null, null, imageToShare);
      }
    });*/
    
  }
  
  // à déplacer dans la partie gestion de contenu
  function updateHeightInner() {
    self.contenuSelector.height(window.innerHeight);
    self.contenuSelector.width((window.innerWidth - 10));
    self.contenuSelector.css('margin-left','10px');
    
    self.zoneContenuSelector.height(window.innerHeight);
    
    $("#wrapper").height(window.innerHeight);
	
    myScroll = new iScroll('wrapper', { zoom:true });
  }
}