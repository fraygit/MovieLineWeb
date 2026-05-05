import { bootstrapApplication } from '@angular/platform-browser';
import { mergeApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { appConfig } from './app/app.config';
import { App } from './app/app';

const browserConfig = mergeApplicationConfig(appConfig, {
  providers: [provideBrowserGlobalErrorListeners()]
});

bootstrapApplication(App, browserConfig)
  .catch((err) => console.error(err));
