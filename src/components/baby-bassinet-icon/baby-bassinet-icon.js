angular.module('app').component('babyBassinetIcon', {
    templateUrl: 'components/baby-bassinet-icon/baby-bassinet-icon.html',
    controller: [BabyBassinetIconController],
    controllerAs: 'vm',
    bindings: {
        rfisc: '=rfisc'
    }
});

function BabyBassinetIconController() {
    var vm = this;

    function getColorByRFISC(rfisc, propName) {
        var style = {};

        style[propName] = {
            '04D': '#1B3E6F',
            '06Z': '#006DA4'
        }[rfisc] || '#CBC8C8';

        console.log('style: ', style);

        return style;
    }
}
