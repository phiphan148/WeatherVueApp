<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
    import Header from "./components/Header.vue";
    import Footer from "./components/Footer.vue";
    export default {
        components: {Header, Footer},
        data(){
          return {
              cityList: [],
          }
        },
        created(){
          this.getData();
        },
        computed:{
        },
        methods: {
            getData(){
                fetch('https://api.myjson.com/bins/i8run')
                    .then(response => response.json())
                    .then((jsonData) => {
                        let data = jsonData;
                        this.cityList = data.list;
                        this.$store.commit('getCityList', this.cityList);
                        console.log(this.$store.state.cityList);
                    });
            },
        }
    };
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fafafa;
  background: url("./assets/bg.jpg") no-repeat;
  overflow: hidden;
  min-height: 100vh;
}
  p{
    margin: 5px;
  }
</style>

