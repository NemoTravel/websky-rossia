
angular.module('app').component('orderRossiya', {
    templateUrl: 'components/order-rossiya/order-rossiya.html',
    controller: ['$window', '$timeout', 'backend', 'utils', 'redirect', 'fancyboxTools', OrderRossiyaController],
    controllerAs: 'vm',
    bindings: {
        pnr: '=pnr',
        lastName: '=lastname'
    }
});

function OrderRossiyaController($window, $timeout, backend, utils, redirect, fancyboxTools) {

    var vm = this;
    vm.loading = true;
    vm.errorMessage = false;
    vm.openExchange = redirect.goToExchange;
    vm.openRefund = redirect.goToRefund;
    vm.openAddServices = redirect.goToAddServices;
    vm.suffixCount = utils.suffixCount;
    vm.retryPayment = retryPayment;
    vm.bindOrder = bindOrder;
    vm.checkAllPassengersHavePaidService = checkAllPassengersHavePaidService;
    vm.clearSession = clearSession;

    backend.searchOrder(vm.pnr, vm.lastName).then(function (orderInfo) {

        var resultParam = utils.getParamFromLocation('result');

        vm.orderInfo = orderInfo;

        if (
            vm.orderInfo.header &&
            (
                vm.orderInfo.header.status === 'being_paid' ||
                vm.orderInfo.header.status === 'being_paid_for_exchange'
            )
        ) {
            if (resultParam === 'success') {
                backend.waitPayment(vm.pnr, vm.lastName).then(function () {
                    $window.location = './order?pnr=' + vm.pnr + '&lastName=' + vm.lastName + '&result=success';
                    return;
                }, function () {
                    vm.loading = false;
                });
            } else {
                if (!vm.orderInfo.hasFailedServices) {
                    vm.showPaymentFrame = true;
                }
                vm.loading = false;
            }
        } else {
            vm.loading = false;
        }

        if (
            vm.orderInfo.hasFailedServices &&
            !resultParam &&
            vm.orderInfo.header &&
            (
                vm.orderInfo.header.status === 'being_paid' ||
                vm.orderInfo.header.status === 'booked'
            )
        ) {
            $timeout(function () {
                fancyboxTools.openHandler('popupRemovedServicesWarning', false, {
                    submitCallback: function () {
                        if (vm.orderInfo.paymentRedirectTo) {
                            vm.showPaymentFrame = true;
                        }
                        vm.ignoreFailedServices = true;
                    },
                    disableOutsideCloseClick: true
                });
            });
        }


        if (
            backend.getParam('ffp.enable') &&
            (vm.orderInfo.hasBonusCard || vm.orderInfo.ffpSumm)
        ) {
            backend.ffpBonus().then(function (resp) {
                vm.ffpBonus = resp.total || 0;
            });
        }

    }, function (resp) {
        vm.loading = false;
        vm.errorMessage = resp.error;
    });

    function retryPayment() {
        vm.loading = true;
        backend.retryRegister().then(function (resp) {
            if (resp.lastName && resp.pnr) {
                $window.location = './order?pnr=' + vm.pnr + '&lastName=' + vm.lastName;
            } else {
                vm.loading = false;
            }
        }, function (resp) {
            vm.loading = false;
            vm.errorMessage = resp.error;
        });
    }

    function bindOrder() {
        vm.loading = true;
        backend.bindOrder(vm.pnr, vm.lastName).then(function () {
            vm.loading = false;
            vm.orderInfo.bindAlowed = false;
            vm.showBindOrderSuccessMessage = true;
            $timeout(function () {
                vm.showBindOrderSuccessMessage = false;
            }, 10000);
        }, function () {
            vm.loading = false;
            vm.showBindOrderFailMessage = true;
            $timeout(function () {
                vm.showBindOrderFailMessage = false;
            }, 10000);
        });
    }

    function checkAllPassengersHavePaidService(name) {
        var result = true;
        vm.orderInfo.passengers.forEach(function (passenger, passengerNum) {
            if (
				vm.orderInfo.allExtraServicesByPassengers &&
				vm.orderInfo.allExtraServicesByPassengers[passengerNum] &&
				vm.orderInfo.allExtraServicesByPassengers[passengerNum].passengerSegmentServices
			) {
				vm.orderInfo.allExtraServicesByPassengers[passengerNum].passengerSegmentServices.forEach(
					function (segmentServices) {
						var segmentWantedService = _.findWhere(segmentServices, { code: name });
						if (
							!segmentServices || !segmentWantedService ||
							(
								segmentWantedService &&
								segmentWantedService.serviceItem &&
								segmentWantedService.serviceItem.status !== 'ISSUED_WITH_EMD'
							)
						) {
							result = false;
						}
					}
				);
			} else {
				result = false;
			}
        });
        return result;
    }

    function clearSession() {
        backend.clearSession().then(function () {
            redirect.goToSearchOrder();
        });
    }

}
