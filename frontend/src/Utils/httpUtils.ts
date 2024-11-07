import { logoutUser } from "../Redux/Actions/userActions";
import { store } from "../Redux/store";

export function checkAuthErr(err: { request: { status: number } }) {
  if (err.request.status === 401) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
  console.log(err);
}
