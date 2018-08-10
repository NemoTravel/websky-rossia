angular.module('wes').component('esInsuranceRossiya', {
    templateUrl: 'components/es-insurance-rossiya/es-insurance-rossiya.html',
    controller: ['backend', '$scope', InsuranceController],
    controllerAs: 'vm',
    bindings: {
        service: '=service',
        locked: '=locked'
    }
});

function InsuranceController(backend, $scope) {

    var vm = this;

    vm.switchService = switchService;
    vm.switchServiceItem = switchServiceItem;

    vm.orderInfo = backend.getOrderInfo();

    $scope.$watch('vm.service', function () {
        vm.isAllPassengersActive = vm.service.itemsByPassengers.every(function (paxServices) {
            return !!_.findWhere(paxServices, { selected: true });
        });
    });

    function switchService() {
        if (!vm.locked) {
            vm.service.active = !vm.service.active;
            if (vm.service.active) {
                if (vm.service.items.length === 1) {
                    backend.modifyExtraService(getInsuranceSubmitParams(vm.service.items[0]));
                }
            } else {
                backend.removeExtraService({
                    code: vm.service.onlineMode ? 'insuranceOnline' : 'insurance'
                });
            }
        }
    }

    function switchServiceItem(itemNum, paxKey) {
        if (!vm.locked) {
            if (paxKey === 'common') {
                backend[
                    vm.service.items[itemNum].selected ?
                    'modifyExtraService' :
                    'removeExtraService'
                ](getInsuranceSubmitParams(vm.service.items[itemNum]));
            } else {
                backend[
                    vm.service.itemsByPassengers[paxKey][itemNum].selected ?
                    'modifyExtraService' :
                    'removeExtraService'
                ](
                    getInsuranceSubmitParams(
                        vm.service.itemsByPassengers[paxKey][itemNum],
                        vm.orderInfo.passengers[paxKey].id
                    )
                );
            }
        }
    }

    function getInsuranceSubmitParams(item, passenger_id) {
        var params = {
            code: 'insurance',
            ins: item.ins,
            tins: item.tins
        };
        if (passenger_id) {
            params.passenger_id = passenger_id;
        }
        if (vm.service.onlineMode) {
            params.code = 'insuranceOnline';
            params.productCode = item.productCode;
        }
        return params;
    }

}
