angular.module('app').run(['$rootScope', 'backend', function ($rootScope, backend) {
    $rootScope.hasSomeTrueInArray = function (list) {
        if (list && list.length) {
            return list.some(function (item) {
                return !!item;
            });
        }
    }
}]);
