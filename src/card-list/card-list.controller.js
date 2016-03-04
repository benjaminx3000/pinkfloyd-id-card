(function() {
    angular
        .module('pfcards')
        .controller('pfCardListController', pfCardListController);

    /*@ngInject*/
    function pfCardListController(contacts) {
        var vm = this;
        vm.contacts = contacts;
    }
}());
