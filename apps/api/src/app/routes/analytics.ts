import * as express from 'express';

import { CommonRoutesConfig } from './common';

import { createProxyMiddleware } from 'http-proxy-middleware';

const ANALYTICS_SERVICE_URL = 'http://94.26.231.106:8000';

export class AnalyticsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'PlacesRoutes');
  }

  configureRoutes() {
    this.app.use(
      '/api/analytics',
      createProxyMiddleware({
        target: ANALYTICS_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
          [`^/api/analytics`]: '',
        },
      })
    );

    return this.app;
  }
}
