angular.module('wes').component('insuranceFaresSwitchAll', {
    templateUrl: 'components/insurance-fares-switch-all/insurance-fares-switch-all.html',
    controller: ['backend', InsuranceFaresSwitchAllController],
    controllerAs: 'vm',
    bindings: {
        active: '<',
        item: '<'
    }
});

function InsuranceFaresSwitchAllController(backend) {

    var vm = this;

    vm.switch = switchState;

    function switchState() {

        if (vm.active) {
            backend.modifyExtraService({
                code: 'insuranceOnline',
                ins: vm.item.ins,
                tins: vm.item.tins,
                productCode: vm.item.productCode
            });
        } else {
            backend.removeExtraService({
                code: 'insuranceOnline'
            });
        }

    }

}
