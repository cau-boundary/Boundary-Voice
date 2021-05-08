import Link from "next/link";
import * as React from "react";

export interface IMenuProps {}

export default function Menu(props: IMenuProps) {
	return (
		<>
			<nav id="menu">
				<ul className="links">
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/landing">Landing</Link>
					</li>
					<li>
						<Link href="/generic">Generic</Link>
					</li>
					<li>
						<Link href="/elements">Elements</Link>
					</li>
				</ul>
				<ul className="actions stacked">
					<li>
						<a href="#" className="button primary fit">
							Get Started
						</a>
					</li>
					<li>
						<a href="#" className="button fit">
							Log In
						</a>
					</li>
				</ul>
			</nav>
		</>
	);
}
