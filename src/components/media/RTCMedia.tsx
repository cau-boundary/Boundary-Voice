import React, { useEffect, useRef } from "react";
import styles from "@src/components/media/RTCMedia.module.scss";

export interface IRTCMediaProps {
	mediaStream: MediaStream;
}

export default function RTCMedia(props: IRTCMediaProps) {
	const viewRef = useRef<HTMLVideoElement>(null);
	const { mediaStream } = props;

	useEffect(() => {
		if (!viewRef.current) return;
		viewRef.current.srcObject = mediaStream ? mediaStream : null;
	}, [mediaStream]);

	return (
		<video
			className={styles.myVideo}
			ref={viewRef}
			autoPlay
			playsInline
		></video>
	);
}
