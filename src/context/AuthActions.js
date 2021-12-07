export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
  payload: { userCredentials },
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: { user, token },
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: { userId },
});

export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: { userId },
});
