import React from 'react';
import Image from 'next/image';
import Link from 'next/link'
import styles from './navigation.module.css';

const Navigation: React.FC = () => {
	return (
		<aside className={styles.sidebar}>
			<header className={styles.logo}>
				{/* <Link href={LOGO_LINK_URL}>
					<Image
						priority
						src={LOGO_SRC}
						alt="Qonto logo"
						height={32}
						width={32}
					/>
				</Link> */}
			</header>
			<nav className={styles.menu}>
				{/* <ul>
					{LINKS.map((link) => (
						<li key={link.url}>
							<NavigationLink {...link} />
						</li>
					))}
				</ul> */}
			</nav>
		</aside>
	);
};

export default Navigation;
