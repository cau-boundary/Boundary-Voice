import React, { useCallback, useState } from 'react';

export default function useRemoteStreams() {

    const [remoteStreams, setRemoteStreams] = useState([]);

    const addRemoteStream = useCallback(
        (stream, peerId) => {
            console.log('add remote stream');
            setRemoteStreams(remoteStreams => {
                if (!stream || !peerId) return [...remoteStreams];
                if (remoteStreams.some(remote => remote.peerId === peerId)) return [...remoteStreams];
                return [...remoteStreams, { peerId: peerId, stream: stream }]
            })
        },
        [],
    )

    const removeRemoteStream = useCallback(
        peerId => {
            console.log('remove remote stream');
            setRemoteStreams(remoteStreams => {
                let index = remoteStreams.findIndex(remote => remote.peerId === peerId);
                if (index < 0) return [...remoteStreams];
                remoteStreams.splice(index, 1);
                return [...remoteStreams]
            })
        },
        [],
    )
    return [remoteStreams, addRemoteStream, removeRemoteStream] as const;
};