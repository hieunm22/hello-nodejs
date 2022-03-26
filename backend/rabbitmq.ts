import amqplib from "amqplib"

export class RabbitMQClient {
  static channel: amqplib.Channel

  static async init(ampqUrl: string) {
    // amqp://localhost:5672
    console.log("Publishing")
    const conn = await amqplib.connect(ampqUrl, "heartbeat=60")
    const ch = await conn.createChannel()
    RabbitMQClient.channel = ch
  }

  static async sendMathTask(value: number) {
    const exch = "exchange1"
    const queueName = "math"
    const rabbitKey = "factorial"
    const msg = value
    await RabbitMQClient.channel
      .assertExchange(exch, "direct", { durable: true })
      .catch(console.error)
    await RabbitMQClient.channel.assertQueue(queueName, { durable: true })
    await RabbitMQClient.channel.bindQueue(queueName, exch, rabbitKey)
    await RabbitMQClient.channel.publish(
      exch,
      rabbitKey,
      Buffer.from(msg.toString())
    )
  }
}
