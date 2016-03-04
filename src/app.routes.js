(function() {
    angular
        .module('pfcards')
        .config(config);

    /*@ngInject*/
	function config($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/index');

		$stateProvider
		// Public States
		.state('index', {
            url: '/index',
            templateUrl: 'card-list/card-list.html',
            controller: 'pfCardListController as vm',
            resolve: {
                contacts: ['pfService', function(pfService) {
                    return pfService.getContacts();
                }]
            }
        })
        ;

    }
}());
