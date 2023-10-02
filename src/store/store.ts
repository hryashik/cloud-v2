import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

// define your typings for the store state
type UserType = {
   username: string;
   avatar: string | null;
};
export interface State {
   isAuth: boolean;
   user: UserType | undefined;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
   state: {
      isAuth: false,
      user: undefined,
   },
   mutations: {
      defineUser(state, username: string) {
         state.user = {
            username,
            avatar: null,
         };
         state.isAuth = true;
      },
   },
});
