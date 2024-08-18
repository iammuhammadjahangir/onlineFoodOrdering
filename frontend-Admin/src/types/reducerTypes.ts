import { NewUserData } from "./apiTypes";
import { signInUser } from "./types";

export interface signInReducerInitialState {
  user: signInUser | null;
  loading: boolean;
  error: string | boolean | null;
  isAuthenticated: boolean;
}

export type UserDetailInitialStateType = {
  loading: boolean;
  user: NewUserData | null;
};
