(function() {
    angular
        .module('pfcards')
        .factory('pfService', pfService);

    /*@ngInject*/
    function pfService($http, $log) {
        var service = {
            getContacts: getContacts
        }

        return service;

        //////////////////

        function getContacts() {
            return $http
                .get('src/skin/js/Cards.json')
                .then(function(result) {
                    $log.debug(result);
                    return result.data;
                }, function(reason) {
                    return reason;
                    $log.error(reason);
                });

        }
    }
}());
