import Keypad from '../Keypad/Keypad';
import Display from '../Display/Display';
import styles from './Calculator.module.css';
import { useState } from 'react';

export default function Calculator() {
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

	const [calculation, setCalculation] = useState<string>('');
	const [result, setResult] = useState<string>('');

	// Function to handle key presses
	const handleKeyPress = (key: string) => {
		switch (key) {
			case 'C':
				// Clear the calculation and result
				setCalculation((prev) => prev.slice(0, -1));
				if (calculation.length < 2 && result.length > 0) setResult('');
				break;
			case '=': {
				try {
					// Replace percentage with division by 100 if present
					const expression = calculation.includes('%')
						? calculation.replace(/(\d+(\.\d+)?)%/g, (_, number) => {
								return `(${number} / 100)`;
						  })
						: calculation;
					const result = eval(expression);
					setResult(result.toString());
				} catch {
					// Handle any errors in the calculation
					setResult('Error');
					setCalculation('');
				}
				break;
			}
			default:
				// Append the key to the calculation
				setCalculation((prev) => prev + key);
				break;
		}
	};

	return (
		<div className={styles.calculator}>
			<div className={styles.calculator__case}>
				<Display
					calculation={calculation}
					result={result}
				/>
				<div className={styles.calculator__switch}>
					<img
						src='/src/assets/switch.svg'
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
