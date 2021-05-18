import React, { useEffect, useState } from "react";

// import Chat from '../chat/chat'
// import CallButton from '../callButton/callButton';
import Link from "next/link";
import RTCMedia from "@src/components/webRTC/rtcMedia";
// import LocalStream from "../localStream/localStream";
// import RemoteStream from "../remoteStream/remoteStream";
import classNames from "classnames";
import styles from "@src/components/webrtc/chatRoom/index.module.scss";

export default function ChatRoom({
	className,
	chatroom,
	myPeerId,
	peersOnlineCount,
	myStream,
	remoteStreams,
	// disconnect,
}) {
	return (
		<div className={classNames(className, styles.container)}>
			<div className={styles.header}>
				<div className={styles.header_infos}>
					<div className={styles.header_infos_title}>{chatroom.title}</div>
					<div className={styles.header_infos_location}>
						흑석로, 중앙대학교(5m)
					</div>
				</div>
				<div className={styles.header_buttons}>
					<Link href="/">
						<img src="/icon_exit.svg" alt="" />
					</Link>
					<img src="/icon_exit.svg" alt="" />
				</div>
			</div>
			<div className={styles.participants}>
				<RTCMedia mediaStream={myStream} />
				{remoteStreams.map((mediaStream, index) => {
					return <RTCMedia key={index} mediaStream={mediaStream.stream} />;
				})}
			</div>
		</div>
	);
}
