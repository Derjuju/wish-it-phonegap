require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../tpl'
    }
});

require(['jquery', 'meny', 'stroll', 'app/application', 'app/connexion', 'app/menu-navigation'], function ($, Meny, Stroll, App, Connexion, MenuNavigation) {
  app.initialize();
});