!function e(r,n,s){function a(i,o){if(!n[i]){if(!r[i]){var l="function"==typeof require&&require;if(!o&&l)return l(i,!0);if(t)return t(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var d=n[i]={exports:{}};r[i][0].call(d.exports,function(e){var n=r[i][1][e];return a(n?n:e)},d,d.exports,e,r,n,s)}return n[i].exports}for(var t="function"==typeof require&&require,i=0;i<s.length;i++)a(s[i]);return a}({1:[function(e,r,n){"use strict";angular.module("app").component("babyBassinetIconLegend",{templateUrl:"components/baby-bassinet-icon-legend/baby-bassinet-icon-legend.html"})},{}],2:[function(e,r,n){"use strict";angular.module("app").component("babyBassinetIcon",{templateUrl:"components/baby-bassinet-icon/baby-bassinet-icon.html",controller:function(){},controllerAs:"vm",bindings:{rfisc:"=rfisc",active:"=active",disabled:"=disabled"}})},{}],3:[function(e,r,n){"use strict";function s(e,r,n,s){function a(){I.locked||n.checkServiceRemovalProhibited("meal")||(I.service.active=!I.service.active,I.service.active?o():n.removeExtraService({code:"meal"}))}function t(e,r,s){0>s&&(I.locked||n.modifyExtraService({code:"meal",passenger_id:I.orderInfo.passengers[I.selectedPassenger].id,segment_id:I.orderInfo.plainFlights[I.selectedFlight].id,subgroup:I.service.subgroups[e],amount:(r.alreadySelectedCount||0)+s,service_type:r.serviceType,rfisc:r.rfisc})),!b()&&s>0&&(I.locked||n.modifyExtraService({code:"meal",passenger_id:I.orderInfo.passengers[I.selectedPassenger].id,segment_id:I.orderInfo.plainFlights[I.selectedFlight].id,subgroup:I.service.subgroups[e],amount:(r.alreadySelectedCount||0)+s,service_type:r.serviceType,rfisc:r.rfisc}))}function i(e,r){I.selectedFlight=e,I.selectedPassenger=r,l()}function o(){I.selectedFlight=p(),I.selectedPassenger=v(I.selectedFlight),l()}function l(){I.mealMenu=I.service.itemsByPassengerSegments[I.selectedPassenger][I.selectedFlight],void 0===I.mealMenuSubgroup&&(I.mealMenuSubgroup=!1)}function c(e,r){var s=u(I.selectedPassenger,I.selectedFlight),a={code:"meal",passenger_id:I.orderInfo.passengers[I.selectedPassenger].id,segment_id:I.orderInfo.plainFlights[I.selectedFlight].id,subgroup:I.service.subgroups[e],service_type:r.serviceType,rfisc:r.rfisc};I.locked||(s&&!n.checkServiceRemovalProhibited("meal",I.selectedPassenger,I.selectedFlight)?n.removeExtraService({code:"meal",passenger_id:I.orderInfo.passengers[I.selectedPassenger].id,segment_id:I.orderInfo.plainFlights[I.selectedFlight].id,service_type:s.serviceType,rfisc:s.rfisc},!0).then(function(){n.modifyExtraService(a)}):n.modifyExtraService(a))}function d(e,r){I.locked||n.checkServiceRemovalProhibited("meal",e,r)||n.removeExtraService({code:"meal",passenger_id:I.orderInfo.passengers[e].id,segment_id:I.orderInfo.plainFlights[r].id})}function u(e,r){var n,s,a;return I.orderInfo.editableExtraServicesByPassengers&&I.orderInfo.editableExtraServicesByPassengers[e]&&(s=I.orderInfo.editableExtraServicesByPassengers[e].passengerSegmentServices[r],s&&(a=_.findWhere(s,{code:"meal"}),a&&(n=a.serviceItem))),n}function g(){P.scrollTo(0)}function f(){P.scrollTo(P[0].scrollWidth)}function m(){var r=P[0].scrollLeft,n=P[0].scrollWidth,s=P[0].clientWidth,a=n-s-r;I.canScrollRight=0!==a,I.canScrollLeft=0!==r,e.$apply()}function p(){var e;for(e=0;e<I.orderInfo.plainFlights.length;e++)if(I.service.availableBySegments[e])return e;return-1}function v(e){var r;if(I.service.availableByPassengerSegments)for(r=0;r<I.orderInfo.passengers.length;r++)if(I.service.availableByPassengerSegments[r][e])return r;return-1}function h(){for(var e=0;e<I.orderInfo.plainFlights.length;e++)for(var r=0;r<I.orderInfo.passengers.length;r++)if(u(r,e))return!0;return!1}function b(){var e=0;return I.mealMenu.forEach(function(r){r.forEach(function(r){e+=r.alreadySelectedCount})}),e>=3?!0:!1}function y(e){for(var r={group:0,meal:{}},n=0;n<I.mealMenu.length;n++)for(var s=0;s<I.mealMenu[n].length;s++)I.mealMenu[n][s].rfisc==e.rfisc&&(r.meal=I.mealMenu[n][s],r.group=n);return r}function S(e){return e&&e.length&&(e=e.map(function(e){return e&&e.length&&(e=e.map(function(e){var r=[];return e&&e.length&&(e.forEach(function(e){var n;if(e&&e.amount){n=angular.copy(e),n.amount=1,n.totalPrice=Big(e.totalPrice).div(e.amount).toFixed(2);for(var s=0;s<e.amount;s++)r.push(n)}}),e=r),e})),e})),e}var I=this,P=r.find("div.passengersTableContainer");I.switchService=a,I.selectFlightPassenger=i,I.selectFirstAvailablePassengerFlight=o,I.setPassengerFlightMeal=c,I.removePassengerFlightMeal=d,I.getSelectedPassengerFlightMeal=u,I.scrollToStart=g,I.scrollToEnd=f,I.checkAllChoose=h,I.mealCountChangeHandler=t,I.hasAlias=n.hasAlias,I.getAvailablePassengersCount=s.getAvailablePassengersCount,I.checkServiceRemovalProhibited=n.checkServiceRemovalProhibited,I.getLimitStatus=b,I.getMealInfo=y,I.canScrollRight=!0,I.canScrollLeft=!1,I.selectedFlight=0,I.selectedPassenger=0,n.getParam("site.externalStorageBaseUrl")?I.mealImagesPath=n.getParam("site.externalStorageBaseUrl")+"/img/content/meal":I.mealImagesPath="./themes/websky/assets/static/img/content/meal",n.addOrderInfoListener(function(e){e&&e.groupedEditableExtraServices&&e.groupedEditableExtraServices.meal&&(e.groupedEditableExtraServices.meal=S(e.groupedEditableExtraServices.meal)),I.orderInfo=e},!1,!0),e.$watch("vm.service",function(){I.mealMenu&&l()}),P.on("scroll",m),I.service.active&&l()}angular.module("app").component("esMealRossiya",{templateUrl:"components/es-meal-rossiya/es-meal-rossiya.html",controller:["$scope","$element","backend","utils",s],controllerAs:"vm",bindings:{service:"=service",locked:"=locked"}})},{}],4:[function(e,r,n){"use strict";function s(e,r,n,s,a){function t(){M.locked||s.checkServiceRemovalProhibited("seat")||(M.service.active=!M.service.active,M.service.active?c():(M.modifyError=!1,s.removeExtraService({code:"seat"}).then(function(){i(),M.orderInfo.editable_extra_services&&_.findWhere(M.orderInfo.editable_extra_services,{code:"babyBassinet"})&&s.removeExtraService({code:"babyBassinet"})},function(e){e.error&&(M.modifyError=e.error)})))}function i(){M.seatMap=!1,M.selectedFlight=-1,M.selectedPassenger=-1}function o(e){E=e?"0px":jQuery(".passengersSeatMap").find(".mCSB_container").css("top")}function l(e,r){o(M.selectedFlight!==e),M.selectedFlight=e,M.selectedPassenger=r,d()}function c(){M.selectedFlight=p(),M.selectedPassenger=v(M.selectedFlight),d()}function d(){-1!==M.selectedPassenger&&-1!==M.selectedFlight&&(M.loadingSeatMap=!0,M.seatMapError=!1,s.seatMap(M.orderInfo.passengers[M.selectedPassenger].id,M.orderInfo.plainFlights[M.selectedFlight].id).then(function(e){M.seatMap=e,M.seatMap.hasSeatsWithBabyBassinet=u(e),M.loadingSeatMap=!1,n(function(){jQuery(".passengersSeatMap").find(".mCSB_container").css("top",E)})},function(e){M.seatMapError=e.error,M.loadingSeatMap=!1}))}function u(e){var r=!1;return e&&e.decks&&e.decks.forEach(function(e){e&&e.cabins&&e.cabins.forEach(function(e){e&&e.rows&&e.rows.forEach(function(e){e&&e.chairs&&e.chairs.forEach(function(e){g(e)&&(r=!0)})})})}),r}function g(e){var r=!1;return e&&e.properties&&e.properties.forEach(function(e){"babyBassinet"===e&&(r=!0)}),r}function f(e,r,n){var t,i=M.orderInfo.passengers[M.selectedPassenger].id,o=M.orderInfo.plainFlights[M.selectedFlight].id;M.locked||e.available&&r&&(E=jQuery(".passengersSeatMap").find(".mCSB_container").css("top"),M.modifyError=!1,s.modifyExtraService({code:"seat",passenger_id:i,segment_id:o,value:n+e.number,subgroup:M.service.commonSubgroup,rfisc:e.rfisc||"",service_type:"F"}).then(function(){d(),g(e)?M.babyBassinetService&&M.babyBassinetService.itemsByPassengerSegments&&M.babyBassinetService.itemsByPassengerSegments[M.selectedPassenger]&&M.babyBassinetService.itemsByPassengerSegments[M.selectedPassenger][M.selectedFlight]&&(t=a.getFirstNotEmptySubListItem(M.babyBassinetService.itemsByPassengerSegments[M.selectedPassenger][M.selectedFlight]),t&&t.serviceType&&t.rfisc&&s.modifyExtraService({code:"babyBassinet",passenger_id:i,segment_id:o,subgroup:M.babyBassinetService.commonSubgroup,rfisc:t.rfisc,service_type:t.serviceType})):P(i,o)},function(e){e.error&&(M.modifyError=e.error)}))}function m(){M.sunInfoByFlights=[],M.orderInfo.plainFlights.forEach(function(e,r){s.sunInfo(e.origincity,e.departuredate,e.departuretime,e.destinationcity,e.arrivaldate,e.arrivaltime).then(function(e){M.sunInfoByFlights[r]=e})})}function p(){var e;for(e=0;e<M.orderInfo.plainFlights.length;e++)if(M.service.availableBySegments[e])return e;return-1}function v(e){var r;if(M.service.availableByPassengerSegments)for(r=0;r<M.orderInfo.passengers.length;r++)if(M.service.availableByPassengerSegments[r][e])return r;return-1}function h(){B.scrollTo(0)}function b(){B.scrollTo(B[0].scrollWidth)}function y(){var r=B[0].scrollLeft,n=B[0].scrollWidth,s=B[0].clientWidth,a=n-s-r;M.canScrollRight=0!==a,M.canScrollLeft=0!==r,e.$apply()}function S(e){var r=a.getAvailablePassengersCount(e);return r+M.orderInfo.passengers.filter(function(e){return!e.hasSeats}).length}function I(e,r){var n=M.orderInfo.passengers[e].id,a=M.orderInfo.plainFlights[r].id;M.locked||s.checkServiceRemovalProhibited("seat",e,r)||(M.modifyError=!1,s.removeExtraService({code:"seat",passenger_id:n,segment_id:a}).then(function(){P(n,a),M.selectedFlight===r&&d()},function(e){e.error&&(M.modifyError=e.error)}))}function P(e,r){M.orderInfo.editableExtraServicesHeap&&_.findWhere(M.orderInfo.editableExtraServicesHeap,{groupCode:"babyBassinet",mainSegmentId:r,passengerId:e})&&s.removeExtraService({code:"babyBassinet",passenger_id:e,segment_id:r})}function x(e,r){var n,s,a;return M.orderInfo.editableExtraServicesByPassengers&&M.orderInfo.editableExtraServicesByPassengers[e]&&(s=M.orderInfo.editableExtraServicesByPassengers[e].passengerSegmentServices[r],s&&(a=_.findWhere(s,{code:"seat"}),a&&(n=a.serviceItem))),n}function F(){for(var e=0;e<M.orderInfo.plainFlights.length;e++)for(var r=0;r<M.orderInfo.passengers.length;r++)if(x(r,e))return!0;return!1}var M=this,B=r.find("div.passengersTableContainer"),E="0px";M.switchService=t,M.selectFlightPassenger=l,M.selectFirstAvailablePassengerFlight=c,M.setPassengerFlightSeat=f,M.getSelectedPassengerFlightMeal=x,M.checkAllChoose=F,M.hasAlias=s.hasAlias,M.scrollToStart=h,M.scrollToEnd=b,M.getAvailablePassengersCount=a.getAvailablePassengersCount,M.getAvailablePassengersCountWrap=S,M.removePassengerFlightSeat=I,M.checkServiceRemovalProhibited=s.checkServiceRemovalProhibited,M.canScrollRight=!0,M.canScrollLeft=!1,s.addOrderInfoListener(function(e){M.orderInfo=e},!1,!0),m(),B.on("scroll",y),M.service.active&&c()}angular.module("app").component("esSeatRossiya",{templateUrl:"components/es-seat-rossiya/es-seat-rossiya.html",controller:["$scope","$element","$timeout","backend","utils",s],controllerAs:"vm",bindings:{service:"=service",babyBassinetService:"=",locked:"=locked"}})},{}],5:[function(e,r,n){"use strict";function s(e,r,n,s,a,t){function i(){d.loading=!0,n.retryRegister().then(function(r){r.lastName&&r.pnr?e.location="./order?pnr="+r.pnr+"&lastName="+r.lastName:d.loading=!1},function(e){d.loading=!1,d.errorMessage=e.error})}function o(){d.orderInfo.header&&d.orderInfo.header.regnum&&(d.loading=!0,n.bindOrder(d.orderInfo.header.regnum,d.lastName).then(function(){d.loading=!1,d.orderInfo.bindAlowed=!1,d.showBindOrderSuccessMessage=!0,r(function(){d.showBindOrderSuccessMessage=!1},1e4)},function(){d.loading=!1,d.showBindOrderFailMessage=!0,r(function(){d.showBindOrderFailMessage=!1},1e4)}))}function l(e){var r=!0;return d.orderInfo.passengers.forEach(function(n,s){d.orderInfo.allExtraServicesByPassengers&&d.orderInfo.allExtraServicesByPassengers[s]&&d.orderInfo.allExtraServicesByPassengers[s].passengerSegmentServices?d.orderInfo.allExtraServicesByPassengers[s].passengerSegmentServices.forEach(function(n){var s=_.findWhere(n,{code:e});(!n||!s||s&&s.serviceItem&&"ISSUED_WITH_EMD"!==s.serviceItem.status)&&(r=!1)}):r=!1}),r}function c(){n.clearSession().then(function(){a.goToSearchOrder()})}var d=this;d.loading=!0,d.errorMessage=!1,d.openExchange=a.goToExchange,d.openRefund=a.goToRefund,d.openAddServices=a.goToAddServices,d.suffixCount=s.suffixCount,d.retryPayment=i,d.bindOrder=o,d.checkAllPassengersHavePaidService=l,d.clearSession=c,n.searchOrder(d.pnrOrTicketNumber,d.lastName).then(function(a){var i=s.getParamFromLocation("result");d.orderInfo=a,!d.orderInfo.header||"being_paid"!==d.orderInfo.header.status&&"being_paid_for_exchange"!==d.orderInfo.header.status?d.loading=!1:"success"===i?n.waitPayment(d.orderInfo.header.regnum,d.lastName).then(function(){e.location="./order?pnr="+d.orderInfo.header.regnum+"&lastName="+d.lastName+"&result=success"},function(){d.loading=!1}):(d.orderInfo.hasFailedServices||(d.showPaymentFrame=!0),d.loading=!1),!d.orderInfo.hasFailedServices||i||!d.orderInfo.header||"being_paid"!==d.orderInfo.header.status&&"booked"!==d.orderInfo.header.status||r(function(){t.openHandler("popupRemovedServicesWarning",!1,{submitCallback:function(){d.orderInfo.paymentRedirectTo&&(d.showPaymentFrame=!0),d.ignoreFailedServices=!0},disableOutsideCloseClick:!0})}),n.getParam("ffp.enable")&&(d.orderInfo.hasBonusCard||d.orderInfo.ffpSumm)&&n.ffpBonus().then(function(e){d.ffpBonus=e.total||0})},function(e){d.loading=!1,d.errorMessage=e.error})}angular.module("app").component("orderRossiya",{templateUrl:"components/order-rossiya/order-rossiya.html",controller:["$window","$timeout","backend","utils","redirect","fancyboxTools",s],controllerAs:"vm",bindings:{pnrOrTicketNumber:"=num",lastName:"=lastname"}})},{}],6:[function(e,r,n){"use strict";function s(e,r){function n(e,r){f.detailedView.open=!0,f.detailedView.subgroupIndex=e,f.detailedView.mealIndex=r}function s(){f.detailedView.open=!1}function a(){var e=f.mealMenu.length-1,r=f.mealMenu[f.detailedView.subgroupIndex].length-1;f.detailedView.subgroupIndex!==e&&f.detailedView.mealIndex!==r?f.detailedView.mealIndex++:f.detailedView.subgroupIndex!==e&&f.detailedView.mealIndex==r?(f.detailedView.mealIndex=0,f.detailedView.subgroupIndex++):f.detailedView.subgroupIndex==e&&f.detailedView.mealIndex!==r?f.detailedView.mealIndex++:f.detailedView.subgroupIndex==e&&f.detailedView.mealIndex==r&&(f.detailedView.mealIndex=0,f.detailedView.subgroupIndex=0)}function t(){0!==f.detailedView.subgroupIndex&&0!==f.detailedView.mealIndex?f.detailedView.mealIndex--:0!==f.detailedView.subgroupIndex&&0==f.detailedView.mealIndex?(f.detailedView.subgroupIndex--,f.detailedView.mealIndex=f.mealMenu[f.detailedView.subgroupIndex].length-1):0==f.detailedView.subgroupIndex&&0!==f.detailedView.mealIndex?f.detailedView.mealIndex--:0==f.detailedView.subgroupIndex&&0==f.detailedView.mealIndex&&(f.detailedView.subgroupIndex=f.mealMenu.length-1,f.detailedView.mealIndex=f.mealMenu[f.detailedView.subgroupIndex].length-1)}function i(){f.availablePassengers=f.passengers.filter(function(e,r){return f.service.availableByPassengerSegments[r]&&f.service.availableByPassengerSegments[r][f.currentFlightIndex]})}function o(){f.mealMenuSubgroupMobile===!1?f.mealMenuSubgroup=!1:f.mealMenuSubgroup=1*f.mealMenuSubgroupMobile}function l(){for(var e=!1,r=f.currentPassengerIndex+1;r<f.passengers.length;r++)if(f.service.availableByPassengerSegments[r]&&f.service.availableByPassengerSegments[r][f.currentFlightIndex]){f.selectFlightPassenger(f.currentFlightIndex,r),e=!0;break}if(!e)for(var n=0;n<f.passengers.length;n++)if(f.service.availableByPassengerSegments[n]&&f.service.availableByPassengerSegments[n][f.currentFlightIndex]){f.selectFlightPassenger(f.currentFlightIndex,n);break}}function c(){for(var e=!1,r=f.currentPassengerIndex-1;r>-1;r--)if(f.service.availableByPassengerSegments[r]&&f.service.availableByPassengerSegments[r][f.currentFlightIndex]){f.selectFlightPassenger(f.currentFlightIndex,r),e=!0;break}if(!e)for(var n=f.passengers.length-1;n>-1;n--)if(f.service.availableByPassengerSegments[n]&&f.service.availableByPassengerSegments[n][f.currentFlightIndex]){f.selectFlightPassenger(f.currentFlightIndex,n);break}}function d(e){if(Array.isArray(e)){var r=e.reduce(function(e,r){return e.concat(r)},[]);return f.mealMenuSubgroup===!1?r:e}}function u(e,r){for(var n=0;n<r.length;n++)for(var s=0;s<r[n].length;s++)if(r[n][s].rfisc==e.rfisc)return n}function g(){f.mealMenu=f.mealMenu||[];for(var e=0,r=0;r<f.mealMenu.length;r++)for(var n=0;n<f.mealMenu[r].length;n++)f.mealMenu[r][n].alreadySelectedCount&&(e+=f.mealMenu[r][n].price*f.mealMenu[r][n].alreadySelectedCount);return e}var f=this;f.close=jQuery.fancybox.close,f.mealMenuSubgroupMobileChange=o,f.mealMenuSubgroup=!1,f.mealMenuSubgroupMobile="false",f.subgroupItems=e.createOptionsForUiSelect(f.subgroups,"all"),f.switchNext=l,f.switchPrev=c,f.arrayString=d,f.getGroupMeal=u,f.detailedView={open:!1},f.setItemIndex=n,f.closeItemPopup=s,f.nextItemPopup=a,f.prevItemPopup=t,f.totalAmount=g,r.$watch("vm.currentFlightIndex",function(){i()})}angular.module("app").component("popupMealRossiya",{templateUrl:"components/popup-meal-rossiya/popup-meal-rossiya.html",controller:["utils","$scope",s],controllerAs:"vm",bindings:{mealMenu:"=menu",passenger:"=passenger",currentPassengerIndex:"=",currentFlightIndex:"=",passengers:"=passengers",flight:"=flight",mealCountChangeHandler:"=handler",clearPassengerFlightMeal:"&remove",getPassengerFlightMeal:"=get",subgroups:"=subgroups",mealImagesPath:"=path",service:"=",selectFlightPassenger:"=select",getLimitStatus:"=limit",mealSelect:"=",getMealInfo:"="}})},{}],7:[function(e,r,n){"use strict";e("./components/popup-meal-rossiya/popup-meal-rossiya"),e("./components/es-meal-rossiya/es-meal-rossiya"),e("./components/es-seat-rossiya/es-seat-rossiya"),e("./components/order-rossiya/order-rossiya"),e("./components/baby-bassinet-icon/baby-bassinet-icon"),e("./components/baby-bassinet-icon-legend/baby-bassinet-icon-legend")},{"./components/baby-bassinet-icon-legend/baby-bassinet-icon-legend":1,"./components/baby-bassinet-icon/baby-bassinet-icon":2,"./components/es-meal-rossiya/es-meal-rossiya":3,"./components/es-seat-rossiya/es-seat-rossiya":4,"./components/order-rossiya/order-rossiya":5,"./components/popup-meal-rossiya/popup-meal-rossiya":6}]},{},[7]);
//# sourceMappingURL=controllers-rossia.js.map
