(function() {
    angular
        .module('pfcards')
        .directive('pfBackground', pfBackground)
        .controller('pfBackgroundController', pfBackgroundController);

    function pfBackground() {
        var directive = {
            restrict: 'AE',
            require: ['pfBackground'],
            controller: 'pfBackgroundController as vm',
            bindToController: true,
            template: '<div class="pf-background"></div>',
            link: function (scope, elem, attrs, ctrls) {
                var directive = ctrls[0];
                directive.element = elem.contents()[0];
            }
        }

        return directive;
    }

    /*@ngInject*/
    function pfBackgroundController($window, $log) {
        var vm = this;
        vm.stageX = $window.outerWidth;
        vm.stageY = $window.outerHeight;
        $window.addEventListener('mousemove', onMouseMove);

        function onMouseMove(evt) {
            vm.element.style.transform = 'translate3d(' + calcMousePercent(evt.x, evt.y) + ')';
        }

        function calcMousePercent(mouseX, mouseY) {
            // $log.debug(mouseX, mouseY)
            return (calcPercent(mouseX / vm.stageX) - 50) + '%,' + (calcPercent(mouseY / vm.stageY) - 50) + '%, 0';
        }

        function calcPercent(decimal) {
            return -0.33 * decimal;
        }
    }

}());
