import { createStore } from "vuex";

import CoachesModule from "./modules/coaches.js";
import RequestsModule from "./modules/requests.js";
import AuthModule from "./modules/auth.js";

export default createStore({
  modules: {
    coaches: CoachesModule,
    requests: RequestsModule,
    auth: AuthModule,
  },
});
