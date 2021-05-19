import React, { useContext, useEffect, useState } from "react";
import { usePeer, useRemoteStream, useUserMedia } from "@src/hooks";

import RTCMedia from "@src/components/webRTC/rtcMedia";
import { SocketContext } from "@src/util/websocket";
import styles from "@src/components/webRTC/index.module.scss";

export interface IVideoRoomProps {
	roomId: string;
}

const userMediaConfig = {
	audio: { echoCancellation: true, noiseSuppression: true },
	video: { facingMode: "user" },
};

const config = { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }] };

const localConfig = {
	host: "/",
	port: 443,
	path: "/media-chat",
	config,
	// secure: true,
	debug: 1,
};

export default function VideoRoom(props: IVideoRoomProps) {
	const { roomId } = props;
	const socket = useContext(SocketContext);
	const peers = {};
	const localStream = useUserMedia();
	const [
		remoteStreams,
		addRemoteStream,
		removeRemoteStream,
	] = useRemoteStream();
	// const [myPeer, myPeerID] = usePeer(addRemoteStream, removeRemoteStream,roomId);

	useEffect(() => {
		if (localStream) {
			import("peerjs").then(({ default: Peer }) => {
				const myPeer = new Peer(undefined, localConfig);

				myPeer.on("open", (id) => {
					socket.emit("join-room", roomId, id);
				});

				myPeer.on("call", (call) => {
					call.answer(localStream);
					call.on("stream", (remoteStream) => {
						addRemoteStream(remoteStream, call.peer);
					});

					call.on("close", () => {
						console.log("The call has ended");
						removeRemoteStream(call.peer);
					});

					call.on("error", (error) => {
						console.log(error);
						removeRemoteStream(call.peer);
					});
				});

				myPeer.on("disconnected", () => {
					console.log("Peer disconnected");
					myPeer.disconnect();
					myPeer.destroy();
				});

				myPeer.on("close", () => {
					console.log("Peer closed remotetly");
					myPeer.disconnect();
					myPeer.destroy();
				});

				myPeer.on("error", (error) => {
					console.log("peer error", error);
					myPeer.disconnect();
					myPeer.destroy();
				});

				socket.on("user-connected", (userID) => {
					//call.peer == userID
					const call = myPeer.call(userID, localStream);
					console.log(call);
					// add other users media stream
					call.on("stream", (remoteStream) => {
						addRemoteStream(remoteStream, call.peer);
					});
					peers[userID] = call;
				});
				socket.on("user-disconnected", (userID) => {
					console.log("user-disconnected");
					console.log(userID);
					removeRemoteStream(userID);
					if (peers[userID]) peers[userID].close();
				});
			});
		}
	}, [localStream]);

	const onButtonClick = (e) => {
		e.preventDefault();
		console.log(e);
	};

	return (
		<div>
			<div className={styles.videoGrid}>
				<RTCMedia mediaStream={localStream} />
				{remoteStreams.map((mediaStream, index) => {
					return <RTCMedia key={index} mediaStream={mediaStream.stream} />;
				})}
			</div>
			<button onClick={onButtonClick}>close call</button>
		</div>
	);
}
