import { useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Box from './component/Box';
import rock from './img/rock.png';
import scissors from './img/scissors.png';
import paper from './img/paper.png';
import rockbtn from './img/rock.png';
import scissorsbtn from './img/scissors.png';
import paperbtn from './img/paper.png';

const choice = {
	rock: {
		name: 'Rock',
		img: rock,
	},
	scissors: {
		name: 'Scissors',
		img: scissors,
	},
	paper: {
		name: 'Paper',
		img: paper,
	},
};

function App() {
	const [userSelect, setUserSelect] = useState(null);
	const [computerSelect, setComputerSelect] = useState(null);
	const [result, setResult] = useState('');

	const play = (userChoice) => {
		setUserSelect(choice[userChoice]);
		let computerChoice = randomChoice();
		setComputerSelect(computerChoice);
		judge(choice[userChoice], computerChoice);
		setResult(judge(choice[userChoice], computerChoice));
	};

	const judge = (user, computer) => {
		if (user.name === computer.name) {
			return 'Draw';
		} else if (
			(user.name === 'Rock' && computer.name === 'Scissors') ||
			(user.name === 'Scissors' && computer.name === 'Paper') ||
			(user.name === 'Paper' && computer.name === 'Rock')
		) {
			return 'Win';
		} else {
			return 'Lose';
		}
	};

	const randomChoice = () => {
		let itemArray = Object.keys(choice);
		let randomIndex = Math.floor(Math.random() * itemArray.length);
		let computerChoice = itemArray[randomIndex];
		console.log('computer choice', computerChoice);
		return choice[computerChoice];
	};

	return (
		<div className='App'>
			<Container>
				<div className='App-header'></div>

				<div className='App-middle'>
					<div className='box-container'>
						<Box title='You' item={userSelect} result={result} />
						<Box title='Computer' item={computerSelect} result={result} />
					</div>
				</div>
				<div className='App-bottom'>
					<div className='btn-container'>
						<button className='rsp-btn' onClick={() => play('rock')}>
							<img src={rockbtn} alt='rock' />
						</button>
						<button className='rsp-btn' onClick={() => play('scissors')}>
							{' '}
							<img src={scissorsbtn} alt='rock' />
						</button>
						<button className='rsp-btn' onClick={() => play('paper')}>
							{' '}
							<img src={paperbtn} alt='rock' />
						</button>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default App;
