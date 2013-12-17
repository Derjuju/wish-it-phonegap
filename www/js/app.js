require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../tpl'
    }
});

require(['jquery', 'meny', 'iscroll', 'app/application', 'app/connexion', 'app/menu-navigation', 'app/contenu-principal'], function ($, Meny, iScroll, App, Connexion, MenuNavigation, ContenuPrincipal) {
  app.initialize();
});