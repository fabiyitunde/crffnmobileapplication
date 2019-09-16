import { LOGIN } from "../actionTypes";

const initialState = {
  logininfo: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        logininfo: action.logininfo
      };

    default:
      return state;
  }
}
