import expressWs from 'express-ws';
import { Message } from './db/messegeModel.js';
import { Sequelize } from 'sequelize'

export const wsServer = (app) => {
    const { getWss } = expressWs(app)

    const findAllMessage = async (userName) => {
        const messages = await Message.findAll({where:{addressName: userName}, raw: true})
        return messages
    }
    const connectedUser=[]

    app.ws('/', (ws, req) => {
        ws.send(JSON.stringify('web socket connected'))
        ws.on('message', async (msg) => {
            msg = JSON.parse(msg)

            switch (msg.type){
                case 'create':            
                    await Message.create({
                        addressName: msg.addressName,
                        title: msg.title,
                        messageText: msg.messageText,
                        from: msg.from,
                    })

                    connectedUser.forEach(async(client) => {
                        let messages = []
                        if (client.addressName === msg.addressName) {
                            messages = await findAllMessage(msg.addressName)
                            client.send(JSON.stringify(messages))
                        }
                    })

                    return

                case 'init':
                    const messages = await findAllMessage(msg.user)
                    ws.addressName=msg.user
                    connectedUser.push(ws)
                    ws.send(JSON.stringify(messages))

                case 'getAllUsers': 
                    const users = await Message.findAll({
                        attributes: [
                            [Sequelize.fn('DISTINCT', Sequelize.col('addressName')), 'addressName']
                        ]
                    });
                    const mapped = users.map(user => ({
                        value: user.addressName
                    }))
                    ws.send(JSON.stringify(mapped))
            }
        })
    })
}


