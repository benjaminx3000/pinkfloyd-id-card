(function() {
    angular
        .module('pfcards')
        .directive('pfContact', pfContact)
        .controller('pfContactController', pfContactController);

    function pfContact() {
        var directive = {
            restrict: 'AE',
            templateUrl: 'contact/contact.html',
            scope: {contact: '='},
            controller: 'pfContactController as vm',
            bindToController: true
        };

        return directive;
    }

    /*@ngInject*/
    function pfContactController($log) {
        var vm = this;
        //public fields
        vm.classes = 'primary-' + vm.contact.primaryColor + ' cta-' + vm.contact.ctaColor;

        //public methods
        vm.save = save;
        ///////////////
        function save() {
            $log.debug('saveing', vm.id);
            vm.isEditing = false;
        }
    }

}());
