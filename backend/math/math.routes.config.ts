import { CommonRoutesConfig } from "../common/routes/common.routes.config"
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
        const channel = await RabbitMQClient.init("amqp://localhost:5672")
        const client = new RabbitMQClient()
        client.sendMathTask(channel, req.params.num)
        // rabbitmq.sendMathTask(message)
        res.status(200).send(`waiting for 3 secs`)
      })

    return this.app
  }
}
