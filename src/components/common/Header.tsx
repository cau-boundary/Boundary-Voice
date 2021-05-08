import * as React from "react";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
	return (
		<>
			<header id="header" className="alt">
				<a href="/" className="logo">
					<strong>Boundary</strong> <span>by Mircat</span>
				</a>
				<nav>
					<a href="#menu">Menu</a>
				</nav>
			</header>
		</>
	);
}
