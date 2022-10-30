import { createFeatureSelector } from '@ngrx/store';
import { State } from './../../models/interfaces';

export const selectBooks = createFeatureSelector<State[]>('myboard');
