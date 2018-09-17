import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cityList: [],
        cityValue: '',
        cityName: '',
        b: false,
    },
    mutations: {
        getCityList(state, cityList) {
            this.state.cityList = cityList;
        },
        getCityFromSearch(state, cityValue) {
            this.state.cityValue = cityValue;
        },
        updateCity(state, cityName) {
            this.state.cityName = cityName;
        },
    },
    actions: {}
});
