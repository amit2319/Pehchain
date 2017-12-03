(function () {
    'use strict';

    angular
        .module('app')
        .controller('SuccessfulController', SuccessfulController);

    SuccessfulController.$inject = ['$location', 'AuthenticationService', 'FlashService', '$rootScope'];
    function SuccessfulController($location, AuthenticationService, FlashService, $rootScope) {
        var vm = this;

    }

})();
