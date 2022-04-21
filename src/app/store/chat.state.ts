import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { User } from '../models/User';

interface ChatState {
	user: User | null;
}

const chatInitialState: ChatState = {
	user: null,
};

export const setTalkWithUser = createAction('[Chat] Set TalkWithUser', props<{ user: User }>());
export const getTalkWithUser = createAction('[Chat] Get TalkWithUser', props<{ user: User }>());

export const chatReducer = createReducer(
	chatInitialState,
	on(setTalkWithUser, (state: ChatState, action): ChatState => {
		return { ...state, user: action.user };
	}),
	on(getTalkWithUser, (state): ChatState => ({ ...state }))
);

export const selectChat = createFeatureSelector<ChatState>('chat');
export const selectLoadTalkWithUser = createSelector(selectChat, (state) => state.user);
