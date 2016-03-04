(function() {
    angular
        .module('pfcards')
        .directive('pfContact', pfContact)
        .controller('pfContactController', pfContactController);

    function pfContact() {
        var directive = {
            restrict: 'AE',
            templateUrl: 'contact/contact.html',
            scope: {},
            controller: 'pfContactController as vm',
            bindToController: true
        };

        return directive;
    }

    /*@ngInject*/
    function pfContactController() {
        var vm = this;
        vm.phone = '555-555-5555';
        vm.mobile = '555-555-5555';
        vm.email = 'test@testerson.com';

        vm.save = save;

        function save() {
            $log.debug('saveing', vm.id);
        }
    }

}());
