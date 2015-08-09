'use strict';

//Dancers service used to communicate Dancers REST endpoints
angular.module('dancers')
.factory('Partners', function ($q, $http) {
    return {
        femalePartner: function () {

            var deferred = $q.defer(),
                httpPromise = $http.get('/fdancers');

            httpPromise
                .success(function (components) {
                    deferred.resolve(components);
                })
                .error(function (error) {
                    console.error('Error: ' + error);
                });
            return deferred.promise;
        },
        malePartner: function () {

            var deferred = $q.defer(),
                httpPromise = $http.get('/mdancers');

            httpPromise
                .success(function (components) {
                    deferred.resolve(components);
                })
                .error(function (error) {
                    console.error('Error: ' + error);
                });
            return deferred.promise;
        }
    };
});
