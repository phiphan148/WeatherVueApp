<template>
    <div class="header">
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                searchBook: '',
            }
        },
        beforeCreate() {
            // this.$parent.getData();
        },
        computed: {
        },
        created(){
        },
        methods: {
        }
    }
</script>

<style scoped>
    .header{
        min-height: 40px;
    }

</style>
