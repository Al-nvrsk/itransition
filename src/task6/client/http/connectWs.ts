import { AdressNameListType, MessageSchema } from "../types/types"

interface CreateConnectionProps {
    currentUserName: string, 
    socketRef: React.MutableRefObject<WebSocket | undefined>,
    setData: (data:MessageSchema[]) => void,
    setUserList: (data: AdressNameListType[]) => void 
}

export const createConnection = async(props: CreateConnectionProps) => {
    const {
        currentUserName, 
        socketRef,
        setData,
        setUserList 
    } = props

    if(!currentUserName) {
        return
    }

    socketRef.current = await new WebSocket(`ws://localhost:5001`) 
    socketRef.current.addEventListener('open', () => {
        console.log('Соединение установлено')
    })

    socketRef.current.addEventListener('close', event => {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто')
        } else {
            console.log('Обрыв соединения')
            console.log(`Код: ${event.code} | Причина: ${event.reason}`)
        }
    })

    socketRef.current.addEventListener('error', event => {
        console.log('Ошибка', event)
    })

    socketRef.current.onopen = () => {
        socketRef.current!.send(JSON.stringify({
            user:currentUserName,
            type: 'init'
        }))
    }

    socketRef.current.onmessage = event => {
        const newData = JSON.parse(event.data);

        if ( newData[0].id ) {
            newData.map((message: MessageSchema) => {
                message.key=message.id
                const createDate = new Date(message.createdAt as string)
                message.createdAt = createDate.toLocaleString()
            })
            setData(newData)
        }

        if ( newData[0].value ) {
            setUserList(newData)
        }
    };
}
