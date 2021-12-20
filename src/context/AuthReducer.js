const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        token: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        isFetching: false,
        error: false,
        token: action.payload.token,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
        token: null,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
        token: null,
      }
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
