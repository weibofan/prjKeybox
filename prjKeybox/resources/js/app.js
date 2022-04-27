require("./bootstrap");
import Vue from 'vue'
import App from './app.vue'
console.log(Vue.component)
Vue.config.productionTip = false;
new Vue({
    render: h => h(App)
}).$mount('#app');