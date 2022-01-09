import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import express, { Application } from 'express';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middlewares/error.middleware';


class App {

  public app: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initalizeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
  }

  private initalizeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.app.use('/api', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

}

export default App;