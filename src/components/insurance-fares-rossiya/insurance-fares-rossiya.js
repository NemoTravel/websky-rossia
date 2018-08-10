angular.module('wes').component('insuranceFaresRossiya', {
    templateUrl: 'components/insurance-fares-rossiya/insurance-fares-rossiya.html',
    controller: [InsuranceFaresController],
    controllerAs: 'vm',
    bindings: {
        items: '=',
        paxKey: '=',
        pax: '=',
        switch: '='
    }
});

function InsuranceFaresController() {

    var vm = this;

    vm.getInsuranceFullPrice = getInsuranceFullPrice;

    function getInsuranceFullPrice(item) {
        return {
            value: item.price || Big(item.insurance_premium || 0).plus(item.luggage_premium || 0).toFixed(2),
            currency: item.currency
        };
    }

}
