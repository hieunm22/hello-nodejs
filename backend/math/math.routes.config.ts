import { CommonRoutesConfig } from "../common/common.routes.config"
import express from "express"
import { RabbitMQClient } from "../rabbitmq"

export class MathRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "MathRoutes")
  }

  configureRoutes() {
    this.app
      .route("/math/factorial/:num")
      .get(async (req: express.Request, res: express.Response) => {
        const rabbitmq = await RabbitMQClient.init("amqp://localhost:5672")
        RabbitMQClient.sendMathTask(3)
        // rabbitmq.sendMathTask(message)
        res.status(200).send(`waiting for 3 secs`)
      })

    return this.app
  }
}
