import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { UserInfoType } from "../types/user";

// define your typings for the store state
export interface State {
   isAuth: boolean;
   user: UserInfoType | undefined;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
   state: {
      isAuth: false,
      user: undefined,
   },
   mutations: {
      defineUser(state, payload: UserInfoType) {
         state.user = payload;
         state.isAuth = true;
      },
      logoutUser(state) {
         state.isAuth = false;
         state.user = undefined;
         localStorage.removeItem("Authorization");
      },
   },
});
