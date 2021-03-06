import userAdapter from '../adapter/user_adapter'

export const signup = input => {
  return dispatch => {
    userAdapter.signup(input)
    .then(data => {
      if (!data.error) {
        localStorage.setItem('token', data.token)
        let payload = {
          user: data.user,
          token: data.token,
          codes: data.codes,
          challenges: data.challenges
        }
        dispatch(loginReducer(payload))
        window.location.replace("http://localhost:3000/code")
      } else {
        alert(data.error)
      }
    })
  }
}

export const login = input => {
  return dispatch => {
    userAdapter.login(input)
    .then(data => {
      if (data.user && !data.error) {
        localStorage.setItem('token', data.token)
        let payload = {
          user: data.user,
          token: data.token,
          codes: data.codes,
          challenges: data.challenges
        }
        dispatch(loginReducer(payload))
        window.location.replace("http://localhost:3000/code")
      } else {
        alert(data.error)
      }
    })
  }
}

export const setUser = token => {
  return dispatch => {
    userAdapter.currentUser(token)
    .then(data => {
      if (!data.error) {
        localStorage.setItem('token', token)
        let payload = {
          token,
          user: data.user,
          codes: data.codes,
          challenges: data.challenges,
        }
        dispatch(loginReducer(payload))
      }

    })
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  return {
    type: "LOGOUT"
  }
}

const loginReducer = payload => {
  return {
    type: "LOGIN",
    payload: payload
  }
}

const challengeReducer = payload => {
  return {
    type: "SET_CHALLENGES",
    payload: payload
  }
}
