angular.module('app').component('esMealRossiya', {
    templateUrl: 'components/es-meal-rossiya/es-meal-rossiya.html',
    controller: ['$scope', '$element','backend', 'utils', MealRossiyaController],
    controllerAs: 'vm',
    bindings: {
        service: '=service',
        locked: '=locked'
    }
});

function MealRossiyaController($scope, $element, backend, utils) {

    var vm = this,
        passengersTableContainer = $element.find('div.passengersTableContainer');

    vm.switchService = switchService;
    vm.selectFlightPassenger = selectFlightPassenger;
    vm.selectFirstAvailablePassengerFlight = selectFirstAvailablePassengerFlight;
    vm.setPassengerFlightMeal = setPassengerFlightMeal;
    vm.removePassengerFlightMeal = removePassengerFlightMeal;
    vm.getSelectedPassengerFlightMeal = getSelectedPassengerFlightMeal;
    vm.scrollToStart = scrollToStart;
    vm.scrollToEnd = scrollToEnd;
    vm.checkAllChoose = checkAllChoose;
    vm.mealCountChangeHandler = mealCountChangeHandler;
    vm.hasAlias = backend.hasAlias;
    vm.getAvailablePassengersCount = utils.getAvailablePassengersCount;
    vm.checkServiceRemovalProhibited = backend.checkServiceRemovalProhibited;
    vm.getLimitStatus = getLimitStatus;
    vm.getMealsIssuedLength = getMealsIssuedLength;
    vm.getMealInfo = getMealInfo;

    vm.canScrollRight = true;
    vm.canScrollLeft = false;

    vm.selectedFlight = 0;
    vm.selectedPassenger = 0;

    if (backend.getParam('site.externalStorageBaseUrl')) {
        vm.mealImagesPath = backend.getParam('site.externalStorageBaseUrl') + '/img/content/meal';
    } else {
        vm.mealImagesPath = './themes/websky/assets/static/img/content/meal';
    }

    backend.addOrderInfoListener(function (orderInfo) {
        if (
            orderInfo &&
            orderInfo.groupedEditableExtraServices &&
            orderInfo.groupedEditableExtraServices.meal
        ) {
            orderInfo.groupedEditableExtraServices.meal = splitMeal(orderInfo.groupedEditableExtraServices.meal);
        }
        vm.orderInfo = orderInfo;
    }, false, true);

    $scope.$watch('vm.service', function () {
        if (vm.mealMenu) {
            updateMealMenu();
        }
    });

    passengersTableContainer.on('scroll', mobileTableScrollHandler);

    if (vm.service.active) {
        updateMealMenu();
    }

    function switchService() {
        if (!vm.locked && !backend.checkServiceRemovalProhibited('meal')) {
            vm.service.active = !vm.service.active;
            if (vm.service.active) {
                selectFirstAvailablePassengerFlight();
            } else {
                backend.removeExtraService({
                    code: 'meal'
                });
            }
        }
    }

    function mealCountChangeHandler(subgroupNum, mealItem, delta) {

      if(delta < 0) {
        if (!vm.locked) {
            backend.modifyExtraService({
                code: 'meal',
                passenger_id: vm.orderInfo.passengers[vm.selectedPassenger].id,
                segment_id: vm.orderInfo.plainFlights[vm.selectedFlight].id,
                subgroup: vm.service.subgroups[subgroupNum],
                amount: (mealItem.alreadySelectedCount || 0) + delta,
                service_type: mealItem.serviceType,
                rfisc: mealItem.rfisc
            });
        }
      }

      // if countSumm for all meal > limit, don't plus
      if(!getLimitStatus() && delta > 0) {
        if (!vm.locked) {
            backend.modifyExtraService({
                code: 'meal',
                passenger_id: vm.orderInfo.passengers[vm.selectedPassenger].id,
                segment_id: vm.orderInfo.plainFlights[vm.selectedFlight].id,
                subgroup: vm.service.subgroups[subgroupNum],
                amount: (mealItem.alreadySelectedCount || 0) + delta,
                service_type: mealItem.serviceType,
                rfisc: mealItem.rfisc
            });
        }
      }

    }

    function selectFlightPassenger(flightNum, passengerNum) {
        vm.selectedFlight = flightNum;
        vm.selectedPassenger = passengerNum;
        updateMealMenu();
    }

    function selectFirstAvailablePassengerFlight() {
        vm.selectedFlight = getFirstAvailableFlightNum();
        vm.selectedPassenger = getFirstAvailablePassengerNum(vm.selectedFlight);
        updateMealMenu();
    }

    function updateMealMenu() {
        vm.mealMenu = flattenMealMenu(vm.service.itemsByPassengerSegments[vm.selectedPassenger][vm.selectedFlight]);
        if (vm.mealMenuSubgroup === undefined) {
            vm.mealMenuSubgroup = false;
        }
    }

    function flattenMealMenu(deepMenu) {
        var flatMenu = [];
        if (deepMenu && deepMenu.length) {
            deepMenu.forEach(function (deepMenuItems, subgroupNum) {
                if (deepMenuItems && deepMenuItems.length) {
                    deepMenuItems.forEach(function (deepMenuItem) {
                        deepMenuItem.subgroupNum = subgroupNum;
                        flatMenu.push(deepMenuItem);
                    });
                }
            });
        }
        return flatMenu;
    }

    function setPassengerFlightMeal(subgroupNum, mealItem) {
        var selectedPassengerFlightMeal = getSelectedPassengerFlightMeal(vm.selectedPassenger, vm.selectedFlight),
            newMealParams = {
                code: 'meal',
                passenger_id: vm.orderInfo.passengers[vm.selectedPassenger].id,
                segment_id: vm.orderInfo.plainFlights[vm.selectedFlight].id,
                subgroup: vm.service.subgroups[subgroupNum],
                service_type: mealItem.serviceType,
                rfisc: mealItem.rfisc
            };
        if (!vm.locked) {
            if (
                selectedPassengerFlightMeal &&
                !backend.checkServiceRemovalProhibited('meal', vm.selectedPassenger, vm.selectedFlight)
            ) {
                backend.removeExtraService({
                    code: 'meal',
                    passenger_id: vm.orderInfo.passengers[vm.selectedPassenger].id,
                    segment_id: vm.orderInfo.plainFlights[vm.selectedFlight].id,
                    service_type: selectedPassengerFlightMeal.serviceType,
                    rfisc: selectedPassengerFlightMeal.rfisc
                }, true).then(function () {
                    backend.modifyExtraService(newMealParams);
                });
            } else {
                backend.modifyExtraService(newMealParams);
            }
        }
    }

    function removePassengerFlightMeal(passengerNum, flightNum) {
        if (!vm.locked && !backend.checkServiceRemovalProhibited('meal', passengerNum, flightNum)) {
            backend.removeExtraService({
                code: 'meal',
                passenger_id: vm.orderInfo.passengers[passengerNum].id,
                segment_id: vm.orderInfo.plainFlights[flightNum].id
            });
        }
    }

    function getSelectedPassengerFlightMeal(passengerNum, flightNum) {
        var result,
            passengerSegmentServices,
            passengerSegmentMeal;
        if (vm.orderInfo.editableExtraServicesByPassengers) {
            if (vm.orderInfo.editableExtraServicesByPassengers[passengerNum]) {
                /* jshint maxlen: 150 */
                passengerSegmentServices = vm.orderInfo.editableExtraServicesByPassengers[passengerNum].passengerSegmentServices[flightNum];
                if (passengerSegmentServices) {
                    passengerSegmentMeal = _.findWhere(passengerSegmentServices, { code: 'meal' });
                    if (passengerSegmentMeal) {
                        result = passengerSegmentMeal.serviceItem;
                    }
                }
            }
        }
        return result;
    }

    function scrollToStart() {
        passengersTableContainer.scrollTo(0);
    }

    function scrollToEnd() {
        passengersTableContainer.scrollTo(passengersTableContainer[0].scrollWidth);
    }

    function mobileTableScrollHandler() {
        var scrollLeft = passengersTableContainer[0].scrollLeft,
            scrollWidth = passengersTableContainer[0].scrollWidth,
            clientWidth = passengersTableContainer[0].clientWidth,
            scrollRight = scrollWidth - clientWidth - scrollLeft;
        vm.canScrollRight = (scrollRight !== 0);
        vm.canScrollLeft = (scrollLeft !== 0);
        $scope.$apply();
    }

    function getFirstAvailableFlightNum() {
        var i;
        for (i = 0; i < vm.orderInfo.plainFlights.length; i++) {
            if (vm.service.availableBySegments[i]) {
                return i;
            }
        }
        return -1;
    }

    function getFirstAvailablePassengerNum(flightNum) {
        var i;
        if (vm.service.availableByPassengerSegments) {
            for (i = 0; i < vm.orderInfo.passengers.length; i++) {
                if (vm.service.availableByPassengerSegments[i][flightNum]) {
                    return i;
                }
            }
        }
        return -1;
    }

    function checkAllChoose() {

      for (var i = 0; i < vm.orderInfo.plainFlights.length; i++) {
        for (var j = 0; j < vm.orderInfo.passengers.length; j++) {
          if (getSelectedPassengerFlightMeal(j, i)) {
            return true;
          }
        }
      }

      return false;

    }

    function getLimitStatus(selectedPassenger, selectedFlight) {
      var total = 0;
      if (
          vm.orderInfo.groupedEditableExtraServices &&
          vm.orderInfo.groupedEditableExtraServices.meal &&
          vm.orderInfo.groupedEditableExtraServices.meal[selectedPassenger] &&
          vm.orderInfo.groupedEditableExtraServices.meal[selectedPassenger][selectedFlight] &&
          vm.orderInfo.groupedEditableExtraServices.meal[selectedPassenger][selectedFlight].length
      ) {
        total = vm.orderInfo.groupedEditableExtraServices.meal[selectedPassenger][selectedFlight].length + getMealsIssuedLength(selectedPassenger, selectedFlight);
        return total;
      }
      return 0;
    }

    function getMealsIssuedLength(selectedPassenger, selectedFlight) {
        if (
            vm.orderInfo.groupedIssuedExtraServices &&
            vm.orderInfo.groupedIssuedExtraServices.meal &&
            vm.orderInfo.groupedIssuedExtraServices.meal[selectedPassenger] &&
            vm.orderInfo.groupedIssuedExtraServices.meal[selectedPassenger][selectedFlight] &&
            vm.orderInfo.groupedIssuedExtraServices.meal[selectedPassenger][selectedFlight].length
        ) {
            return vm.orderInfo.groupedIssuedExtraServices.meal[selectedPassenger][selectedFlight].length;
        }
        return 0;
    }

    function getMealInfo(obj) {
      var infoMeal = {
        group: 0,
        meal: {}
      }

      for (var i = 0; i < vm.mealMenu.length; i++) {
        if(vm.mealMenu[i].rfisc == obj.rfisc) {
          infoMeal.meal = vm.mealMenu[i];
          infoMeal.group = vm.mealMenu[i].subgroupNum;
        }
      }

      return infoMeal;
    }

    function splitMeal(selectedMeal) {
        if (selectedMeal && selectedMeal.length) {
            selectedMeal = selectedMeal.map(function (selectedMealPassenger) {
                if (selectedMealPassenger && selectedMealPassenger.length) {
                    selectedMealPassenger = selectedMealPassenger.map(function (selectedMealPassengerSegment) {
                        var newMealList = [];
                        if (selectedMealPassengerSegment && selectedMealPassengerSegment.length) {
                            selectedMealPassengerSegment.forEach(function (selectedMealItem) {
                                var tmpItem;
                                if (selectedMealItem && selectedMealItem.amount) {
                                    tmpItem = angular.copy(selectedMealItem);
                                    tmpItem.amount = 1;
                                    tmpItem.totalPrice = Big(selectedMealItem.totalPrice).div(selectedMealItem.amount).toFixed(2);
                                    for (var i=0; i<selectedMealItem.amount; i++) {
                                        newMealList.push(tmpItem);
                                    }
                                }
                            });
                            selectedMealPassengerSegment = newMealList;
                        }
                        return selectedMealPassengerSegment;
                    });
                }
                return selectedMealPassenger;
            });
        }
        return selectedMeal;
    }

}
