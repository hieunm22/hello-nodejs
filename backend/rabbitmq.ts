import amqplib from "amqplib"

export class RabbitMQClient {
  static channel: amqplib.Channel

  static async init(ampqUrl: string) {
    // amqp://localhost:5672
    const conn = await amqplib.connect(ampqUrl, "heartbeat=60")
    const ch = await conn.createChannel()
    await ch
      .assertExchange("exch", "direct", { durable: true })
      .catch(console.error)
    RabbitMQClient.channel = ch
    return ch
  }

  async sendMathTask(channel: amqplib.Channel, value: string) {
    const queueName = "math-queue"
    const rabbitKey = "factorial"
    await channel.assertQueue(queueName, { durable: true })
    await channel.bindQueue(queueName, "exch", rabbitKey)
    await channel.publish(
      "exch",
      rabbitKey,
      Buffer.from(value)
    )
  }
}
