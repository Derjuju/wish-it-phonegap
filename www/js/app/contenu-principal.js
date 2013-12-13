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
  var parent = null;
  
  // constructeur
  this.initialise = function(_parent) {
    self.parent = _parent;
    self.contenuSelector = $('.mainContent');
    self.zoneContenuSelector = self.contenuSelector.find('.zoneContenu');
    
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
    updateHeightInner();
    self.zoneContenuSelector.scrollTop(0);
    // lance fermeture menu
    self.parent.menuNav.fermeMenu();  
  }
  
  function clickSurVignette(element){
    var vignette = $(element);
    if(!vignette.parent().hasClass('small'))
    {
      modePersonnalisation(element);
    }else{
      // click sur petite on agrandit
      vignette.parent().removeClass('small');
      
      //setTimeout(function(){ deplaceScrollbar(element); },800);      
      deplaceScrollbar(element);
    }    
  }
  
  function deplaceScrollbar(element)
  {
    //var zoneCible = self.zoneContenuSelector.find('.visuels');
    var vignette = $(element);
    /*var offset = vignette.offset();
    //self.zoneContenuSelector.scrollTop(offset.top);
    self.zoneContenuSelector.animate({'scrollTop':offset.top},500);*/
    //var position = zoneCible.position();
    var decalage = 0;
    if(self.zoneContenuSelector.find('.messageWelcome').length > 0)
    {
      decalage = self.zoneContenuSelector.find('.messageWelcome').height();
    }
    //console.log(self.zoneContenuSelector.find('.messageWelcome').height());
    
    var distance = (vignette.attr('data-position')*vignette.height()) + decalage;
    
    //console.log(position.top+" et "+vignette.attr('data-position')+" et "+vignette.height());
    
    self.zoneContenuSelector.animate({'scrollTop':distance},500);
    
  }
  
  function modePersonnalisation(element){
    var vignette = $(element);
    vignette.addClass('selected');
    
  }
  
  // à déplacer dans la partie gestion de contenu
  function updateHeightInner() {
    self.contenuSelector.height(window.innerHeight);
    self.contenuSelector.width((window.innerWidth - 10));
    self.contenuSelector.css('margin-left','10px');
    
    self.zoneContenuSelector.height(window.innerHeight);
  }
}