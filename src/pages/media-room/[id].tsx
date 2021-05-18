import React from "react";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
	() => import("@src/components/webRTC"),
	{
		ssr: false,
	},
);

export interface IVideoChatPageProps {
	roomID: any;
}

export default function VideoChatPage(props: IVideoChatPageProps) {
	const { roomID } = props;

	return (
		<>
			<DynamicComponentWithNoSSR roomID={roomID} />
		</>
	);
}

VideoChatPage.getInitialProps = async (ctx) => {
	return { roomID: ctx.query.keyword };
};
