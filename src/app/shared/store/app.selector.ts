import { createFeatureSelector } from '@ngrx/store';
import { AppState } from './state';

export const selectAppState = createFeatureSelector<AppState>('appState');

export const selectUserToken = createFeatureSelector<AppState>('appState');
