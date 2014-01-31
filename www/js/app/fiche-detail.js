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
// Class FicheDetail
function FicheDetail() {
  var self = this; 
  var detailSelector = null;
  var indiceElement = null;
  var idFiche = null;
  var objetFiche = null;
  
  
  // constructeur
  this.initialise = function(_parent, element) {
    self.parent = _parent;
    var vignette = $(element);
    self.indiceElement = vignette.attr('data-id');
    self.detailSelector = $('#detailManager');
    
    self.detailSelector.load('js/tpl/detail.html', function(){
      // récuperation de la fiche de l'élément
      var idElement = self.indiceElement;
      self.objetFiche = donneesJson[idElement];
      
      self.idFiche = self.objetFiche["id"];
            
      var titre = self.objetFiche["texte"].split('<br>')[0];
      var reg=new RegExp("(<br>)", "g")
      self.messagePerso = "";//elementVignette["texte"].replace(reg, ' ');
      
      var imagePreview = cdn_visuel+'images/preview/'+self.objetFiche["preview"];
      var imageVierge = cdn_visuel+'images/image/'+self.objetFiche["preview"];
      
      // customisation de la fiche detail
      //self.detailSelector.find('.titre').html('<h1>'+titre+'...</h1>');
      self.detailSelector.find('.titre').html('<h1>&nbsp;</h1>');
      
      // modification dimension en fonction du téléphone
      var hauteurElementsUI = 131;
      var hauteurPossible = window.innerHeight - hauteurElementsUI;
      var largeurPossible = window.innerWidth;
      
      var largeurImposee = 240;
      var hauteurImposee = 320;
      
      if(largeurPossible > 300){
        if(hauteurPossible > 400){
          largeurImposee = 300;
          hauteurImposee = 400;
        }
      }
      
      self.detailSelector.find('.visuel').html('<img src="'+imagePreview+'" width="'+largeurImposee+'" height="'+hauteurImposee+'">');
      
      // liaison des boutons
      self.detailSelector.find('.fermer a').bind('click', function(event){
        event.preventDefault();
        fermerDetail(element);
      });
      
      self.detailSelector.find('.envoyer a').bind('click', function(event){
        event.preventDefault();
        if($(this).hasClass('share'))
        {
          ouvreChoixPartage(element,idElement);
        }/*else if($(this).hasClass('share-sms'))
        {
          ouvreChoixPartage(element,idElement);
        }else if($(this).hasClass('share-mail'))
        {
          envoiChoixParMail(element,idElement);
        }else if($(this).hasClass('share-fb'))
        {
          ouvreChoixPartage(element,idElement);
        }else if($(this).hasClass('share-tw'))
        {
          ouvreChoixPartage(element,idElement);
        }*/
        
        $.ajax({
                  type: 'POST',
                  url: webservice_stats,
                  data: {id:idShare},
                  async:true
                })
        
      });
      
      self.detailSelector.addClass('affiche');
      self.detailSelector.height(window.innerHeight);
      self.detailSelector.animate({'opacity':1},500);
    });
    
  };
  
  
  
  
  function fermerDetail(element){
    // désactive navigation
    self.parent.parent.menuNav.activeMenu();
    
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
        var socialShare = window.plugins.socialsharing;
        socialShare.available(function(isAvailable) {
          if (isAvailable) {
            
            var imageToShare = cdn_visuel+'images/preview/'+elementVignette["preview"];
            
            //self.messagePerso = '<br><img src="'+imageToShare+'"><br>Offrez, vous aussi, une bonne (ou mauvaise) r&eacute;solution : <a href="http://wishit.freetouch.fr">wishit.freetouch.fr</a>';
            self.messagePerso = "Offrez, vous aussi, une bonne (ou mauvaise) résolution";
            
            //share('message', 'sujet', 'image', 'site web');
            window.plugins.socialsharing.share(self.messagePerso, 'Bonne année et...', imageToShare, website_app);
          }
        });
    
  }
  
  function envoiChoixParSMS(){ //element,idElement){
    //var vignette = $(element);
    //var elementVignette = donneesJson[idElement];
    
    //var imageToShare = cdn_visuel+'images/preview/'+elementVignette["preview"];
    //var imageToShare = cdn_visuel+'images/preview/requin.jpg';
    //self.messagePerso, 'Meilleurs voeux 2014', imageToShare, website_app);
    //window.location.href = "sms:contactno?body=Meilleurs voeux 2014";
  }
  
  
  function envoiChoixParMail(element,idElement){
    var vignette = $(element);
    var elementVignette = donneesJson[idElement];
    
    var imageToShare = cdn_visuel+'images/preview/'+elementVignette["preview"];
    
    var mailShare = plugin.email;
    mailShare.isServiceAvailable(function(isAvailable) {
      if (isAvailable) {
        mailShare.open({
            to:      [],
            cc:      [],
            bcc:     [],
            subject: 'Bonne année et...',
            body:    '<br><img src="'+imageToShare+'"><br>Offrez, vous aussi, une bonne (ou mauvaise) r&eacute;solution : <a href="http://wishit.freetouch.fr">wishit.freetouch.fr</a>',
            isHtml:  true
        });
      }
    });
    
    
  }
  
  
}