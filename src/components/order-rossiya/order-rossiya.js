
angular.module('app').component('orderRossiya', {
    templateUrl: 'components/order-rossiya/order-rossiya.html',
    controller: ['$scope', '$window', '$timeout', 'backend', 'utils', 'redirect', 'fancyboxTools', OrderController],
    controllerAs: 'vm',
    bindings: {
        orderInfo: '='
    }
});

function OrderController($scope, $window, $timeout, backend, utils, redirect, fancyboxTools) {

    var vm = this;
    vm.loading = true;
    vm.errorMessage = false;
    vm.choosePayMethodFailMsg = false;
    vm.openExchange = redirect.goToExchange;
    vm.openRefund = redirect.goToRefund;
    vm.openAddServices = redirect.goToAddServices;
    vm.suffixCount = utils.suffixCount;
    vm.retryPayment = retryPayment;
    vm.bindOrder = bindOrder;
    vm.checkAllPassengersHavePaidService = checkAllPassengersHavePaidService;
    vm.clearSession = clearSession;

    $scope.$on('popupChoosePayMethodChoosePayMethodFailMsg', function (event, data) {
        vm.choosePayMethodFailMsg = data;
    });

    $scope.$on('popupChoosePayMethodPending', function (event, data) {
        vm.popupChoosePayMethodPending = data;
    });

    vm.$onInit = function () {
        var resultParam = utils.getParamFromLocation('result');

        if (resultParam === 'success') {
            if (
                vm.orderInfo.header &&
                (
                    vm.orderInfo.header.status === 'being_paid' ||
                    vm.orderInfo.header.status === 'being_paid_for_exchange'
                )
            ) {
                backend.waitPayment(vm.orderInfo.header.regnum, vm.orderInfo.header.lastName).then(function () {
                    $window.location = (
                        './order?pnr=' + vm.orderInfo.header.regnum + '&lastName=' + vm.orderInfo.header.lastName + '&result=success'
                    );
                    return;
                }, function () {
                    vm.loading = false;
                });
            } else {
                vm.loading = false;
            }
        } else {
            // Платежный фрэйм открывается независимо от статуса заказа
            // Необходимое условие для оплаты онлайн страховок
            if (!vm.orderInfo.hasFailedServices && vm.orderInfo.paymentRedirectTo) {
                vm.showPaymentFrame = true;
            }
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
                fancyboxTools.openHandler('popupRemovedServicesWarningByOrder', false, {
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

        if (vm.orderInfo && vm.orderInfo.plainFlights) {
            vm.hasVKO = vm.orderInfo.plainFlights.some(function (flight) {
                return flight.originport === 'VKO';
            });
        }

    };

    function retryPayment(removeInsuranceAeroexpress) {
        vm.loading = true;
        backend.retryRegister(removeInsuranceAeroexpress).then(function (resp) {
            if (resp.pnr && resp.lastName) {
                $window.location = './order?pnr=' + resp.pnr + '&lastName=' + resp.lastName;
            } else if (resp.eraseAeroexpressBecauseOfCurrency || resp.eraseInsuranceBecauseOfCurrency) {
                fancyboxTools.openHandler('popupChangeCurrencyError', false, {
                    eraseAeroexpressBecauseOfCurrency: resp.eraseAeroexpressBecauseOfCurrency,
                    eraseInsuranceBecauseOfCurrency: resp.eraseInsuranceBecauseOfCurrency,
                    mode: 'retryRegister',
                    submitCallback: retryPayment
                });
            }
            vm.loading = false;
        }, function (resp) {
            vm.loading = false;
            vm.errorMessage = resp.error;
        });
    }

    function bindOrder() {
        if (!vm.orderInfo.header || !vm.orderInfo.header.regnum) {
            return;
        }
        vm.loading = true;
        backend.bindOrder(vm.orderInfo.header.regnum, vm.orderInfo.header.lastName).then(function () {
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
        backend.clearSession().then(redirect.goToSearchOrder);
    }

}
