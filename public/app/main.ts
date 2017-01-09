import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import 'materialize-css';
import 'angular2-materialize';

import { Subporter } from './app';

//enableProdMode();
platformBrowserDynamic().bootstrapModule(Subporter);