angular.module('app').component('popupMealRossiya', {
	templateUrl: 'components/popup-meal-rossiya/popup-meal-rossiya.html',
	controller: ['utils', '$scope', PopupMealRossiyaController],
	controllerAs: 'vm',
	bindings: {
		mealMenu: '=menu',
		passenger: '=passenger',
		currentPassengerIndex: '=',
		currentFlightIndex: '=',
		passengers: '=passengers',
		flight: '=flight',
		mealCountChangeHandler: '=handler',
		clearPassengerFlightMeal: '&remove',
		getPassengerFlightMeal: '=get',
		subgroups: '=subgroups',
		mealImagesPath: '=path',
		service: '=',
		selectFlightPassenger: '=select',
		getLimitStatus: '=limit',
		mealSelect: '=',
		getMealInfo: '=',
		issuedMeal: '='
	}
});

function PopupMealRossiyaController(utils, $scope) {

	var vm = this;
	vm.close = jQuery.fancybox.close;
	vm.mealMenuSubgroupMobileChange = mealMenuSubgroupMobileChange;
	vm.mealMenuSubgroup = false;
	vm.mealMenuSubgroupMobile = 'false';
	vm.subgroupItems = utils.createOptionsForUiSelect(vm.subgroups, 'all');
	vm.switchNext = switchNext;
	vm.switchPrev = switchPrev;
	vm.arrayString = arrayString;
	vm.getGroupMeal = getGroupMeal;

	vm.detailedView = {open: false};
	vm.setItemIndex = setItemIndex;
	vm.closeItemPopup = closeItemPopup;
	vm.nextItemPopup = nextItemPopup;
	vm.prevItemPopup = prevItemPopup;

	vm.totalAmount = totalAmount;

	function setItemIndex(mealIndex) {

		vm.detailedView.open = true;
		vm.detailedView.mealIndex = mealIndex;

	}

	function closeItemPopup() {
		vm.detailedView.open = false;
	}

	function nextItemPopup() {

		if (vm.detailedView.mealIndex < (vm.mealMenu.length - 1)) {
			vm.detailedView.mealIndex++;
		} else {
			vm.detailedView.mealIndex = 0;
		}

	}

	function prevItemPopup() {

		if (vm.detailedView.mealIndex > 0) {
			vm.detailedView.mealIndex--;
		} else {
			vm.detailedView.mealIndex = vm.mealMenu.length - 1;
		}

	}

	function setAvailablePassengers() {
		vm.availablePassengers = vm.passengers.filter(function (passenger, index) {
			return (
				vm.service.availableByPassengerSegments[index] &&
				vm.service.availableByPassengerSegments[index][vm.currentFlightIndex]
			);
		});
	}

	$scope.$watch('vm.currentFlightIndex', function () {
		setAvailablePassengers();
	});

	function mealMenuSubgroupMobileChange() {
		if (vm.mealMenuSubgroupMobile === false) {
			vm.mealMenuSubgroup = false;
		} else {
			vm.mealMenuSubgroup = vm.mealMenuSubgroupMobile * 1;
		}
	}

	function switchNext() {
		var successSwitch = false;
		for (var i = vm.currentPassengerIndex + 1; i < vm.passengers.length; i++) {

				vm.selectFlightPassenger(vm.currentFlightIndex, i);
				successSwitch = true;
				break;

		}
		if (!successSwitch) {
			for (var j = 0; j < vm.passengers.length; j++) {

					vm.selectFlightPassenger(vm.currentFlightIndex, j);
					break;

			}
		}
	}

	function switchPrev() {
		var successSwitch = false;
		for (var i = vm.currentPassengerIndex - 1; i > -1; i--) {

				vm.selectFlightPassenger(vm.currentFlightIndex, i);
				successSwitch = true;
				break;

		}
		if (!successSwitch) {
			for (var j = vm.passengers.length - 1; j > -1; j--) {

					vm.selectFlightPassenger(vm.currentFlightIndex, j);
					break;

			}
		}
	}

	function arrayString(arrays) {

		if(!Array.isArray(arrays)) return;

		var total = arrays.reduce(function(flat, current) {
			return flat.concat(current);
		}, []);

		if(vm.mealMenuSubgroup === false ) return total;

		return arrays;
	}

	function getGroupMeal(meal, arrays) {

		for (var i = 0; i < arrays.length; i++) {
			for(var j = 0; j < arrays[i].length; j++) {
				if (arrays[i][j]['rfisc'] == meal['rfisc']) {
					return i;
				}
			}
		}
	}

	function totalAmount() {
		vm.mealMenu = vm.mealMenu || [];

		var totalSumm = 0;

		for(var i = 0; i < vm.mealMenu.length; i++) {
			if('alreadySelectedPrice' in vm.mealMenu[i]) {
					totalSumm += +vm.mealMenu[i].alreadySelectedPrice
			}
		}

		return totalSumm;
	}

}
