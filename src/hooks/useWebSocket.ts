/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
const socketURL = 'ws://localhost:3000';


export default function useWebSocket() {
    const [socket, setSocket] = useState<WebSocket>(new WebSocket(socketURL));
    const [connectedPeers, setConnectedPeers] = useState([]);
    // const [messages, setMessages] = useState([]);

    const getPeers = () => {
        return JSON.stringify({ type: 'peers' })
    }

    const cleanUp = () => {
        setConnectedPeers([]);
    }


    const connect = useCallback(
        (peerId) => {
            let data = JSON.stringify({
                type: 'connect',
                message: {
                    peerId
                }
            })
            socket.send(data);
        },
        []
    )

    const disconnect = useCallback(
        (peerId) => {
            let data = JSON.stringify({
                type: 'disconnect',
                message: {
                    peerId
                }
            })
            socket.send(data);
        }
        ,[]
    )

    useEffect(()=>{
        const ws = socket ? socket : new WebSocket(socketURL);

        setSocket(ws);
    })

    useEffect(() => {
        if(socket){
            socket.onopen = (event) => {
                console.log('connected');
                socket.send(getPeers());
            };
    
            socket.onclose = (event) => {
                console.log('disconnected');
                cleanUp();
            };
    
            socket.onerror = (error) => {
                console.log(error);
            };
    
            return () => {
                socket.close();
                cleanUp();
            };
        }
    }, [socket])

    return { socket, connectedPeers, connect, disconnect } as const;
};