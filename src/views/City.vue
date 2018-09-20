<template>
    <div class="city-page container">
        <div class="row search-bar justify-content-end">
            <form v-on:submit="getCityValue" class="searchbox input-group">
                <input v-model="searchCity" type="search" name="search" class="searchbox-input" required>
                <span class="searchbox-icon"><button ref="searchCitysubmit" class="btn-style btn" type="button"><span
                        class="search-txt">Search city</span>
                <i class="fa fa-search ml-2"></i></button></span>
            </form>
        </div>
        <div class="mb-4" v-if="noResult == true">
            Sorry, there is no city match with your search
        </div>
        <div class="justify-content-center">
            <div class="city-template-main text-left" v-for="city in showCity.slice(0,1)">
                <p class="font-weight-bold text-warning">{{city.name}}</p>
                <p class="font-weight-bold">Current tempature: </p>
                <h1 class="text-warning">{{city.main.temp}}<sup>o</sup>C</h1>
                <div class="row">
                    <p class="col-md-5"><span class="font-weight-bold">Max tempature: </span>{{city.main.temp_max}}
                    </p>
                    <p class="col-md-5"><span class="font-weight-bold">Min tempature: </span>{{city.main.temp_min}}
                    </p>
                </div>
            </div>
        </div>
        <div class="row justify-content-center section">
            <div class="city-template col-md-3 col-sm-6" v-for="city in showCity.slice(1,4)">
                <p v-on:click="updateCitytoPage(city.name)"
                   class="city-name font-weight-bold text-warning">{{city.name}}</p>
                <p><span class="font-weight-bold">Current tempature: </span>{{city.main.temp}}</p>
                <p><span class="font-weight-bold">Max tempature: </span>{{city.main.temp_max}}</p>
                <p><span class="font-weight-bold">Min tempature: </span>{{city.main.temp_min}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'City',
        data() {
            return {
                cityResultDisplay: [],
                searchCity: '',
                currentCity: '',
                noResult: false,
                test: [],
            }
        },
        computed: {
            cityList() {
                return this.$store.state.cityList;
            },
            cityResult() {
                return this.$store.state.cityValue;
            },
            searchCityFunction() {
                return this.cityList.filter(city => city.name.toLowerCase().includes(this.searchCity.toLowerCase()))
            },
            showCity() {
                return this.displayResult();
            }
        },
        methods: {
            displayResult: function () {
                if (this.cityResult !== '') {
                    localStorage.setItem('city', this.cityResult);
                    this.currentCity = localStorage.getItem('city');
                } else {
                    this.currentCity = localStorage.city;
                }
                for (let i = 0; i < this.cityList.length; i++) {
                    if (this.cityList[i].name.toLowerCase().includes(this.currentCity.toLowerCase())) {
                        this.cityResultDisplay.push(this.cityList[i]);
                        if (i < this.cityList.length - 3) {
                            this.cityResultDisplay.push(this.cityList[i + 1]);
                            this.cityResultDisplay.push(this.cityList[i + 2]);
                            this.cityResultDisplay.push(this.cityList[i + 3]);
                        } else {
                            this.cityResultDisplay.push(this.cityList[i - 1]);
                            this.cityResultDisplay.push(this.cityList[i - 2]);
                            this.cityResultDisplay.push(this.cityList[i - 3]);
                        }
                    }
                }
                return this.cityResultDisplay;
            },
            updateCitytoPage(cityName) {
                this.$store.commit('updateCity', cityName)
                localStorage.setItem('city', this.$store.state.cityName);
                this.$router.go('/city');
            },
            searchExpand() {
                $(document).ready(function () {
                    let submitIcon = $('.searchbox-icon');
                    let inputBox = $('.searchbox-input');
                    let searchBox = $('.searchbox');
                    let isOpen = false;
                    submitIcon.click(function () {
                        if (isOpen == false) {
                            searchBox.addClass('searchbox-open');
                            inputBox.focus();
                            isOpen = true;
                        } else {
                            searchBox.removeClass('searchbox-open');
                            inputBox.focusout();
                            isOpen = false;
                        }
                    });
                })
            },
            getCityValue(event) {
                event.preventDefault();
                if (this.searchCityFunction.length != 0 && this.searchCity != '') {
                    this.$store.commit('getCityFromSearch', this.searchCity)
                    this.$router.go('/city');
                } else if (this.searchCity == '') {
                    this.noResult = false;
                } else {
                    this.noResult = true;
                }
            },
            trigger() {
                this.$refs.searchCitysubmit.click()
            },
        },
        mounted() {
            this.displayResult();
            this.searchExpand();
        }
    }

</script>

<style>
    .city-template-main {
        background-color: rgba(19, 19, 19, 0.56);
        padding: 25px 50px;
    }

    body {
        background: #475f77;
    }

    .city-name:hover {
        cursor: pointer;
    }

    @media only screen and (max-width: 768px) {
        .searchbox-open {
            width: 100% !important;
        }
    }

    .btn-style {
        min-width: 100px;
    }

    .search-bar {
        width: 100%;
        margin-bottom: 40px;
    }

    .searchbox {
        min-width: 127px;
        width: 0%;
        height: 38px;
        overflow: hidden;
        -webkit-transition: width 0.3s;
        -moz-transition: width 0.3s;
        -ms-transition: width 0.3s;
        -o-transition: width 0.3s;
        transition: width 0.3s;
    }

    .searchbox-input {
        top: 0;
        right: 0;
        border: 0;
        outline: 0;
        width: 100%;
        margin: 0;
        padding: 0px 55px 0px 20px;
        font-size: 20px;
        border-radius: 3px;
    }

    .searchbox-icon,
    .searchbox-submit {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0;
        margin: 0;
        border: 0;
        outline: 0;
        text-align: center;
        cursor: pointer;
    }

    .search-txt {
        text-align: left;
    }

    .searchbox-open {
        width: 40%;
    }
</style>