import React, { useContext, useEffect, useRef, useState } from "react";
import RTCMedia from "@src/components/media/RTCMedia";
import styles from "@src/pages/media-room/[id].module.scss";
import { SocketContext } from "@src/util/websocket";

export interface IVideoRoomProps {
	roomID: any;
}

export default function VideoRoom(props: IVideoRoomProps) {
	const { roomID } = props;
	const socket = useContext(SocketContext);
	const [myPeer, setMyPeer] = useState(undefined);
	const [myStream, setMyStream] = useState<MediaStream>(undefined);
	const [otherStreams, setOtherStreams] = useState<MediaStream[]>([]);

	useEffect(() => {
		if (myStream) {
			import("peerjs").then(({ default: Peer }) => {
				const myPeer = new Peer(undefined, {
					host: "/",
					port: 443,
					path: "/media-chat",
				});
				myPeer.on("open", (id) => {
					socket.emit("join-room", roomID, id);
				});
				myPeer.on("call", (caller) => {
					caller.answer(myStream);
					caller.on("stream", (otherStream) => {
						setOtherStreams((otherStreams) => [...otherStreams, otherStream]);
					});
				});
				socket.on("user-connected", (userID) => {
					const callee = myPeer.call(userID, myStream);
					callee.on("stream", (otherStream) => {
						setOtherStreams((otherStreams) => [...otherStreams, otherStream]);
					});
					callee.on("close", () => {
						console.log("stream should be removed");
					});
				});
				socket.on("user-disconnected", (usedID) => {
					console.log("stream should be removed");
				});
			});
		}
	}, [myStream]);

	const getMyMediaStream = async () => {
		const myMedia = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: false,
		});
		setMyStream(myMedia);
	};

	useEffect(() => {
		getMyMediaStream();
	}, []);

	return (
		<div>
			<div className={styles.videoGrid}>
				<RTCMedia mediaStream={myStream} />
				{otherStreams.map((mediaStream, index) => {
					console.log(otherStreams);
					return <RTCMedia key={index} mediaStream={mediaStream} />;
				})}
			</div>
		</div>
	);
}
