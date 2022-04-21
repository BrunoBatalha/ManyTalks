import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { User } from '../models/User';

interface IAppState {
	user: User | null;
}

const appInitialState: IAppState = {
	user: null,
};

export const setUser = createAction('[App] Set user', props<{ user: User }>());
export const getUser = createAction('[App] Get user');

export const appReducer = createReducer(
	appInitialState,
	on(setUser, (state: IAppState, action): IAppState => ({ ...state, user: action.user })),
	on(getUser, (state: IAppState): IAppState => ({ ...state }))
);

export const selectApp = createFeatureSelector<IAppState>('app');
export const selectLoadUser = createSelector(selectApp, (state) => state.user);
