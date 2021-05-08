import React, { useEffect, useState } from "react";
import Link from "next/link";
import { v4 as uuid } from "uuid";

export interface IVideoRoomsProps {}

export default function VideoRooms(props: IVideoRoomsProps) {
	const [roomID, setRoomID] = useState<string>("");

	useEffect(() => {
		setRoomID(uuid());
	}, []);

	const onRoomIDChange = (e) => {
		setRoomID(e.target.value);
	};

	return (
		<div>
			<article>
				<header className="major">
					<h3>
						<Link
							href={{
								pathname: "/media-room/${roomID}",
								query: { keyword: roomID },
							}}
						>
							Join Video Chat
						</Link>
					</h3>
					<p>{roomID}</p>
				</header>
			</article>
			<input placeholder="roomID" value={roomID} onChange={onRoomIDChange} />
		</div>
	);
}
