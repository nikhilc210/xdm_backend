import api from "../../instance";
import { errorLogin, startLogin, successLogin } from "../../slice/Auth";

const loginUser = (payload) => async (dispatch) => {
  dispatch(startLogin());
  try {
    const res = await api.post(`auth/login`, payload);
    dispatch(successLogin(res.data));
  } catch (err) {
    dispatch(errorLogin(err?.response?.data?.message));
  }
};

export { loginUser };
