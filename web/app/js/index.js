var app = angular.module("entertainMe", ['ngRoute', 'ui.router'])

app.config(function($stateProvider){
    $stateProvider.state('home', {url: '/home', templateUrl: '...', controller: '...'})
});