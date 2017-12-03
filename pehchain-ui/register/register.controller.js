(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService', '$scope'];

    function RegisterController(UserService, $location, $rootScope, FlashService, $scope) {
        var vm = this;

        vm.register = register;


        var password = {
            "new": "",
            "confirm": ""
        };


        function register() {
            vm.dataLoading = true;
            if ($scope.password.new != $scope.password.confirm){
                FlashService.Error('Passwords Dont Match');
                vm.dataLoading = false;
    
            }
            else{
                var retrievedFingerPrintId = "783k10vn10n1mkac"
                var privatekey = privateKeyHash(retrievedFingerPrintId, $scope.password.new);
                console.log(privatekey);
                saveprivatekey(privatekey);
                $location.path('/upload');
            }
        }
    }

})();
