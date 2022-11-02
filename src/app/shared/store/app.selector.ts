import { createFeatureSelector } from '@ngrx/store';
import { Appstate } from './state';

export const selectAppState = createFeatureSelector<Appstate>('appState');
