angular
    .module('app.directives')
        .directive('backLink', backLink);

function backLink() {
    var directive = {
            restrict: 'E',
            template: '<button class="btn">{{back}}</button>',
            scope: {
                back: '@back'
            },
            link: link
        };
    return directive;


    function link(scope, element, attrs) {
        element.on('click', function() {
             history.back();
             scope.$apply();
         });
    }
}