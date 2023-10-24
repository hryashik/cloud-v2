import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { UserInfoType } from "../types/user";
import { FileType } from "../types/file";
import {
   CHANGE_CURRENT_FOLDER,
   CHANGE_SORT,
   DEFINE_USER,
   DELETE_FILES,
   GET_ALL_FILES,
   GO_BACK_PATH,
   LOGOUT_USER,
} from "./mutations-types";
import {
   DELETE_FILES_ACTION,
   GET_FILES_ACTION,
   GO_BACK_PATH_ACTION,
} from "./actions-types";
import apiService from "../services/apiService";
import { SortType } from "../types/sortType";

// define your typings for the store state
export interface State {
   isAuth: boolean;
   user: UserInfoType | undefined;
   files: FileType[];
   currentDir: FileType | undefined;
   sortType: SortType;
}

export interface TodoGetters {
   files(state: State): FileType[];
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
   state: {
      isAuth: false,
      user: undefined,
      files: [],
      currentDir: undefined,
      sortType: "name",
   },
   getters: {
      files: state => {
         /* switch (state.sortType) {
            case "name":
               return state.files.sort((a, b) => {
                  const nameA = a.name;
                  const nameB = b.name;
                  if (nameA < nameB) {
                     return -1;
                  } else {
                     return 1;
                  }
               });
            default:
               return state.files;
         } */
         const sort = state.sortType;
         return state.files.sort((a, b) => {
            const sA = a[sort];
            const sB = b[sort];
            if (sA < sB) {
               return -1;
            } else {
               return 1;
            }
         });
      },
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
      [CHANGE_CURRENT_FOLDER](state, payload: string) {
         const dir = state.files.find(file => file.id === payload);
         if (!dir) {
            state.currentDir = state.files.find(file => file.path === payload);
            return;
         }
         state.currentDir = dir;
      },
      [GO_BACK_PATH](state) {
         const currId = state.currentDir?.parentId;
         state.currentDir = state.files.find(file => file.id === currId);
      },
      [CHANGE_SORT](state, payload: SortType) {
         state.sortType = payload;
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
            console.error(e);
            commit("MUTATE_STATE", files);
            throw Error("Delete was failed");
         }
      },
      async [GO_BACK_PATH_ACTION]({ commit }) {
         commit(GO_BACK_PATH);
      },
   },
});
