import { createAction, createReducer, on, props } from "@ngrx/store";
import { User } from "../models/User";

export interface IAppState {
    user: User | null
}

export const appInitialState: IAppState = {
    user: null
}

export const setUser = createAction('[App] Set user', props<User>())
export const getUser = createAction('[App] Get user')

export const appReducer = createReducer(appInitialState,
    on(setUser, (state, action)=>
        ({ ...state, user: action})
    ),
    on(getUser, (state=> state)));