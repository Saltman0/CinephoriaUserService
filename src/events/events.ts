import EventEmitter from "node:events";

export const eventEmitter: EventEmitter = new EventEmitter();

eventEmitter.on("messageReceived", async (message: { type: string, event: string, body: any }): Promise<void> => {
    try {
        // TODO A décommenter quand il sera nécessaire de l'utiliser
        /*const actions: { [key: string]: (message: any) => Promise<void> } = {
            "createUser": userEvents.createUserEvent,
            "updateUser": userEvents.updateUserEvent,
            "deleteUser": userEvents.deleteUserEvent
        };

        const key: string = `${message.event}${message.type.charAt(0).toUpperCase() + message.type.slice(1)}`;

        if (actions[key]) {
            await actions[key](message.body);
        } else {
            console.log("Invalid type or event !");
        }*/
    } catch (error) {
        throw error;
    }
});