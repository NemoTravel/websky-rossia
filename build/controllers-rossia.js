!function e(r,s,n){function t(i,o){if(!s[i]){if(!r[i]){var c="function"==typeof require&&require;if(!o&&c)return c(i,!0);if(a)return a(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var d=s[i]={exports:{}};r[i][0].call(d.exports,function(e){var s=r[i][1][e];return t(s?s:e)},d,d.exports,e,r,s,n)}return s[i].exports}for(var a="function"==typeof require&&require,i=0;i<n.length;i++)t(n[i]);return t}({1:[function(e,r,s){"use strict";angular.module("app").component("babyBassinetIconLegend",{templateUrl:"components/baby-bassinet-icon-legend/baby-bassinet-icon-legend.html"})},{}],2:[function(e,r,s){"use strict";angular.module("app").component("babyBassinetIconTooltip",{templateUrl:"components/baby-bassinet-icon-tooltip/baby-bassinet-icon-tooltip.html"})},{}],3:[function(e,r,s){"use strict";angular.module("app").component("babyBassinetIcon",{templateUrl:"components/baby-bassinet-icon/baby-bassinet-icon.html",controller:function(){},controllerAs:"vm",bindings:{rfisc:"=rfisc",active:"=active",disabled:"=disabled"}})},{}],4:[function(e,r,s){"use strict";function n(e,r){function s(){a.locked||(a.service.active=!a.service.active,a.service.active?1===a.service.items.length&&e.modifyExtraService(t(a.service.items[0])):e.removeExtraService({code:a.service.onlineMode?"insuranceOnline":"insurance"}))}function n(r,s){a.locked||("common"===s?e[a.service.items[r].selected?"modifyExtraService":"removeExtraService"](t(a.service.items[r])):e[a.service.itemsByPassengers[s][r].selected?"modifyExtraService":"removeExtraService"](t(a.service.itemsByPassengers[s][r],a.orderInfo.passengers[s].id)))}function t(e,r){var s={code:"insurance",ins:e.ins,tins:e.tins};return r&&(s.passenger_id=r),a.service.onlineMode&&(s.code="insuranceOnline",s.productCode=e.productCode),s}var a=this;a.switchService=s,a.switchServiceItem=n,a.orderInfo=e.getOrderInfo(),r.$watch("vm.service",function(){a.isAllPassengersActive=a.service.itemsByPassengers.every(function(e){return!!_.findWhere(e,{selected:!0})})})}angular.module("wes").component("esInsuranceRossiya",{templateUrl:"components/es-insurance-rossiya/es-insurance-rossiya.html",controller:["backend","$scope",n],controllerAs:"vm",bindings:{service:"=service",locked:"=locked"}})},{}],5:[function(e,r,s){"use strict";function n(e,r,s,n){function t(){E.locked||s.checkServiceRemovalProhibited("meal")||(E.service.active=!E.service.active,E.service.active?o():s.removeExtraService({code:"meal"}))}function a(e,r,n){0>n&&(E.locked||s.modifyExtraService({code:"meal",passenger_id:E.orderInfo.passengers[E.selectedPassenger].id,segment_id:E.orderInfo.plainFlights[E.selectedFlight].id,subgroup:E.service.subgroups[e],amount:(r.alreadySelectedCount||0)+n,service_type:r.serviceType,rfisc:r.rfisc})),!y(E.selectedPassenger,E.selectedFlight)&&n>0&&(E.locked||s.modifyExtraService({code:"meal",passenger_id:E.orderInfo.passengers[E.selectedPassenger].id,segment_id:E.orderInfo.plainFlights[E.selectedFlight].id,subgroup:E.service.subgroups[e],amount:(r.alreadySelectedCount||0)+n,service_type:r.serviceType,rfisc:r.rfisc}))}function i(e,r){E.selectedFlight=e,E.selectedPassenger=r,c()}function o(){E.selectedFlight=v(),E.selectedPassenger=h(E.selectedFlight),c()}function c(){E.mealMenu=l(E.service.itemsByPassengerSegments[E.selectedPassenger][E.selectedFlight]),void 0===E.mealMenuSubgroup&&(E.mealMenuSubgroup=!1)}function l(e){var r=[];return e&&e.length&&e.forEach(function(e,s){e&&e.length&&e.forEach(function(e){e.subgroupNum=s,r.push(e)})}),r}function d(e,r){var n=g(E.selectedPassenger,E.selectedFlight),t={code:"meal",passenger_id:E.orderInfo.passengers[E.selectedPassenger].id,segment_id:E.orderInfo.plainFlights[E.selectedFlight].id,subgroup:E.service.subgroups[e],service_type:r.serviceType,rfisc:r.rfisc};E.locked||(n&&!s.checkServiceRemovalProhibited("meal",E.selectedPassenger,E.selectedFlight)?s.removeExtraService({code:"meal",passenger_id:E.orderInfo.passengers[E.selectedPassenger].id,segment_id:E.orderInfo.plainFlights[E.selectedFlight].id,service_type:n.serviceType,rfisc:n.rfisc},!0).then(function(){s.modifyExtraService(t)}):s.modifyExtraService(t))}function u(e,r){E.locked||s.checkServiceRemovalProhibited("meal",e,r)||s.removeExtraService({code:"meal",passenger_id:E.orderInfo.passengers[e].id,segment_id:E.orderInfo.plainFlights[r].id})}function g(e,r){var s,n,t;return E.orderInfo.editableExtraServicesByPassengers&&E.orderInfo.editableExtraServicesByPassengers[e]&&(n=E.orderInfo.editableExtraServicesByPassengers[e].passengerSegmentServices[r],n&&(t=_.findWhere(n,{code:"meal"}),t&&(s=t.serviceItem))),s}function f(){F.scrollTo(0)}function m(){F.scrollTo(F[0].scrollWidth)}function p(){var r=F[0].scrollLeft,s=F[0].scrollWidth,n=F[0].clientWidth,t=s-n-r;E.canScrollRight=0!==t,E.canScrollLeft=0!==r,e.$apply()}function v(){var e;for(e=0;e<E.orderInfo.plainFlights.length;e++)if(E.service.availableBySegments[e])return e;return-1}function h(e){var r;if(E.service.availableByPassengerSegments)for(r=0;r<E.orderInfo.passengers.length;r++)if(E.service.availableByPassengerSegments[r][e])return r;return-1}function b(){for(var e=0;e<E.orderInfo.plainFlights.length;e++)for(var r=0;r<E.orderInfo.passengers.length;r++)if(g(r,e))return!0;return!1}function y(e,r){var s=I(e,r),n=S(e,r),t=s+n;return t>2}function S(e,r){var s=0;return E.orderInfo.groupedEditableExtraServices&&E.orderInfo.groupedEditableExtraServices.meal&&E.orderInfo.groupedEditableExtraServices.meal[e]&&E.orderInfo.groupedEditableExtraServices.meal[e][r]&&E.orderInfo.groupedEditableExtraServices.meal[e][r].length?s=E.orderInfo.groupedEditableExtraServices.meal[e][r].length:0}function I(e,r){var s=0;if(E.orderInfo.groupedIssuedExtraServices&&E.orderInfo.groupedIssuedExtraServices.meal&&E.orderInfo.groupedIssuedExtraServices.meal[e]&&E.orderInfo.groupedIssuedExtraServices.meal[e][r]&&E.orderInfo.groupedIssuedExtraServices.meal[e][r].length)for(var n=0;n<E.orderInfo.groupedIssuedExtraServices.meal[e][r].length;n++)s+=E.orderInfo.groupedIssuedExtraServices.meal[e][r][n].amount;return s}function P(e){for(var r={group:0,meal:{}},s=0;s<E.mealMenu.length;s++)E.mealMenu[s].rfisc==e.rfisc&&(r.meal=E.mealMenu[s],r.group=E.mealMenu[s].subgroupNum);return r}function x(e){return e&&e.length&&(e=e.map(function(e){return e&&e.length&&(e=e.map(function(e){var r=[];return e&&e.length&&(e.forEach(function(e){var s;if(e&&e.amount){s=angular.copy(e),s.amount=1,s.totalPrice=Big(e.totalPrice).div(e.amount).toFixed(2);for(var n=0;n<e.amount;n++)r.push(s)}}),e=r),e})),e})),e}var E=this,F=r.find("div.passengersTableContainer");E.switchService=t,E.selectFlightPassenger=i,E.selectFirstAvailablePassengerFlight=o,E.setPassengerFlightMeal=d,E.removePassengerFlightMeal=u,E.getSelectedPassengerFlightMeal=g,E.scrollToStart=f,E.scrollToEnd=m,E.checkAllChoose=b,E.mealCountChangeHandler=a,E.hasAlias=s.hasAlias,E.getAvailablePassengersCount=n.getAvailablePassengersCount,E.checkServiceRemovalProhibited=s.checkServiceRemovalProhibited,E.getLimitStatus=y,E.getMealInfo=P,E.canScrollRight=!0,E.canScrollLeft=!1,E.selectedFlight=0,E.selectedPassenger=0,s.getParam("site.externalStorageBaseUrl")?E.mealImagesPath=s.getParam("site.externalStorageBaseUrl")+"/img/content/meal":E.mealImagesPath="./themes/websky/assets/static/img/content/meal",s.addOrderInfoListener(function(e){e&&e.groupedEditableExtraServices&&e.groupedEditableExtraServices.meal&&(e.groupedEditableExtraServices.meal=x(e.groupedEditableExtraServices.meal)),E.orderInfo=e},!1,!0),e.$watch("vm.service",function(){E.mealMenu&&c()}),F.on("scroll",p),E.service.active&&c()}angular.module("app").component("esMealRossiya",{templateUrl:"components/es-meal-rossiya/es-meal-rossiya.html",controller:["$scope","$element","backend","utils",n],controllerAs:"vm",bindings:{service:"=service",locked:"=locked"}})},{}],6:[function(e,r,s){"use strict";function n(e,r,s,n,t){function a(){B.locked||n.checkServiceRemovalProhibited("seat")||(B.service.active=!B.service.active,B.service.active?l():(B.modifyError=!1,n.removeExtraService({code:"seat"}).then(function(){i(),B.orderInfo.editable_extra_services&&_.findWhere(B.orderInfo.editable_extra_services,{code:"babyBassinet"})&&n.removeExtraService({code:"babyBassinet"})},function(e){e.error&&(B.modifyError=e.error)})))}function i(){B.seatMap=!1,B.selectedFlight=-1,B.selectedPassenger=-1}function o(e){k=e?"0px":jQuery(".passengersSeatMap").find(".mCSB_container").css("top")}function c(e,r){o(B.selectedFlight!==e),B.selectedFlight=e,B.selectedPassenger=r,d()}function l(){B.selectedFlight=v(),B.selectedPassenger=h(B.selectedFlight),d()}function d(){-1!==B.selectedPassenger&&-1!==B.selectedFlight&&(B.loadingSeatMap=!0,B.seatMapError=!1,n.seatMap(B.orderInfo.passengers[B.selectedPassenger].id,B.orderInfo.plainFlights[B.selectedFlight].id).then(function(e){B.seatMap=e,B.seatMap.hasSeatsWithBabyBassinet=g(e),B.seatMap.hasSeatsWithBabyBassinet&&(B.seatMap.babyBassinetCost=u()),B.loadingSeatMap=!1,s(function(){jQuery(".passengersSeatMap").find(".mCSB_container").css("top",k)})},function(e){B.seatMapError=e.error,B.loadingSeatMap=!1}))}function u(e,r){var s;return B.babyBassinetService&&B.babyBassinetService.itemsByPassengerSegments&&B.babyBassinetService.itemsByPassengerSegments[B.selectedPassenger]&&B.babyBassinetService.itemsByPassengerSegments[B.selectedPassenger][B.selectedFlight]&&(s=t.getFirstNotEmptySubListItem(B.babyBassinetService.itemsByPassengerSegments[B.selectedPassenger][B.selectedFlight]),s&&s.price&&s.currency)?{value:s.price,currency:s.currency}:void 0}function g(e){var r=!1;return e&&e.decks&&e.decks.forEach(function(e){e&&e.cabins&&e.cabins.forEach(function(e){e&&e.rows&&e.rows.forEach(function(e){e&&e.chairs&&e.chairs.forEach(function(e){f(e)&&(r=!0)})})})}),r}function f(e){var r=!1;return e&&e.properties&&e.properties.forEach(function(s){"babyBassinet"===s&&(r=!0,e.hasBabyBassinet=!0)}),r}function m(e,r,s){var a,i=B.orderInfo.passengers[B.selectedPassenger].id,o=B.orderInfo.plainFlights[B.selectedFlight].id;B.locked||e.available&&r&&(k=jQuery(".passengersSeatMap").find(".mCSB_container").css("top"),B.modifyError=!1,n.modifyExtraService({code:"seat",passenger_id:i,segment_id:o,value:s+e.number,subgroup:B.service.commonSubgroup,rfisc:e.rfisc||"",service_type:"F"}).then(function(){d(),f(e)?B.babyBassinetService&&B.babyBassinetService.itemsByPassengerSegments&&B.babyBassinetService.itemsByPassengerSegments[B.selectedPassenger]&&B.babyBassinetService.itemsByPassengerSegments[B.selectedPassenger][B.selectedFlight]&&(a=t.getFirstNotEmptySubListItem(B.babyBassinetService.itemsByPassengerSegments[B.selectedPassenger][B.selectedFlight]),a&&a.serviceType&&a.rfisc&&n.modifyExtraService({code:"babyBassinet",passenger_id:i,segment_id:o,subgroup:B.babyBassinetService.commonSubgroup,rfisc:a.rfisc,service_type:a.serviceType})):x(i,o)},function(e){e.error&&(B.modifyError=e.error)}))}function p(){B.sunInfoByFlights=[],B.orderInfo.plainFlights.forEach(function(e,r){n.sunInfo(e.origincity,e.departuredate,e.departuretime,e.destinationcity,e.arrivaldate,e.arrivaltime).then(function(e){B.sunInfoByFlights[r]=e})})}function v(){var e;for(e=0;e<B.orderInfo.plainFlights.length;e++)if(B.service.availableBySegments[e])return e;return-1}function h(e){var r;if(B.service.availableByPassengerSegments)for(r=0;r<B.orderInfo.passengers.length;r++)if(B.service.availableByPassengerSegments[r][e])return r;return-1}function b(){M.scrollTo(0)}function y(){M.scrollTo(M[0].scrollWidth)}function S(){var r=M[0].scrollLeft,s=M[0].scrollWidth,n=M[0].clientWidth,t=s-n-r;B.canScrollRight=0!==t,B.canScrollLeft=0!==r,e.$apply()}function I(e){var r=t.getAvailablePassengersCount(e);return r+B.orderInfo.passengers.filter(function(e){return!e.hasSeats}).length}function P(e,r){var s=B.orderInfo.passengers[e].id,t=B.orderInfo.plainFlights[r].id;B.locked||n.checkServiceRemovalProhibited("seat",e,r)||(B.modifyError=!1,n.removeExtraService({code:"seat",passenger_id:s,segment_id:t}).then(function(){x(s,t),B.selectedFlight===r&&d()},function(e){e.error&&(B.modifyError=e.error)}))}function x(e,r){B.orderInfo.editableExtraServicesHeap&&_.findWhere(B.orderInfo.editableExtraServicesHeap,{groupCode:"babyBassinet",mainSegmentId:r,passengerId:e})&&n.removeExtraService({code:"babyBassinet",passenger_id:e,segment_id:r})}function E(e,r){var s,n,t;return B.orderInfo.editableExtraServicesByPassengers&&B.orderInfo.editableExtraServicesByPassengers[e]&&(n=B.orderInfo.editableExtraServicesByPassengers[e].passengerSegmentServices[r],n&&(t=_.findWhere(n,{code:"seat"}),t&&(s=t.serviceItem))),s}function F(){for(var e=0;e<B.orderInfo.plainFlights.length;e++)for(var r=0;r<B.orderInfo.passengers.length;r++)if(E(r,e))return!0;return!1}var B=this,M=r.find("div.passengersTableContainer"),k="0px";B.switchService=a,B.selectFlightPassenger=c,B.selectFirstAvailablePassengerFlight=l,B.setPassengerFlightSeat=m,B.getSelectedPassengerFlightMeal=E,B.checkAllChoose=F,B.hasAlias=n.hasAlias,B.scrollToStart=b,B.scrollToEnd=y,B.getAvailablePassengersCount=t.getAvailablePassengersCount,B.getAvailablePassengersCountWrap=I,B.removePassengerFlightSeat=P,B.checkServiceRemovalProhibited=n.checkServiceRemovalProhibited,B.canScrollRight=!0,B.canScrollLeft=!1,n.addOrderInfoListener(function(e){B.orderInfo=e},!1,!0),p(),M.on("scroll",S),B.service.active&&l()}angular.module("app").component("esSeatRossiya",{templateUrl:"components/es-seat-rossiya/es-seat-rossiya.html",controller:["$scope","$element","$timeout","backend","utils",n],controllerAs:"vm",bindings:{service:"=service",babyBassinetService:"=",locked:"=locked"}})},{}],7:[function(e,r,s){"use strict";function n(){function e(e){return{value:e.price||Big(e.insurance_premium||0).plus(e.luggage_premium||0).toFixed(2),currency:e.currency}}var r=this;r.getInsuranceFullPrice=e}angular.module("wes").component("insuranceFaresRossiya",{templateUrl:"components/insurance-fares-rossiya/insurance-fares-rossiya.html",controller:[n],controllerAs:"vm",bindings:{items:"=",paxKey:"=",pax:"=","switch":"="}})},{}],8:[function(e,r,s){"use strict";function n(e){function r(){s.active?e.modifyExtraService({code:"insuranceOnline",ins:s.item.ins,tins:s.item.tins,productCode:s.item.productCode}):e.removeExtraService({code:"insuranceOnline"})}var s=this;s["switch"]=r}angular.module("wes").component("insuranceFaresSwitchAll",{templateUrl:"components/insurance-fares-switch-all/insurance-fares-switch-all.html",controller:["backend",n],controllerAs:"vm",bindings:{active:"<",item:"<"}})},{}],9:[function(e,r,s){"use strict";function n(e,r,s,n,t,a){function i(){d.loading=!0,s.retryRegister().then(function(r){r.lastName&&r.pnr?e.location="./order?pnr="+r.pnr+"&lastName="+r.lastName:d.loading=!1},function(e){d.loading=!1,d.errorMessage=e.error})}function o(){d.orderInfo.header&&d.orderInfo.header.regnum&&(d.loading=!0,s.bindOrder(d.orderInfo.header.regnum,d.lastName).then(function(){d.loading=!1,d.orderInfo.bindAlowed=!1,d.showBindOrderSuccessMessage=!0,r(function(){d.showBindOrderSuccessMessage=!1},1e4)},function(){d.loading=!1,d.showBindOrderFailMessage=!0,r(function(){d.showBindOrderFailMessage=!1},1e4)}))}function c(e){var r=!0;return d.orderInfo.passengers.forEach(function(s,n){d.orderInfo.allExtraServicesByPassengers&&d.orderInfo.allExtraServicesByPassengers[n]&&d.orderInfo.allExtraServicesByPassengers[n].passengerSegmentServices?d.orderInfo.allExtraServicesByPassengers[n].passengerSegmentServices.forEach(function(s){var n=_.findWhere(s,{code:e});(!s||!n||n&&n.serviceItem&&"ISSUED_WITH_EMD"!==n.serviceItem.status)&&(r=!1)}):r=!1}),r}function l(){s.clearSession().then(function(){t.goToSearchOrder()})}var d=this;d.loading=!0,d.errorMessage=!1,d.openExchange=t.goToExchange,d.openRefund=t.goToRefund,d.openAddServices=t.goToAddServices,d.suffixCount=n.suffixCount,d.retryPayment=i,d.bindOrder=o,d.checkAllPassengersHavePaidService=c,d.clearSession=l,s.searchOrder(d.pnrOrTicketNumber,d.lastName).then(function(t){var i=n.getParamFromLocation("result");d.orderInfo=t,!d.orderInfo.header||"being_paid"!==d.orderInfo.header.status&&"being_paid_for_exchange"!==d.orderInfo.header.status?d.loading=!1:"success"===i?s.waitPayment(d.orderInfo.header.regnum,d.lastName).then(function(){e.location="./order?pnr="+d.orderInfo.header.regnum+"&lastName="+d.lastName+"&result=success"},function(){d.loading=!1}):(d.orderInfo.hasFailedServices||(d.showPaymentFrame=!0),d.loading=!1),!d.orderInfo.hasFailedServices||i||!d.orderInfo.header||"being_paid"!==d.orderInfo.header.status&&"booked"!==d.orderInfo.header.status||r(function(){a.openHandler("popupRemovedServicesWarning",!1,{submitCallback:function(){d.orderInfo.paymentRedirectTo&&(d.showPaymentFrame=!0),d.ignoreFailedServices=!0},disableOutsideCloseClick:!0})}),s.getParam("ffp.enable")&&(d.orderInfo.hasBonusCard||d.orderInfo.ffpSumm)&&s.ffpBonus().then(function(e){d.ffpBonus=e.total||0})},function(e){d.loading=!1,d.errorMessage=e.error})}angular.module("app").component("orderRossiya",{templateUrl:"components/order-rossiya/order-rossiya.html",controller:["$window","$timeout","backend","utils","redirect","fancyboxTools",n],controllerAs:"vm",bindings:{pnrOrTicketNumber:"=num",lastName:"=lastname"}})},{}],10:[function(e,r,s){"use strict";function n(e,r){function s(e){f.detailedView.open=!0,f.detailedView.mealIndex=e}function n(){f.detailedView.open=!1}function t(){f.detailedView.mealIndex<f.mealMenu.length-1?f.detailedView.mealIndex++:f.detailedView.mealIndex=0}function a(){f.detailedView.mealIndex>0?f.detailedView.mealIndex--:f.detailedView.mealIndex=f.mealMenu.length-1}function i(){f.availablePassengers=f.passengers.filter(function(e,r){return f.service.availableByPassengerSegments[r]&&f.service.availableByPassengerSegments[r][f.currentFlightIndex]})}function o(){f.mealMenuSubgroupMobile===!1?f.mealMenuSubgroup=!1:f.mealMenuSubgroup=1*f.mealMenuSubgroupMobile}function c(){for(var e=!1,r=f.currentPassengerIndex+1;r<f.passengers.length;r++)if(f.service.availableByPassengerSegments[r]&&f.service.availableByPassengerSegments[r][f.currentFlightIndex]){f.selectFlightPassenger(f.currentFlightIndex,r),e=!0;break}if(!e)for(var s=0;s<f.passengers.length;s++)if(f.service.availableByPassengerSegments[s]&&f.service.availableByPassengerSegments[s][f.currentFlightIndex]){f.selectFlightPassenger(f.currentFlightIndex,s);break}}function l(){for(var e=!1,r=f.currentPassengerIndex-1;r>-1;r--)if(f.service.availableByPassengerSegments[r]&&f.service.availableByPassengerSegments[r][f.currentFlightIndex]){f.selectFlightPassenger(f.currentFlightIndex,r),e=!0;break}if(!e)for(var s=f.passengers.length-1;s>-1;s--)if(f.service.availableByPassengerSegments[s]&&f.service.availableByPassengerSegments[s][f.currentFlightIndex]){f.selectFlightPassenger(f.currentFlightIndex,s);break}}function d(e){if(Array.isArray(e)){var r=e.reduce(function(e,r){return e.concat(r)},[]);return f.mealMenuSubgroup===!1?r:e}}function u(e,r){for(var s=0;s<r.length;s++)for(var n=0;n<r[s].length;n++)if(r[s][n].rfisc==e.rfisc)return s}function g(){f.mealMenu=f.mealMenu||[];for(var e=0,r=0;r<f.mealMenu.length;r++)"alreadySelectedPrice"in f.mealMenu[r]&&(e+=+f.mealMenu[r].alreadySelectedPrice);return e}var f=this;f.close=jQuery.fancybox.close,f.mealMenuSubgroupMobileChange=o,f.mealMenuSubgroup=!1,f.mealMenuSubgroupMobile="false",f.subgroupItems=e.createOptionsForUiSelect(f.subgroups,"all"),f.switchNext=c,f.switchPrev=l,f.arrayString=d,f.getGroupMeal=u,f.detailedView={open:!1},f.setItemIndex=s,f.closeItemPopup=n,f.nextItemPopup=t,f.prevItemPopup=a,f.totalAmount=g,r.$watch("vm.currentFlightIndex",function(){i()})}angular.module("app").component("popupMealRossiya",{templateUrl:"components/popup-meal-rossiya/popup-meal-rossiya.html",controller:["utils","$scope",n],controllerAs:"vm",bindings:{mealMenu:"=menu",passenger:"=passenger",currentPassengerIndex:"=",currentFlightIndex:"=",passengers:"=passengers",flight:"=flight",mealCountChangeHandler:"=handler",clearPassengerFlightMeal:"&remove",getPassengerFlightMeal:"=get",subgroups:"=subgroups",mealImagesPath:"=path",service:"=",selectFlightPassenger:"=select",getLimitStatus:"=limit",mealSelect:"=",getMealInfo:"=",issuedMeal:"="}})},{}],11:[function(e,r,s){"use strict";angular.module("app").run(["$rootScope","backend",function(e,r){e.hasSomeTrueInArray=function(e){return e&&e.length?e.some(function(e){return!!e}):void 0}}])},{}],12:[function(e,r,s){"use strict";e("./components/popup-meal-rossiya/popup-meal-rossiya"),e("./components/es-meal-rossiya/es-meal-rossiya"),e("./components/es-seat-rossiya/es-seat-rossiya"),e("./components/order-rossiya/order-rossiya"),e("./components/baby-bassinet-icon/baby-bassinet-icon"),e("./components/baby-bassinet-icon-legend/baby-bassinet-icon-legend"),e("./components/baby-bassinet-icon-tooltip/baby-bassinet-icon-tooltip"),e("./components/insurance-fares-rossiya/insurance-fares-rossiya"),e("./components/insurance-fares-switch-all/insurance-fares-switch-all"),e("./components/es-insurance-rossiya/es-insurance-rossiya"),e("./hasSomeTrueInArray")},{"./components/baby-bassinet-icon-legend/baby-bassinet-icon-legend":1,"./components/baby-bassinet-icon-tooltip/baby-bassinet-icon-tooltip":2,"./components/baby-bassinet-icon/baby-bassinet-icon":3,"./components/es-insurance-rossiya/es-insurance-rossiya":4,"./components/es-meal-rossiya/es-meal-rossiya":5,"./components/es-seat-rossiya/es-seat-rossiya":6,"./components/insurance-fares-rossiya/insurance-fares-rossiya":7,"./components/insurance-fares-switch-all/insurance-fares-switch-all":8,"./components/order-rossiya/order-rossiya":9,"./components/popup-meal-rossiya/popup-meal-rossiya":10,"./hasSomeTrueInArray":11}]},{},[12]);
//# sourceMappingURL=controllers-rossia.js.map
