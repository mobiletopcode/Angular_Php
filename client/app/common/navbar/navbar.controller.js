import _ from 'lodash';

class NavbarController {
    constructor($state, $stateParams) {
        'ngInject';
        this.name = 'navbar';
        this.links = [
            {name: 'Home', sref: 'home.feedbacks', params:{}}
        ];
        
        this.isActive = (state) => {
            var params = {};
            if (state.type) {
                params.type = state.type
            }

            return $state.includes(state.sref, params) && state.params.type == $stateParams.type;
        };
    }
}

export default NavbarController;
