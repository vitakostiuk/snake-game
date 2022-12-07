const getUser = (state) => state.auth.user;
const getUserName = (state) => state.auth.user.name;
const getIsLoggedIn = (state) => !!state.auth.token; // приводит к булю (залогинен юзер или нет)
const getToken = (state) => state.auth.token;
const getLoading = (state) => state.auth.loading;
const getError = (state) => state.auth.error;

export { getUser, getUserName, getIsLoggedIn, getToken, getLoading, getError };
