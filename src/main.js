import { createApp } from 'vue'
import App from './App.vue'
import VueTypedJs from 'vue-typed-js'

const app = createApp(App)
app.use(VueTypedJs)
app.mount('#app')