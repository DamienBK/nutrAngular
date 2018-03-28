app.controller('registerForm', function ($scope, $http, $state) {
    $scope.master = {};
    registerForm.$inject = ['$scope', '$http', '$state'];

    $scope.submitForm = function (user, form) {
        if (form.$valid) {
            $http({
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                url: '/api/register',
                data: JSON.stringify({email: user.email, password: user.password})
            }).then(function successCallback(response) {
                $state.go('home')
                // sharedMessageService.message = 'User created successfully';
                $scope.addMessage('User created successfully: ' + user.email, 'success');

            }, function errorCallback(response) {
                $scope.addMessage(response.data.error + ': ' + user.email, 'error');
                // sharedMessageService.message = response.data.error
            });
            $scope.master = angular.copy(user);
        }
    };

    $scope.reset = function (form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        $scope.user = angular.copy($scope.master);
    };

    $scope.reset();
});


app.controller('messageBox', function ($scope) {

    $scope.addMessage = function (message, status) {
        if (message) {
            switch (status) {
                case 'success':
                    $scope.successTextAlert = message
                    $scope.showSuccessAlert = true;

                    break;
                case 'error':
                    $scope.errorTextAlert = message
                    $scope.showErrorAlert = true;
                    break;
            }
        }
    }

    // switch flag
    $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
    };

    // switch flag
    $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
    };

});