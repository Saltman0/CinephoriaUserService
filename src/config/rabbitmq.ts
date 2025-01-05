import * as amqp from "amqplib";

export async function publishMessage(exchange: string, message: string) {
    try {
        const connection: amqp.Connection = await amqp.connect("amqp://guest:guest@10.96.32.76");
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
    const connection: amqp.Connection = await amqp.connect("amqp://guest:guest@10.96.32.76");
    const channel: amqp.Channel = await connection.createChannel();

    await channel.assertExchange(exchange, "fanout", { durable: false });

    const { queue } = await channel.assertQueue('', { exclusive: true });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    await channel.bindQueue(queue, exchange, '');

    // Consume messages from the queue
    await channel.consume(queue, function(message: amqp.ConsumeMessage|null) {
        if (message !== null) {
            console.log(" [x] %s", message.content.toString());
        }
    }, {
        noAck: true
    });

    setTimeout(function () {
        connection.close();
    }, 500);
}