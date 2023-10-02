import { createApp } from "vue";
import "./main.css";
import App from "./App.vue";
import router from "./router/router";
import {store, key} from "./store/store";

const app = createApp(App)

app.use(router)
app.use(store, key)
app.mount("#app")
