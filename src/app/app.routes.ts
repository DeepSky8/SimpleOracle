import { Routes } from '@angular/router';
import { Body } from './display/body/body';

export enum ROUTER_TOKENS {
    SIMPLE = 'simple',
    ADVANCED = 'complex',
    ALL = 'all',
    LOGIN = 'login',

}

export const routes: Routes = [
    {
        path: '',
        redirectTo: ROUTER_TOKENS.SIMPLE,
        pathMatch: 'full',
    },
    {
        path: ROUTER_TOKENS.SIMPLE,
        component: Body,
    },
    {
        path: ROUTER_TOKENS.ADVANCED,
        component: Body,
    },
    {
        path: ROUTER_TOKENS.ALL,
        component: Body,
    },
    {
        path: '**',
        redirectTo: ROUTER_TOKENS.SIMPLE
    }
];
