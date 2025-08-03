import Button from '../Button/Button';
import styles from './Keypad.module.css';

type KeypadProps = {
	keys: string[];
	handleKeyPress: (key: string) => void;
};

export default function Keypad({ keys, handleKeyPress }: KeypadProps) {
	return (
		<div className={styles.keypad}>
			<div className={styles.keypad__container}>
				{keys.map((key, index) => {
					const variant =
						key === 'C' ? 'remove' : isNaN(Number(key)) ? 'sign' : undefined;
					return (
						<Button
							key={index}
							label={key}
							variant={variant}
							handleClick={() => handleKeyPress(key)}
						/>
					);
				})}
			</div>
		</div>
	);
}
