import Keypad from '../Keypad/Keypad';
import Display from '../Display/Display';
import styles from './Calculator.module.css';
import { useState, useEffect, useCallback } from 'react';

const buttons: string[] = [
	'(',
	')',
	'%',
	'C',
	'7',
	'8',
	'9',
	'/',
	'4',
	'5',
	'6',
	'*',
	'1',
	'2',
	'3',
	'-',
	'0',
	'.',
	'=',
	'+',
];

export default function Calculator() {
	const [calculation, setCalculation] = useState<string>('');

	// Central logic for handling all keypad and keyboard inputs, including special keys
	const handleKeyPress = useCallback((key: string) => {
		switch (key) {
			// Clear last character or reset completely if showing an error
			case 'C':
				setCalculation((prev) => {
					if (prev === 'ERROR') return '';
					return prev.slice(0, -1);
				});
				break;
			// Evaluate the current expression, handle percentages, and catch invalid inputs
			case '=':
				setCalculation((prev) => {
					try {
						const last = prev.split('=').pop() ?? '';
						const expr = last.replace(/(\d+(\.\d+)?)%/g, (_, n) => `(${n} / 100)`);
						const resultStr = eval(expr).toString();
						return prev + '=' + resultStr;
					} catch {
						return 'ERROR';
					}
				});
				break;
			// Append pressed key to the current calculation, resetting if in error state
			default:
				setCalculation((prev) => {
					if (prev === 'ERROR') prev = '';
					return prev + key;
				});
				break;
		}
	}, []);

	// Listen for physical keyboard events and map them to calculator actions
	useEffect(() => {
		function handleKeyboard(event: KeyboardEvent) {
			let key = event.key;

			// Ignore key holds to prevent repeated input
			if (event.repeat) return;

			// Normalize multiple key names to the calculator's "clear" action
			if (
				key === 'c' ||
				key === 'Backspace' ||
				key === 'Escape' ||
				key === 'Delete'
			)
				key = 'C';

			// Map Enter key to equals
			if (key === 'Enter') key = '=';

			if (buttons.includes(key)) {
				event.preventDefault();
				handleKeyPress(key);
			}
		}

		window.addEventListener('keydown', handleKeyboard);
		return () => window.removeEventListener('keydown', handleKeyboard);
	}, [handleKeyPress]);

	return (
		<div className={styles.calculator}>
			<div className={styles.calculator__case}>
				<Display calculation={calculation} />
				<div className={styles.calculator__switch}>
					<img
						src='/src/assets/images/switch.svg'
						alt='Switch'
						className={styles['calculator__switch-img']}
					/>
				</div>
				<Keypad
					keys={buttons}
					handleKeyPress={(key) => handleKeyPress(key)}
				/>
			</div>
		</div>
	);
}
