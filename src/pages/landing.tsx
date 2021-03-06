import React, { useEffect } from "react";
import { Menu, Footer, Contact } from "@src/components/common";

export interface ILandingProps {}

export default function Landing(props: ILandingProps) {
	useEffect(() => {
		document.querySelector("body").classList.add("is-preload");
	}, []);

	return (
		<>
			<div id="wrapper">
				{/* <!-- Header --> */}
				{/* <!-- Note: The "styleN" class below should match that of the banner element. --> */}
				<header id="header" className="alt style2">
					<a href="/" className="logo">
						<strong>Forty</strong> <span>by HTML5 UP</span>
					</a>
					<nav>
						<a href="#menu">Menu</a>
					</nav>
				</header>

				{/* <!-- Menu --> */}
				<Menu />

				{/* <!-- Banner --> */}
				{/* <!-- Note: The "styleN" className below should match that of the header element. --> */}
				<section id="banner" className="style2">
					<div className="inner">
						<span className="image">
							<img src="images/pic07.jpg" alt="" />
						</span>
						<header className="major">
							<h1>Landing</h1>
						</header>
						<div className="content">
							<p>
								Lorem ipsum dolor sit amet nullam consequat
								<br />
								sed veroeros. tempus adipiscing nulla.
							</p>
						</div>
					</div>
				</section>

				{/* <!-- Main --> */}
				<div id="main">
					{/* <!-- One --> */}
					<section id="one">
						<div className="inner">
							<header className="major">
								<h2>Sed amet aliquam</h2>
							</header>
							<p>
								Nullam et orci eu lorem consequat tincidunt vivamus et sagittis
								magna sed nunc rhoncus condimentum sem. In efficitur ligula tate
								urna. Maecenas massa vel lacinia pellentesque lorem ipsum dolor.
								Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis
								libero. Nullam et orci eu lorem consequat tincidunt vivamus et
								sagittis magna sed nunc rhoncus condimentum sem. In efficitur
								ligula tate urna.
							</p>
						</div>
					</section>

					{/* <!-- Two --> */}
					<section id="two" className="spotlights">
						<section>
							<a href="generic.html" className="image">
								<img
									src="images/pic08.jpg"
									alt=""
									data-position="center center"
								/>
							</a>
							<div className="content">
								<div className="inner">
									<header className="major">
										<h3>Orci maecenas</h3>
									</header>
									<p>
										Nullam et orci eu lorem consequat tincidunt vivamus et
										sagittis magna sed nunc rhoncus condimentum sem. In
										efficitur ligula tate urna. Maecenas massa sed magna lacinia
										magna pellentesque lorem ipsum dolor. Nullam et orci eu
										lorem consequat tincidunt. Vivamus et sagittis tempus.
									</p>
									<ul className="actions">
										<li>
											<a href="generic.html" className="button">
												Learn more
											</a>
										</li>
									</ul>
								</div>
							</div>
						</section>
						<section>
							<a href="generic.html" className="image">
								<img src="images/pic09.jpg" alt="" data-position="top center" />
							</a>
							<div className="content">
								<div className="inner">
									<header className="major">
										<h3>Rhoncus magna</h3>
									</header>
									<p>
										Nullam et orci eu lorem consequat tincidunt vivamus et
										sagittis magna sed nunc rhoncus condimentum sem. In
										efficitur ligula tate urna. Maecenas massa sed magna lacinia
										magna pellentesque lorem ipsum dolor. Nullam et orci eu
										lorem consequat tincidunt. Vivamus et sagittis tempus.
									</p>
									<ul className="actions">
										<li>
											<a href="generic.html" className="button">
												Learn more
											</a>
										</li>
									</ul>
								</div>
							</div>
						</section>
						<section>
							<a href="generic.html" className="image">
								<img src="images/pic10.jpg" alt="" data-position="25% 25%" />
							</a>
							<div className="content">
								<div className="inner">
									<header className="major">
										<h3>Sed nunc ligula</h3>
									</header>
									<p>
										Nullam et orci eu lorem consequat tincidunt vivamus et
										sagittis magna sed nunc rhoncus condimentum sem. In
										efficitur ligula tate urna. Maecenas massa sed magna lacinia
										magna pellentesque lorem ipsum dolor. Nullam et orci eu
										lorem consequat tincidunt. Vivamus et sagittis tempus.
									</p>
									<ul className="actions">
										<li>
											<a href="generic.html" className="button">
												Learn more
											</a>
										</li>
									</ul>
								</div>
							</div>
						</section>
					</section>

					{/* <!-- Three --> */}
					<section id="three">
						<div className="inner">
							<header className="major">
								<h2>Massa libero</h2>
							</header>
							<p>
								Nullam et orci eu lorem consequat tincidunt vivamus et sagittis
								libero. Mauris aliquet magna magna sed nunc rhoncus pharetra.
								Pellentesque condimentum sem. In efficitur ligula tate urna.
								Maecenas laoreet massa vel lacinia pellentesque lorem ipsum
								dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et
								sagittis libero. Mauris aliquet magna magna sed nunc rhoncus
								amet pharetra et feugiat tempus.
							</p>
							<ul className="actions">
								<li>
									<a href="generic.html" className="button next">
										Get Started
									</a>
								</li>
							</ul>
						</div>
					</section>
				</div>

				<Contact />
				<Footer />
			</div>
		</>
	);
}
