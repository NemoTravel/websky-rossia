!function e(r,n,s){function a(i,o){if(!n[i]){if(!r[i]){var l="function"==typeof require&&require;if(!o&&l)return l(i,!0);if(t)return t(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var d=n[i]={exports:{}};r[i][0].call(d.exports,function(e){var n=r[i][1][e];return a(n?n:e)},d,d.exports,e,r,n,s)}return n[i].exports}for(var t="function"==typeof require&&require,i=0;i<s.length;i++)a(s[i]);return a}({1:[function(e,r,n){"use strict";angular.module("app").component("babyBassinetIconLegend",{templateUrl:"components/baby-bassinet-icon-legend/baby-bassinet-icon-legend.html"})},{}],2:[function(e,r,n){"use strict";angular.module("app").component("babyBassinetIcon",{templateUrl:"components/baby-bassinet-icon/baby-bassinet-icon.html",controller:function(){},controllerAs:"vm",bindings:{rfisc:"=rfisc",active:"=active",disabled:"=disabled"}})},{}],3:[function(e,r,n){"use strict";function s(e,r,n,s){function a(){S.locked||n.checkServiceRemovalProhibited("meal")||(S.service.active=!S.service.active,S.service.active?o():n.removeExtraService({code:"meal"}))}function t(e,r,s){0>s&&(S.locked||n.modifyExtraService({code:"meal",passenger_id:S.orderInfo.passengers[S.selectedPassenger].id,segment_id:S.orderInfo.plainFlights[S.selectedFlight].id,subgroup:S.service.subgroups[e],amount:(r.alreadySelectedCount||0)+s,service_type:r.serviceType,rfisc:r.rfisc})),!b()&&s>0&&(S.locked||n.modifyExtraService({code:"meal",passenger_id:S.orderInfo.passengers[S.selectedPassenger].id,segment_id:S.orderInfo.plainFlights[S.selectedFlight].id,subgroup:S.service.subgroups[e],amount:(r.alreadySelectedCount||0)+s,service_type:r.serviceType,rfisc:r.rfisc}))}function i(e,r){S.selectedFlight=e,S.selectedPassenger=r,l()}function o(){S.selectedFlight=p(),S.selectedPassenger=v(S.selectedFlight),l()}function l(){S.mealMenu=S.service.itemsByPassengerSegments[S.selectedPassenger][S.selectedFlight],void 0===S.mealMenuSubgroup&&(S.mealMenuSubgroup=!1)}function c(e,r){var s=g(S.selectedPassenger,S.selectedFlight),a={code:"meal",passenger_id:S.orderInfo.passengers[S.selectedPassenger].id,segment_id:S.orderInfo.plainFlights[S.selectedFlight].id,subgroup:S.service.subgroups[e],service_type:r.serviceType,rfisc:r.rfisc};S.locked||(s&&!n.checkServiceRemovalProhibited("meal",S.selectedPassenger,S.selectedFlight)?n.removeExtraService({code:"meal",passenger_id:S.orderInfo.passengers[S.selectedPassenger].id,segment_id:S.orderInfo.plainFlights[S.selectedFlight].id,service_type:s.serviceType,rfisc:s.rfisc},!0).then(function(){n.modifyExtraService(a)}):n.modifyExtraService(a))}function d(e,r){S.locked||n.checkServiceRemovalProhibited("meal",e,r)||n.removeExtraService({code:"meal",passenger_id:S.orderInfo.passengers[e].id,segment_id:S.orderInfo.plainFlights[r].id})}function g(e,r){var n,s,a;return S.orderInfo.editableExtraServicesByPassengers&&S.orderInfo.editableExtraServicesByPassengers[e]&&(s=S.orderInfo.editableExtraServicesByPassengers[e].passengerSegmentServices[r],s&&(a=_.findWhere(s,{code:"meal"}),a&&(n=a.serviceItem))),n}function u(){I.scrollTo(0)}function f(){I.scrollTo(I[0].scrollWidth)}function m(){var r=I[0].scrollLeft,n=I[0].scrollWidth,s=I[0].clientWidth,a=n-s-r;S.canScrollRight=0!==a,S.canScrollLeft=0!==r,e.$apply()}function p(){var e;for(e=0;e<S.orderInfo.plainFlights.length;e++)if(S.service.availableBySegments[e])return e;return-1}function v(e){var r;if(S.service.availableByPassengerSegments)for(r=0;r<S.orderInfo.passengers.length;r++)if(S.service.availableByPassengerSegments[r][e])return r;return-1}function h(){for(var e=0;e<S.orderInfo.plainFlights.length;e++)for(var r=0;r<S.orderInfo.passengers.length;r++)if(g(r,e))return!0;return!1}function b(){var e=0;return S.mealMenu.forEach(function(r){r.forEach(function(r){e+=r.alreadySelectedCount})}),e>=3?!0:!1}function y(e){for(var r={group:0,meal:{}},n=0;n<S.mealMenu.length;n++)for(var s=0;s<S.mealMenu[n].length;s++)S.mealMenu[n][s].rfisc==e.rfisc&&(r.meal=S.mealMenu[n][s],r.group=n);return r}var S=this,I=r.find("div.passengersTableContainer");S.switchService=a,S.selectFlightPassenger=i,S.selectFirstAvailablePassengerFlight=o,S.setPassengerFlightMeal=c,S.removePassengerFlightMeal=d,S.getSelectedPassengerFlightMeal=g,S.scrollToStart=u,S.scrollToEnd=f,S.checkAllChoose=h,S.mealCountChangeHandler=t,S.hasAlias=n.hasAlias,S.getAvailablePassengersCount=s.getAvailablePassengersCount,S.checkServiceRemovalProhibited=n.checkServiceRemovalProhibited,S.getLimitStatus=b,S.getMealInfo=y,S.canScrollRight=!0,S.canScrollLeft=!1,S.selectedFlight=0,S.selectedPassenger=0,n.getParam("site.externalStorageBaseUrl")?S.mealImagesPath=n.getParam("site.externalStorageBaseUrl")+"/img/content/meal":S.mealImagesPath="./themes/websky/assets/static/img/content/meal",n.addOrderInfoListener(function(e){S.orderInfo=e},!1,!0),e.$watch("vm.service",function(){S.mealMenu&&l()}),I.on("scroll",m),S.service.active&&l()}angular.module("app").component("esMealRossiya",{templateUrl:"components/es-meal-rossiya/es-meal-rossiya.html",controller:["$scope","$element","backend","utils",s],controllerAs:"vm",bindings:{service:"=service",locked:"=locked"}})},{}],4:[function(e,r,n){"use strict";function s(e,r,n,s,a){function t(){B.locked||s.checkServiceRemovalProhibited("seat")||(B.service.active=!B.service.active,B.service.active?c():(B.modifyError=!1,s.removeExtraService({code:"seat"}).then(function(){i(),B.orderInfo.editable_extra_services&&_.findWhere(B.orderInfo.editable_extra_services,{code:"babyBassinet"})&&s.removeExtraService({code:"babyBassinet"})},function(e){e.error&&(B.modifyError=e.error)})))}function i(){B.seatMap=!1,B.selectedFlight=-1,B.selectedPassenger=-1}function o(e){w=e?"0px":jQuery(".passengersSeatMap").find(".mCSB_container").css("top")}function l(e,r){o(B.selectedFlight!==e),B.selectedFlight=e,B.selectedPassenger=r,d()}function c(){B.selectedFlight=p(),B.selectedPassenger=v(B.selectedFlight),d()}function d(){-1!==B.selectedPassenger&&-1!==B.selectedFlight&&(B.loadingSeatMap=!0,B.seatMapError=!1,s.seatMap(B.orderInfo.passengers[B.selectedPassenger].id,B.orderInfo.plainFlights[B.selectedFlight].id).then(function(e){B.seatMap=e,B.seatMap.hasSeatsWithBabyBassinet=g(e),B.loadingSeatMap=!1,n(function(){jQuery(".passengersSeatMap").find(".mCSB_container").css("top",w)})},function(e){B.seatMapError=e.error,B.loadingSeatMap=!1}))}function g(e){var r=!1;return e&&e.decks&&e.decks.forEach(function(e){e&&e.cabins&&e.cabins.forEach(function(e){e&&e.rows&&e.rows.forEach(function(e){e&&e.chairs&&e.chairs.forEach(function(e){u(e)&&(r=!0)})})})}),r}function u(e){var r=!1;return e&&e.properties&&e.properties.forEach(function(e){"babyBassinet"===e&&(r=!0)}),r}function f(e,r,n){var t,i=B.orderInfo.passengers[B.selectedPassenger].id,o=B.orderInfo.plainFlights[B.selectedFlight].id;B.locked||e.available&&r&&(w=jQuery(".passengersSeatMap").find(".mCSB_container").css("top"),B.modifyError=!1,s.modifyExtraService({code:"seat",passenger_id:i,segment_id:o,value:n+e.number,subgroup:B.service.commonSubgroup,rfisc:e.rfisc||"",service_type:"F"}).then(function(){d(),u(e)?B.babyBassinetService&&B.babyBassinetService.itemsByPassengerSegments&&B.babyBassinetService.itemsByPassengerSegments[B.selectedPassenger]&&B.babyBassinetService.itemsByPassengerSegments[B.selectedPassenger][B.selectedFlight]&&(t=a.getFirstNotEmptySubListItem(B.babyBassinetService.itemsByPassengerSegments[B.selectedPassenger][B.selectedFlight]),t&&t.serviceType&&t.rfisc&&s.modifyExtraService({code:"babyBassinet",passenger_id:i,segment_id:o,subgroup:B.babyBassinetService.commonSubgroup,rfisc:t.rfisc,service_type:t.serviceType})):P(i,o)},function(e){e.error&&(B.modifyError=e.error)}))}function m(){B.sunInfoByFlights=[],B.orderInfo.plainFlights.forEach(function(e,r){s.sunInfo(e.origincity,e.departuredate,e.departuretime,e.destinationcity,e.arrivaldate,e.arrivaltime).then(function(e){B.sunInfoByFlights[r]=e})})}function p(){var e;for(e=0;e<B.orderInfo.plainFlights.length;e++)if(B.service.availableBySegments[e])return e;return-1}function v(e){var r;if(B.service.availableByPassengerSegments)for(r=0;r<B.orderInfo.passengers.length;r++)if(B.service.availableByPassengerSegments[r][e])return r;return-1}function h(){M.scrollTo(0)}function b(){M.scrollTo(M[0].scrollWidth)}function y(){var r=M[0].scrollLeft,n=M[0].scrollWidth,s=M[0].clientWidth,a=n-s-r;B.canScrollRight=0!==a,B.canScrollLeft=0!==r,e.$apply()}function S(e){var r=a.getAvailablePassengersCount(e);return r+B.orderInfo.passengers.filter(function(e){return!e.hasSeats}).length}function I(e,r){var n=B.orderInfo.passengers[e].id,a=B.orderInfo.plainFlights[r].id;B.locked||s.checkServiceRemovalProhibited("seat",e,r)||(B.modifyError=!1,s.removeExtraService({code:"seat",passenger_id:n,segment_id:a}).then(function(){P(n,a),B.selectedFlight===r&&d()},function(e){e.error&&(B.modifyError=e.error)}))}function P(e,r){B.orderInfo.editableExtraServicesHeap&&_.findWhere(B.orderInfo.editableExtraServicesHeap,{groupCode:"babyBassinet",mainSegmentId:r,passengerId:e})&&s.removeExtraService({code:"babyBassinet",passenger_id:e,segment_id:r})}function x(e,r){var n,s,a;return B.orderInfo.editableExtraServicesByPassengers&&B.orderInfo.editableExtraServicesByPassengers[e]&&(s=B.orderInfo.editableExtraServicesByPassengers[e].passengerSegmentServices[r],s&&(a=_.findWhere(s,{code:"seat"}),a&&(n=a.serviceItem))),n}function F(){for(var e=0;e<B.orderInfo.plainFlights.length;e++)for(var r=0;r<B.orderInfo.passengers.length;r++)if(x(r,e))return!0;return!1}var B=this,M=r.find("div.passengersTableContainer"),w="0px";B.switchService=t,B.selectFlightPassenger=l,B.selectFirstAvailablePassengerFlight=c,B.setPassengerFlightSeat=f,B.getSelectedPassengerFlightMeal=x,B.checkAllChoose=F,B.hasAlias=s.hasAlias,B.scrollToStart=h,B.scrollToEnd=b,B.getAvailablePassengersCount=a.getAvailablePassengersCount,B.getAvailablePassengersCountWrap=S,B.removePassengerFlightSeat=I,B.checkServiceRemovalProhibited=s.checkServiceRemovalProhibited,B.canScrollRight=!0,B.canScrollLeft=!1,s.addOrderInfoListener(function(e){B.orderInfo=e},!1,!0),m(),M.on("scroll",y),B.service.active&&c()}angular.module("app").component("esSeatRossiya",{templateUrl:"components/es-seat-rossiya/es-seat-rossiya.html",controller:["$scope","$element","$timeout","backend","utils",s],controllerAs:"vm",bindings:{service:"=service",babyBassinetService:"=",locked:"=locked"}})},{}],5:[function(e,r,n){"use strict";function s(e,r,n,s,a,t){function i(){d.loading=!0,n.retryRegister().then(function(r){r.lastName&&r.pnr?e.location="./order?pnr="+r.pnr+"&lastName="+r.lastName:d.loading=!1},function(e){d.loading=!1,d.errorMessage=e.error})}function o(){d.orderInfo.header&&d.orderInfo.header.regnum&&(d.loading=!0,n.bindOrder(d.orderInfo.header.regnum,d.lastName).then(function(){d.loading=!1,d.orderInfo.bindAlowed=!1,d.showBindOrderSuccessMessage=!0,r(function(){d.showBindOrderSuccessMessage=!1},1e4)},function(){d.loading=!1,d.showBindOrderFailMessage=!0,r(function(){d.showBindOrderFailMessage=!1},1e4)}))}function l(e){var r=!0;return d.orderInfo.passengers.forEach(function(n,s){d.orderInfo.allExtraServicesByPassengers&&d.orderInfo.allExtraServicesByPassengers[s]&&d.orderInfo.allExtraServicesByPassengers[s].passengerSegmentServices?d.orderInfo.allExtraServicesByPassengers[s].passengerSegmentServices.forEach(function(n){var s=_.findWhere(n,{code:e});(!n||!s||s&&s.serviceItem&&"ISSUED_WITH_EMD"!==s.serviceItem.status)&&(r=!1)}):r=!1}),r}function c(){n.clearSession().then(function(){a.goToSearchOrder()})}var d=this;d.loading=!0,d.errorMessage=!1,d.openExchange=a.goToExchange,d.openRefund=a.goToRefund,d.openAddServices=a.goToAddServices,d.suffixCount=s.suffixCount,d.retryPayment=i,d.bindOrder=o,d.checkAllPassengersHavePaidService=l,d.clearSession=c,n.searchOrder(d.pnrOrTicketNumber,d.lastName).then(function(a){var i=s.getParamFromLocation("result");d.orderInfo=a,!d.orderInfo.header||"being_paid"!==d.orderInfo.header.status&&"being_paid_for_exchange"!==d.orderInfo.header.status?d.loading=!1:"success"===i?n.waitPayment(d.orderInfo.header.regnum,d.lastName).then(function(){e.location="./order?pnr="+d.orderInfo.header.regnum+"&lastName="+d.lastName+"&result=success"},function(){d.loading=!1}):(d.orderInfo.hasFailedServices||(d.showPaymentFrame=!0),d.loading=!1),!d.orderInfo.hasFailedServices||i||!d.orderInfo.header||"being_paid"!==d.orderInfo.header.status&&"booked"!==d.orderInfo.header.status||r(function(){t.openHandler("popupRemovedServicesWarning",!1,{submitCallback:function(){d.orderInfo.paymentRedirectTo&&(d.showPaymentFrame=!0),d.ignoreFailedServices=!0},disableOutsideCloseClick:!0})}),n.getParam("ffp.enable")&&(d.orderInfo.hasBonusCard||d.orderInfo.ffpSumm)&&n.ffpBonus().then(function(e){d.ffpBonus=e.total||0})},function(e){d.loading=!1,d.errorMessage=e.error})}angular.module("app").component("orderRossiya",{templateUrl:"components/order-rossiya/order-rossiya.html",controller:["$window","$timeout","backend","utils","redirect","fancyboxTools",s],controllerAs:"vm",bindings:{pnrOrTicketNumber:"=num",lastName:"=lastname"}})},{}],6:[function(e,r,n){"use strict";function s(e,r){function n(e,r){u.detailedView.open=!0,u.detailedView.subgroupIndex=e,u.detailedView.mealIndex=r}function s(){u.detailedView.open=!1}function a(){var e=u.mealMenu.length-1,r=u.mealMenu[u.detailedView.subgroupIndex].length-1;u.detailedView.subgroupIndex!==e&&u.detailedView.mealIndex!==r?u.detailedView.mealIndex++:u.detailedView.subgroupIndex!==e&&u.detailedView.mealIndex==r?(u.detailedView.mealIndex=0,u.detailedView.subgroupIndex++):u.detailedView.subgroupIndex==e&&u.detailedView.mealIndex!==r?u.detailedView.mealIndex++:u.detailedView.subgroupIndex==e&&u.detailedView.mealIndex==r&&(u.detailedView.mealIndex=0,u.detailedView.subgroupIndex=0)}function t(){0!==u.detailedView.subgroupIndex&&0!==u.detailedView.mealIndex?u.detailedView.mealIndex--:0!==u.detailedView.subgroupIndex&&0==u.detailedView.mealIndex?(u.detailedView.subgroupIndex--,u.detailedView.mealIndex=u.mealMenu[u.detailedView.subgroupIndex].length-1):0==u.detailedView.subgroupIndex&&0!==u.detailedView.mealIndex?u.detailedView.mealIndex--:0==u.detailedView.subgroupIndex&&0==u.detailedView.mealIndex&&(u.detailedView.subgroupIndex=u.mealMenu.length-1,u.detailedView.mealIndex=u.mealMenu[u.detailedView.subgroupIndex].length-1)}function i(){u.availablePassengers=u.passengers.filter(function(e,r){return u.service.availableByPassengerSegments[r]&&u.service.availableByPassengerSegments[r][u.currentFlightIndex]})}function o(){u.mealMenuSubgroupMobile===!1?u.mealMenuSubgroup=!1:u.mealMenuSubgroup=1*u.mealMenuSubgroupMobile}function l(){for(var e=!1,r=u.currentPassengerIndex+1;r<u.passengers.length;r++)if(u.service.availableByPassengerSegments[r]&&u.service.availableByPassengerSegments[r][u.currentFlightIndex]){u.selectFlightPassenger(u.currentFlightIndex,r),e=!0;break}if(!e)for(var n=0;n<u.passengers.length;n++)if(u.service.availableByPassengerSegments[n]&&u.service.availableByPassengerSegments[n][u.currentFlightIndex]){u.selectFlightPassenger(u.currentFlightIndex,n);break}}function c(){for(var e=!1,r=u.currentPassengerIndex-1;r>-1;r--)if(u.service.availableByPassengerSegments[r]&&u.service.availableByPassengerSegments[r][u.currentFlightIndex]){u.selectFlightPassenger(u.currentFlightIndex,r),e=!0;break}if(!e)for(var n=u.passengers.length-1;n>-1;n--)if(u.service.availableByPassengerSegments[n]&&u.service.availableByPassengerSegments[n][u.currentFlightIndex]){u.selectFlightPassenger(u.currentFlightIndex,n);break}}function d(e){if(Array.isArray(e)){var r=e.reduce(function(e,r){return e.concat(r)},[]);return u.mealMenuSubgroup===!1?r:e}}function g(e,r){for(var n=0;n<r.length;n++)for(var s=0;s<r[n].length;s++)if(r[n][s].rfisc==e.rfisc)return n}var u=this;u.close=jQuery.fancybox.close,u.mealMenuSubgroupMobileChange=o,u.mealMenuSubgroup=!1,u.mealMenuSubgroupMobile="false",u.subgroupItems=e.createOptionsForUiSelect(u.subgroups,"all"),u.switchNext=l,u.switchPrev=c,u.arrayString=d,u.getGroupMeal=g,u.detailedView={open:!1},u.setItemIndex=n,u.closeItemPopup=s,u.nextItemPopup=a,u.prevItemPopup=t,r.$watch("vm.currentFlightIndex",function(){i()})}angular.module("app").component("popupMealRossiya",{templateUrl:"components/popup-meal-rossiya/popup-meal-rossiya.html",controller:["utils","$scope",s],controllerAs:"vm",bindings:{mealMenu:"=menu",passenger:"=passenger",currentPassengerIndex:"=",currentFlightIndex:"=",passengers:"=passengers",flight:"=flight",mealCountChangeHandler:"=handler",clearPassengerFlightMeal:"&remove",getPassengerFlightMeal:"=get",subgroups:"=subgroups",mealImagesPath:"=path",service:"=",selectFlightPassenger:"=select",getLimitStatus:"=limit"}})},{}],7:[function(e,r,n){"use strict";e("./components/popup-meal-rossiya/popup-meal-rossiya"),e("./components/es-meal-rossiya/es-meal-rossiya"),e("./components/es-seat-rossiya/es-seat-rossiya"),e("./components/order-rossiya/order-rossiya"),e("./components/baby-bassinet-icon/baby-bassinet-icon"),e("./components/baby-bassinet-icon-legend/baby-bassinet-icon-legend")},{"./components/baby-bassinet-icon-legend/baby-bassinet-icon-legend":1,"./components/baby-bassinet-icon/baby-bassinet-icon":2,"./components/es-meal-rossiya/es-meal-rossiya":3,"./components/es-seat-rossiya/es-seat-rossiya":4,"./components/order-rossiya/order-rossiya":5,"./components/popup-meal-rossiya/popup-meal-rossiya":6}]},{},[7]);
//# sourceMappingURL=controllers-rossia.js.map
