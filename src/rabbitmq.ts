import * as amqp from "amqplib";

const url: string = "amqp://"+process.env.RABBITMQ_USER+":"+process.env.RABBITMQ_PASSWORD+"@"+process.env.RABBITMQ_IP;

export async function publishMessage(exchange: string, message: string) {
    try {
        const connection: amqp.ChannelModel = await amqp.connect(url);
        const channel: amqp.Channel = await connection.createChannel();

        await channel.assertExchange(exchange, "fanout", { durable: false });

        channel.publish(exchange, "", Buffer.from(message));
        console.log(`Sent: ${message}`);

        setTimeout(function () {
            connection.close();
        }, 500);
    } catch (error) {
        console.error(error);
    }
}