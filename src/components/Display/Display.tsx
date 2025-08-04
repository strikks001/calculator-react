import styles from './Display.module.css';

type DisplayProps = {
	calculation: string;
};

export default function Display({ calculation }: DisplayProps) {
	return (
		<div className={styles.display}>
			<div className={styles.display__container}>
				<div className={styles.display__result}>
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
