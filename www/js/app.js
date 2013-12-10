require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../tpl'
    }
});

require(['jquery', 'meny', 'app/application', 'app/connexion', 'app/menu-navigation'], function ($, Meny, App, Connexion, MenuNavigation) {
  app.initialize();
});