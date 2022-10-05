import Cookie from 'js-cookie'

export const state = () => ({
  authToken: null,
  userName: null,
  userEmail: null,
  expiredAt: 0,
})

export const actions = {

  // checks middleware
  initAuth(vuexContext, req) {
    let token = null
    let expiredAt = 0

    if (req) {
      if (!req.headers.cookie) return

      const tokenCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith('token='))
      if (!tokenCookie) return

      token = tokenCookie.split('=')[1]

      expiredAt = req.headers.cookie.split(';').find((c) => c.trim().startsWith('expirationTime=')).split('=')[1]

    } else if (localStorage.key(0)) {
      const auth = JSON.parse(localStorage.getItem('vuex')).auth
      token = auth.authToken
      expiredAt = auth.expiredAt
    }

    if (token && expiredAt - new Date().getTime() > 0) {
      return 1
    } else {
      vuexContext.commit('signOut', expiredAt)
    }
  },

  // singIn function
  async singIn(vuexContext, payload) {
    return await this.$axios.$post('/sign-in', {
      email: payload.email,
      password: payload.password,
    }).then((response) => {
      const expirationTime = setTokenExpirationTime(payload.rememberMe)

      // saving token & token expiration time in local storage
      vuexContext.commit('signIn', {
        authToken: response.data.token,
        userName: response.data.user.name,
        userEmail: response.data.user.email,
        expiredAt: expirationTime,
      })

      // saving token & token expiration time in cookies
      Cookie.set('token', response.data.token)
      Cookie.set('expirationTime', expirationTime)

      if (response.success === true) {
        this.$toast.show({
          type: 'success',
          title: 'Success',
          message: response.data.message[0],
        })

        this.$router.push('/')
      }
    }).catch((error) => {
      console.error('auth/sign-in:', error.response.data)

      this.$toast.show({
        type: 'danger',
        title: 'Error',
        message: error.response.data.message,
      })
    })
  },

  // singUp function
  singUp(vuexContext, payload) {
    return this.$axios
      .$post('/sign-up', {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        password: payload.password,
        password_confirmation: payload.confirmPassword,
        role: payload.role,
      })
      .catch((error) => {
        console.error('[auth(sign-up)] - ', error.response.data)
        this.$toast.show({
          type: 'danger',
          title: 'Error',
          message: error.response.data.message,
        })
      })
  },

  // social login
  socialLogin(vuexContext, payload) {
    vuexContext.commit('signIn', {
      authToken: payload.token,
      userName: payload.name,
      userEmail: payload.email,
      expiredAt: payload.expiredAt,
    })

    // saving token & token expiration time in cookies
    Cookie.set('token', payload.token)
    Cookie.set('expirationTime', payload.expiredAt)
  },

  // signOut
  async signOut(vuexContext) {
    Cookie.remove('token')
    Cookie.remove('expirationTime')

    await vuexContext.commit('signOut')

    return 0;
  },
}

export const mutations = {

  // save login data
  signIn(state, payload) {
    state.authToken = payload.authToken
    state.userName = payload.userName
    state.userEmail = payload.userEmail
    state.expiredAt = payload.expiredAt
  },

  // delete login data after certain time || signOut
  signOut(state) {
    state.authToken = null
    state.userName = null
    state.userEmail = null
    state.expiredAt = 0
  },
}

export const getters = {
  isLoggedIn(state) {
    return state.authToken
  },
}

//common functions

// set token expiration time
const setTokenExpirationTime = (payload) => {
  if (payload) return new Date().getTime() + (24*3600*1000);
  else return new Date().getTime() + (2*3600*1000);
}


