(function () {
        'use strict';

        angular
            .module('app')
            .controller('UploadController', UploadController);

        UploadController.$inject = ['$location', 'AuthenticationService', 'FlashService', '$rootScope', '$scope', '$http'];

        function UploadController($location, AuthenticationService, FlashService, $rootScope, $scope, $http) {
            var vm = this;

            vm.verify = true;

            vm.upload = upload;

            vm.body = {
                aadharId: "",
                otp: ""
            }

            function upload() {
                vm.dataLoading = true;
                var data;
                //            console.log(getprivatekey());
                return $http.post('http://139.59.89.16:8000/api/aadhar', vm.body).then(function (response) {
                        data = response.data;
                    })
                    .then(() => console.log(data))
                    .then(() => saveaadhardata(data))
                    .then(() => console.log(getaadhardata()))
                    .then(() => encrypt(getaadhardata().toString()))
                    .then(() => console.log(getdatakey()))
                    .then(() => {
                            var encrypt = new JSEncrypt();
                            encrypt.setPublicKey('MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAM+TiChXhPnkUfnkdTiLhgbca5gBwMNOzh0lZvyEZ1ILeXcRZQgpkrQlVrADPby8hwemQKsN06jJfnvG6OXE+10CAwEAAQ==');
                            var encrypted = encrypt.encrypt(getdatakey());
                            saveencrypteddatakey(encrypted);
                            console.log(encrypted);
                            var ipfs_key = 'QmQzLfEpNgtuZCeKZT2ogDxhE9apX8hwsUK2rc5w6C9Ski';
                            var ipfs = window.IpfsApi('http://139.59.89.16', '5001');
                            var payload = {
                                "$class": "org.acme.pehchain.Entity",
                                "Public_Key": CryptoJS.SHA256(getprivatekey()).toString(),
                                "IPFS_Address": ipfs_key,
                                "IPFS_Encrypted_Key": encryptedgetdatakey()
                            }
                           
                            return $http.post('http://139.59.89.16:3000/api/Entity', payload).then().catch((e)=>console.log(e))
                        .then(()=>{
                                 $location.path('/successful');
                            })

                        }).then().catch((e)=>console.log(e));

                    
            }}})();


        function handleError(error) {
            return function () {
                return {
                    success: false,
                    message: error
                };
            };
        }
