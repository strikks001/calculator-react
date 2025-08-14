import styles from './Display.module.css';
import { useEffect, useRef } from 'react';

type DisplayProps = {
	calculation: string;
};

export default function Display({ calculation }: DisplayProps) {
	const displayRef = useRef<HTMLDivElement>(null);

	// Ensure the display is always scrolled to the end
	useEffect(() => {
		if (displayRef.current) {
			displayRef.current.scrollLeft = displayRef.current.scrollWidth;
		}
	}, [calculation]);

	return (
		<div
			className={styles.display}
			role='region'
			aria-label='calculator display'>
			<div className={styles.display__container}>
				<div
					className={styles.display__result}
					ref={displayRef}>
					{calculation && (
						<span className={styles['display--active']}>{calculation}</span>
					)}
				</div>
			</div>
			<div className={styles.display__dots}>
				<div className={styles.display__dot}></div>
				<div className={styles.display__dot}></div>
				<div className={styles.display__dot}></div>
			</div>
		</div>
	);
}
