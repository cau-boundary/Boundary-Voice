import React, { useContext, useEffect, useState } from "react";
import { useRemoteStream, useUserMedia } from "@src/hooks";

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
	port: 3000,
	path: "/media-chat",
	config,
	// secure: true,
	debug: 1,
};

export default function VideoRoom(props: IVideoRoomProps) {
	const { roomId } = props;
	const socket = useContext(SocketContext);
	const localStream = useUserMedia();
	const [
		remoteStreams,
		addRemoteStream,
		removeRemoteStream,
	] = useRemoteStream();
	// const [myPeer, myPeerID] = usePeer(addRemoteStream, removeRemoteStream);

	useEffect(() => {
		if (localStream && socket) {
			import("peerjs").then(({ default: Peer }) => {
				const myPeer = new Peer(undefined, {
					host: "localhost",
					port: 3000,
					path: "/media-chat",
					debug: 1,
				});
				myPeer.on("open", (id) => {
					console.log("peer initialized");
					socket.emit("join-room", roomId, id);
				});
				myPeer.on("call", (caller) => {
					console.log("get call from caller");
					caller.answer(localStream);
					caller.on("stream", (remoteStream) => {
						addRemoteStream(remoteStream, caller.peer);
					});
				});
				myPeer.on("disconnected", () => {
					console.log("Peer disconnected");
				});
				myPeer.on("close", () => {
					console.log("peer closed remotely");
				});
				myPeer.on("error", (error) => {
					console.log("peer error", error);
				});

				socket.on("user-connected", (userID) => {
					console.log("user-connected");
					const callee = myPeer.call(userID, localStream);
					callee.on("stream", (remoteStream) => {
						addRemoteStream(remoteStream, callee.peer);
					});
					callee.on("close", () => {
						console.log("call closed");
						removeRemoteStream(callee.peer);
						callee.close();
					});
					callee.on("error", (error) => {
						console.log("call error", error);
						removeRemoteStream(callee.peer);
						callee.close();
					});
				});
				socket.on("user-disconnected", (usedID) => {
					console.log("stream should be removed");
					// 	if (peers[userID]) peers[userID].close();
				});
			});
		}
	}, [addRemoteStream, localStream, removeRemoteStream, roomId, socket]);

	return (
		<div>
			<div className={styles.videoGrid}>
				<RTCMedia mediaStream={localStream} />
				{remoteStreams.map((mediaStream, index) => {
					return <RTCMedia key={index} mediaStream={mediaStream.stream} />;
				})}
			</div>
		</div>
	);
}
