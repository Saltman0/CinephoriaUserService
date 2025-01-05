import * as amqp from "amqplib";

const url: string = "amqp://guest:guest@10.96.178.161";

export async function publishMessage(exchange: string, message: string) {
    try {
        const connection: amqp.Connection = await amqp.connect(url);
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

export async function subscribeToMessages(exchange: string) {
    try {
        const connection: amqp.Connection = await amqp.connect(url);
        const channel: amqp.Channel = await connection.createChannel();

        await channel.assertExchange(exchange, "fanout", { durable: false });

        const { queue } = await channel.assertQueue('', { exclusive: true });

        await channel.bindQueue(queue, exchange, '');

        // Consume messages from the queue
        await channel.consume(queue, function(message: amqp.ConsumeMessage|null) {
            if (message !== null) {
                console.log(JSON.parse(message.content.toString()));
            }
        }, {
            noAck: true
        });
    } catch (error) {
        console.error(error);
    }
}