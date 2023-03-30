export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    async contactCoach(context, payload) {
      const newRequest = {
        userEmail: payload.email,
        message: payload.message,
      };

      const response = await fetch(
        `https://udemy-vue-1defa-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
        {
          method: "POST",
          body: JSON.stringify(newRequest),
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        const error = new Error(resData.message || "Failed to send request.");
        throw error;
      }

      newRequest.id = resData.name;
      newRequest.coachId = payload.coachId;

      context.commit("addRequest", newRequest);
    },
    async fetchRequests(context) {
      const coachId = context.rootGetters.userId;
      const response = await fetch(
        `https://udemy-vue-1defa-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`
      );

      const resData = await response.json();

      if (!response.ok) {
        const error = new Error(resData.message || "Failed to fetch request.");
        throw error;
      }

      const requests = [];

      for (const key in resData) {
        const request = {
          id: key,
          coachId: coachId,
          userEmail: resData[key].userEmail,
          message: resData[key].message,
        };
        requests.push(request);
      }

      context.commit("setRequests", requests);
    },
  },
  getters: {
    requests(state, getters, rootState, rootGetters) {
      const coachId = rootGetters.userId;
      return state.requests.filter((req) => req.coachId === coachId);
    },
    hasRequests(state, getters) {
      return getters.requests && getters.requests.length > 0;
    },
  },
};
