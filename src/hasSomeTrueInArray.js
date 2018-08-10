angular.module('app').run(['$rootScope', function ($rootScope) {
    $rootScope.hasSomeTrueInArray = function (list) {
        if (list && list.length) {
            return list.some(function (item) {
                return !!item;
            });
        }
        return false;
    }
}]);
