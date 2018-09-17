<template>
    <div class="home container">
        <h2 class="welcome-txt animated 2 bounceInDown delay-2s slower mb-5 align-self-center">Welcome to Weather
            forecast channel <span>.</span><span>.</span><span>.</span></h2>
        <form v-on:submit="getCityValue" class="card card-sm search-home align-middle section">
            <div class="card-body row no-gutters align-items-center">
                <div class="col">
                    <input placeholder="Search city" id="search-bar"
                           class="form-control form-control-lg form-control-borderless" type="text"
                           v-model="searchCity"/>
                </div>
                <div class="col-auto ml-2">
                    <button ref="searchCitysubmit" class="btn btn-lg">Search
                    </button>
                </div>
            </div>
        </form>
        <div v-if="noResult == true">
            Sorry, there is no city match with your search
        </div>
        <div v-if="noType == true">
            You haven't typed anything yet
        </div>
        <div class="row justify-content-center section">
            <div class="city-template col-md-3 col-sm-6"
                 v-for="city in cityList.slice(this.randomStart,this.randomStart+3)">
                <p v-on:click="updateCitytoPage(city.name)" class="city-name font-weight-bold text-warning">{{city.name}}</p>
                <p><span class="font-weight-bold">Current tempature: </span>{{city.main.temp}}</p>
                <p><span class="font-weight-bold">Max tempature: </span>{{city.main.temp_max}}</p>
                <p><span class="font-weight-bold">Min tempature: </span>{{city.main.temp_min}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                searchCity: '',
                noResult: false,
                noType: false,
                randomStart: '',
            }
        },
        computed: {
            cityList() {
                return this.$store.state.cityList;
            },
            searchCityFunction() {
                return this.cityList.filter(city => city.name.toLowerCase().includes(this.searchCity.toLowerCase()))
            },
        },
        created() {
            this.getRandom();

        },
        methods: {
            getCityValue(event) {
                event.preventDefault();
                if (this.searchCityFunction.length != 0 && this.searchCity != '') {
                    this.$store.commit('getCityFromSearch', this.searchCity)
                    this.$router.push('/city');
                } else if (this.searchCity == '') {
                    this.noType = true;
                    this.noResult = false;
                } else {
                    this.noResult = true;
                    this.noType = false;
                }
            },
            trigger() {
                this.$refs.searchCitysubmit.click()
            },
            getRandom() {
                this.randomStart = Math.floor((Math.random() * this.cityList.length) + 1);
            },
            updateCitytoPage(cityName) {
                this.$store.commit('updateCity', cityName)
                localStorage.setItem('city', this.$store.state.cityName);
                this.$router.push('/city');
            },

        }
    };
</script>

<style>
    .section {
        margin-top: 100px;
    }

    .home {
        min-height: 100vh;
        padding-top: 50px;
    }

    .home h2 {
        text-shadow: -2px -2px 2px rgba(150, 150, 150, 1);
    }

    .search-home {
        max-width: 400px;
        margin: 10px auto;
    }

    .home button {
        background-color: #1a245f;
        color: #fafafa;
    }

    @keyframes blink {
        0% {
            opacity: .2;
        }
        20% {
            opacity: 1;
        }
        100% {
            opacity: .2;
        }
    }

    .welcome-txt span {
        animation-name: blink;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
    }

    .welcome-txt span:nth-child(2) {
        animation-delay: .2s;
    }

    .welcome-txt span:nth-child(3) {
        animation-delay: .4s;
    }

    .city-template {
        background-color: rgba(19, 19, 19, 0.56);
        margin: 15px;
        padding: 10px;
        border: 1px solid #d1ab14;
    }

    .city-template:hover {
        transform: scale(1.1);
        transition: transform .7s;
    }
    
    .city-name:hover {
        cursor: pointer;
    }
</style>
