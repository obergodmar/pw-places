import * as express from 'express';
import { CommonRoutesConfig } from './common';
import { listPlacesById } from '../utils/listPlacesById';

export class PlacesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'PlacesRoutes');
  }

  configureRoutes() {
    this.app
      .route('/api/places/:placeId')
      .get(async (req: express.Request, res: express.Response) => {
        const { placeId } = req.params;

        console.log(placeId);

        const placesArray = await listPlacesById(placeId);

        console.log(placesArray);

        res.send(JSON.stringify(placesArray));
      });

    return this.app;
  }
}
