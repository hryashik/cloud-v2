import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { UserInfoType } from "../types/user";
import { FileType } from "../types/file";
import {
   CHANGE_CURRENT_FOLDER,
   CHANGE_FILTER,
   CHANGE_SORT,
   CLEAR_SELECTED_FILES,
   DEFINE_USER,
   DELETE_FILES,
   GET_ALL_FILES,
   GO_BACK_PATH,
   LOGOUT_USER,
   SAVE_FILES,
   SELECT_FILE,
   UPDATE_USER_INFO,
} from "./mutations-types";
import {
   DELETE_FILES_ACTION,
   GET_FILES_ACTION,
   GO_BACK_PATH_ACTION,
   SAVE_FILES_ACTION,
   UPDATE_USER_ACTION,
} from "./actions-types";
import apiService from "../services/apiService";
import { SortType } from "../types/sortType";
import { saveFilesDto, updateUserDto } from "../services/types.dto";

// define your typings for the store state
export interface State {
   isAuth: boolean;
   user: UserInfoType | undefined;
   files: FileType[];
   currentDir: FileType | undefined;
   sortType: SortType;
   selectedFiles: string[];
   filter: string;
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
      selectedFiles: [],
      filter: "",
   },
   getters: {
      files: state => {
         const sort = state.sortType;
         return state.files
            .sort((a, b) => {
               const sA = a[sort];
               const sB = b[sort];
               if (sA < sB) {
                  return -1;
               } else {
                  return 1;
               }
            })
            .filter(file => file.name.toLowerCase().includes(state.filter.toLowerCase()));
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
      [DELETE_FILES](state) {
         state.files = state.files.filter(
            file => !state.selectedFiles.includes(file.id),
         );
         state.selectedFiles = [];
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
      [SAVE_FILES](state, payload: FileType) {
         state.files.push(payload);
      },
      [UPDATE_USER_INFO](state, payload: UserInfoType) {
         state.user = payload;
      },
      [SELECT_FILE](state, { id, key }: { id: string; key?: boolean }) {
         if (state.selectedFiles.includes(id)) {
            state.selectedFiles = state.selectedFiles.filter(el => el !== id);
         } else {
            if (key) state.selectedFiles.push(id);
            else state.selectedFiles = [id];
         }
      },
      [CLEAR_SELECTED_FILES](state) {
         state.selectedFiles = [];
      },
      [CHANGE_FILTER](state, payload: string) {
         state.filter = payload;
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
            commit(DELETE_FILES);
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
      async [SAVE_FILES_ACTION]({ commit }, payload: saveFilesDto) {
         try {
            await apiService.saveFiles(payload);
            const files = await apiService.getAllFiles();
            commit(GET_ALL_FILES, files);
         } catch (error) {
            throw error;
         }
      },
      async [UPDATE_USER_ACTION]({ commit }, payload: updateUserDto) {
         try {
            const info = await apiService.updateUserInfo(payload);
            commit(UPDATE_USER_INFO, info);
         } catch (error) {}
      },
   },
});
