import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { UserInfoType } from "../types/user";
import { FileType } from "../types/file";

// define your typings for the store state
export interface State {
   isAuth: boolean;
   user: UserInfoType | undefined;
   files: FileType[];
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
   state: {
      isAuth: false,
      user: undefined,
      files: [],
   },
   mutations: {
      defineUser(state, payload: UserInfoType) {
         state.user = payload;
         state.isAuth = true;
      },
      logoutUser(state) {
         state.isAuth = false;
         state.user = undefined;
         localStorage.removeItem("auth-token");
      },
      getAllFiles(state, payload: FileType[]) {
         state.files = payload;
      },
   },
});
