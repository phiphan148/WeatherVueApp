<template>
    <div class="row search-bar justify-content-end">
        <form class="searchbox input-group">
            <input type="search" name="search" class="searchbox-input" required>
            <!--<input type="submit" class="searchbox-submit" value="search">-->
            <span class="searchbox-icon"><button class="btn-style btn" type="button"><span class="search-txt">Search city</span>
                <i class="fa fa-search ml-2"></i></button></span>
        </form>
    </div>
</template>

<script>
    export default {
        name: "SearchBar",
        data() {
            return {
            }
        },
        created() {
            this.searchExpand();
        },
        methods: {
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
        }
    }
</script>

<style scoped>
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
