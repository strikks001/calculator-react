import styles from './Button.module.css';

type ButtonProps = {
	label: string;
	handleClick: () => void;
	variant?: 'classic' | 'sign' | 'remove';
};

// Button component with optional variant styles
export default function Button({
	label = 'Calculate',
	handleClick,
	variant = 'classic',
}: ButtonProps) {
	// Determine the CSS class for the given variant
	const variantClass = variant ? styles[`button--${variant}`] : '';

	return (
		<button
			className={`${styles.button} ${variantClass}`}
			onClick={handleClick}>
			{label}
		</button>
	);
}
