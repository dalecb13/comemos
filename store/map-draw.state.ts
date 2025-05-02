import { observable } from "@legendapp/state";

export type DRAW_STATE = 'rectangle' | 'polygon';

export const mapDraw$ = observable<DRAW_STATE>('rectangle');
