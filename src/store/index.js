import { createStore } from "vuex";

import CoachesModule from "./modules/coaches.js";
import RequestsModule from "./modules/requests.js";

export default createStore({
  modules: {
    coaches: CoachesModule,
    requests: RequestsModule,
  },
  state() {
    return {
      userId: "c3",
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});
