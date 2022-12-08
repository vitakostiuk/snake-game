const getIsLoggedIn = (state) => !!state.auth.token;
const getLoading = (state) => state.auth.loading;
const getError = (state) => state.auth.error;

export { getIsLoggedIn, getLoading, getError };
