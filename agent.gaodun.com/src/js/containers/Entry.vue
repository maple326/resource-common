<template>
    <div id="app">
        <div class="container">
            <div style="margin-bottom: 0">
                <Navbar></Navbar>
            </div>
            <div class="content-menu">
                <Menu></Menu>
            </div>
            <section class="content-container">
                <div class="content-box">
                    <transition name="fade" mode="out-in" appear>
                        <router-view></router-view>
                    </transition>
                </div>
            </section>
        </div>
    </div>
</template>
<style>
nav {
    margin-bottom: 10px;
}

.fade-enter-active,
.fade-leave-active {
    transition: all .3s
}

.fade-enter,
.fade-leave-active {
    transition: all .3s;
    opacity: 0
}

.fold-enter-active {
    animation-name: fold-in;
    animation-duration: .1s;
}

.fold-leave-active {
    animation-name: fold-out;
    animation-duration: .1s;
}

@keyframes fold-in {
    0% {
        transform: translate3d(0, 100%, 0);
    }
    100% {
        transform: translate3d(0, 0, 0);
    }
}

@keyframes fold-out {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(0, 100%, 0);
    }
}
</style>
<script>
import Vue from 'vue';
import Navbar from '../containers/Navigation.vue';
import Menu from './Menu.vue';
import { AGENT_MENU } from '../util/keys';
import { mapState } from 'vuex';
import { parseUrl } from 'base';
import modal from 'vueModal';
import Access from '../util/accessControl';
import { getEnv } from '../util/config';
Vue.use(Access);
export default {
    name: 'app',
    components: {
        Navbar,
        Menu,
    },
    created() {
        this.mapMenuToWindow();
        this.mapPageIdToWindow();
    },
    methods: {
        mapMenuToWindow() {
            window.Menu = JSON.parse(localStorage.getItem(AGENT_MENU));
        },
        mapPageIdToWindow() {
            var mapMethod = menu => {
                for (var i in menu) {
                    if (menu[i].ChildNavigations) {
                        mapMethod(menu[i].ChildNavigations);
                    }
                }
            }
            mapMethod(window.Menu);
        },
    },
    computed: {
        ...mapState({
            count: state => {
                return state.list.number
            }
        }),
    }
}
</script>
