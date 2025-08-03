import styles from './Display.module.css';

type DisplayProps = {
	calculation: string;
	result: string;
};

export default function Display({ calculation, result }: DisplayProps) {
	return (
		<div className={styles.display}>
			<div className={styles.display__container}>
				<div className={styles.display__result}>
					<span className={styles['display--active']}>{calculation}</span>
					<span className={styles['display--result']}>{result}</span>
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
