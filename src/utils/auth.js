import { store } from '../store'

const ID_TOKEN_KEY = 'id_token';
const USER_DETAIL = 'user_detail'

export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/login'
    })
  } else {
    setTokenFromLocalStorageToVuex()
    setUserDetailFromLocalStorageToVuex()
    next()
  }
}

// check is already login ?
export function isLoggedIn() {
  const idToken = getIdToken();
  // if have token in localStorage then set it into Vuex
  if (idToken) {
    setTokenFromLocalStorageToVuex()
    setUserDetailFromLocalStorageToVuex()
  }
  return !!idToken;
}

// get token from localStorage
export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getUserDetail() {
  return JSON.parse(localStorage.getItem(USER_DETAIL))
}

// remove token from localStorage
export function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

export function clearUserDetail () {
  localStorage.removeItem(USER_DETAIL)
}

// set token from localStorage to Vuex to better manage
export function setTokenFromLocalStorageToVuex() {
  let token = getIdToken()
  store.commit('setToken', token)
}

export function setUserDetailFromLocalStorageToVuex() {
  let userDetail = getUserDetail()
  store.commit('setUserDetail', userDetail)
}

// set token to localStorage
export function setIdToken(idToken) {
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function setUserDetail(userDetail) {
  localStorage.setItem(USER_DETAIL, JSON.stringify(userDetail))
}
