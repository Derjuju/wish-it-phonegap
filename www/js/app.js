require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../tpl'
    }
});

require(['jquery', 'meny', 'stroll', 'iscroll', 'app/application', 'app/connexion', 'app/menu-navigation', 'app/contenu-principal'], function ($, Meny, Stroll, iScroll, App, Connexion, MenuNavigation, ContenuPrincipal) {
  app.initialize();
});