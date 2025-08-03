import styles from './Button.module.css';

type ButtonProps = {
	label: string;
	handleClick: () => void;
	variant?: 'classic' | 'sign' | 'remove';
};

export default function Button({
	label = 'Calculate',
	handleClick,
	variant = 'classic',
}: ButtonProps) {
	const variantClass = variant ? styles[`button--${variant}`] : '';

	return (
		<button
			className={`${styles.button} ${variantClass}`}
			onClick={handleClick}>
			{label}
		</button>
	);
}
