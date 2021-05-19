import React from "react";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
	() => import("@src/components/webRTC"),
	{
		ssr: false,
	},
);

export interface IVideoChatPageProps {
	roomId: any;
}

export default function VideoChatPage(props: IVideoChatPageProps) {
	const { roomId } = props;

	return (
		<>
			<DynamicComponentWithNoSSR roomId={roomId} />
		</>
	);
}

VideoChatPage.getInitialProps = async (ctx) => {
	return { roomID: ctx.query.keyword };
};
