import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { UserInfoType } from "../types/user";
import { FileType } from "../types/file";
import {
   DEFINE_USER,
   DELETE_FILES,
   GET_ALL_FILES,
   LOGOUT_USER,
} from "./mutations-types";
import { DELETE_FILES_ACTION, GET_FILES_ACTION } from "./actions-types";
import apiService from "../services/apiService";

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
      [DEFINE_USER](state, payload: UserInfoType) {
         state.user = payload;
         state.isAuth = true;
      },
      [LOGOUT_USER](state) {
         state.isAuth = false;
         state.user = undefined;
         state.files = [];
         localStorage.removeItem("auth-token");
      },
      [GET_ALL_FILES](state, payload: FileType[]) {
         state.files = payload;
      },
      [DELETE_FILES](state, payload: string[]) {
         state.files = state.files.filter(file => !payload.includes(file.id));
      },
      ["MUTATE_STATE"](state, payload: FileType[]) {
         state.files = payload;
      },
   },
   actions: {
      async [GET_FILES_ACTION]({ commit }) {
         try {
            const files = await apiService.getAllFiles();
            commit(GET_ALL_FILES, files);
         } catch (error) {}
      },
      async [DELETE_FILES_ACTION]({ commit, state }, payload: string[]) {
         const files = state.files;
         try {
            commit(DELETE_FILES, payload);

            const promises = payload.map(id => apiService.deleteFile(id));
            await Promise.all(promises);
         } catch (e) {
            console.error(e)
            commit("MUTATE_STATE", files);
            throw Error("Delete was failed");
         }
      },
   },
});
