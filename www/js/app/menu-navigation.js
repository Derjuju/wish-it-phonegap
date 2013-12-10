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
// Class MenuNavigation
function MenuNavigation() {
  var self = this;
  var menu = null;
  var menuSelector = null;
  var menuElements = null;
  
  // constructeur
  this.initialise = function() {
    // largeur = 36% window or max = 228px
  	var largeurDevice = Math.ceil(window.innerWidth*0.36);
  	if(largeurDevice > 228) largeurDevice = 228;
  	
  	
    
    self.menu = Meny.create({
      // The element that will be animated in from off screen
      menuElement: document.querySelector( '.navigation'), 
      
      //The contents that gets pushed aside while Meny is active
      contentsElement: document.querySelector( '.contents' ),
      
      // [optional] The alignment of the menu (top/right/bottom/left)
      position: Meny.getQuery().p || 'left',
      
      // [optional] The height of the menu (when using top/bottom position)
      //height: 200,

      // [optional] The width of the menu (when using left/right position)
      width: largeurDevice,

      // [optional] Distance from mouse (in pixels) when menu should open
      threshold: window.innerWidth / 4
    });
    
    // activation des listeners si jamais on les avait enlevés
    self.menu.bindEvents();
    
    self.menuSelector = $('.navigation');
    
    // ajout des listeners sur les actions du menu
    //Meny.dispatchEvent( dom.menu, 'open' );
    self.menuSelector.on('open', function(event) {
      synchroniseOuverture();
    });
    self.menuSelector.on('close', function(event) {
      synchroniseFermeture();
    });   
  }; 
  
  // construction automatique
  self.initialise();
    
  this.fabricationListeMenu = function() {
    console.log("fabricationListeMenu");
    
    self.menuElements = $('.menu-list');
    
    var html = '';
    
    for( var i = 0, len = entries.length; i < len; i++ ) {
      var attributes = IS_ANDROID ? 'cache' : '';	
      attributes += ' vignette';
      
      html += '<li class="' + attributes + '">';
      if(entries[i] != "") { html +='<a href="'+entriesLink[i]+'">'+insereBigVignette(entries[i], entriesLabel[i])+'</a>'; }
      else { html +='<a href="'+entriesLink[i]+'">'+entriesLabel[i]+'</a>'; } 
      html +='</li>';
      
    }
    
    self.menuElements.html(html);
    // Set the default effect
    self.menuElements.addClass('wave');
    
    // ajoute un click sur les éléments
    self.menuElements.find(".vignette a").each(function(){
      $(this).click(function(event){
        event.preventDefault();
        //if( $("html").attr("id") != "ie6" && $("html").attr("id") != "ie7" && $("html").attr("id") != "ie8" ){
          //requeteAjaxMenuNav(this.href, true, this);
	//}
      });
    });
    var t=setTimeout(this.ouvreMenu,1000);
    
  }
  
  this.ouvreMenu = function(){
    console.log("ouvreMenu");
    self.menu.open();
  }
  
  this.fermeMenu = function(){
    self.menu.close();
  }
  
  this.updateHeight = function() {
    self.menuElements.css('height',window.innerHeight + 'px');
    //stroll.bind($(newsList));
  }
  
  /**
  * Insere une image
  * 
  * @param {String} type source de l'image
  */
  function insereBigVignette( srcImage, lblImage ) {
    return '<img src="img/menu/'+ srcImage +'"><div class="labelImage">'+lblImage+'</div>';
  }
  
  function synchroniseOuverture(){
    console.log("synchroniseOuverture");
    swipeBindtoMeny();
  }

  function synchroniseFermeture(){
    swipeBindtoContent();
  }
  
  function swipeBindtoContent(){
    //self.menu.unbindEvents();
}

  function swipeBindtoMeny(){
    console.log("swipeBindtoMeny");
    self.menu.bindEvents();
  }
  
  function onSwipeLeftContent( event ) {
    //alert("onSwipeLeftContent");
    if(!self.menu.isOpen())
    {
      self.menu.open();
    }
  }
  function onSwipeRightContent( event ) {
    //alert("onSwipeRightContent");
  }
}