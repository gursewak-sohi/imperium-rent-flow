import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/sass/main.scss'

import VCalendar from 'v-calendar';


// import Autocomplete from 'vue3-autocomplete'
// Optional: Import default CSS
// import 'vue3-autocomplete/dist/vue3-autocomplete.css'

const app = createApp(App)

app.use(VCalendar, {})


app.use(router)
// app.component('Autocomplete', Autocomplete)

app.mount('#app')
