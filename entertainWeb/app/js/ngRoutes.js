// ngRoutes.js


app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider

            .when('/home', {
                templateUrl: 'templates/home.html'
            })

            .when('/tasty', {
                templateUrl: 'templates/tasty.html'
            })

            .when('/users', {
                templateUrl: 'templates/users.html'
            })
 }
]);