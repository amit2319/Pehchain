(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', '$rootScope', '$http'];

    function LoginController($location, AuthenticationService, FlashService, $rootScope, $http) {
        var vm = this;

        vm.login = login;

        function login() {
            vm.dataLoading = true;
                var payload = {
                    " $class ":  "org.acme.pehchain.makeVerification",
                    "Public_Key_Owner":  "1234567890",
                    "Private_Key_Verifier": getprivatekey(),
                }

                return $http.post('http://139.59.89.16:3000/api/makeVerification', payload).then().catch((e) => console.log(e))
                    .then(() => {
                        $location.path('/successful');
                    })

            
        };
    }

})();
