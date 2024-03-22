import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import BoxClass from './component/BoxClass';
import rock from './img/rock.png';
import scissors from './img/scissors.png';
import paper from './img/paper.png';
import default1 from './img/default1.png';
import default2 from './img/default2.png';
import './AppClass.css';
// import RegisterClass from './component/RegisterClass';

const choices = {
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

const defaultPlayers = {
	player1: {
		name: 'Player1',
		img: default1,
	},
	player2: {
		name: 'Player2',
		img: default2,
	},
};

export default class AppClass extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tempUsername: '',
			username: '',
			userSelect: null,
			computerSelect: null,
			result: '',
			default1: defaultPlayers.player1,
			default2: defaultPlayers.player2,
		};
		console.log('choices? ', choices, 'userSelect? ', this.state.userSelect);
	}
	ExitGame = () => {
		this.setState({
			username: '',
			tempUsername: '',
			userSelect: null,
			computerSelect: null,
			result: '',
			default1: defaultPlayers.player1,
			default2: defaultPlayers.player2,
		});
	};
	RestartGame = () => {
		this.setState({
			userSelect: null,
			computerSelect: null,
			result: '',
		});
	};
	handleChange = (e) => {
		this.setState({
			tempUsername: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		setTimeout(() => {
			this.setState({
				username: this.state.tempUsername,
			});
			console.log(
				'Username submitted & this is default1, default2?',
				this.state.tempUsername,
				this.state.default1,
				this.state.default2
			);
		}, 200);
	};

	playGame = (option) => {
		let computerChoice = this.randomChoice();
		let judgement = this.judge(choices[option], computerChoice);
		console.log('computer random choice', computerChoice);
		this.setState(
			{
				userSelect: choices[option], // returning array of keys
				computerSelect: computerChoice, // returning array of keys
				result: judgement,
			},
			() => {
				console.log(
					'userSelect? ',
					this.state.userSelect,
					'computerSelect? ',
					this.state.computerSelect,
					'result? ',
					this.state.result
				);
			}
		);
	};

	randomChoice = () => {
		let itemArray = Object.keys(choices);
		let randomIndex = Math.floor(Math.random() * itemArray.length);
		let computerChoice = itemArray[randomIndex];
		return choices[computerChoice];
	};
	judge = (userChoice, computerChoice) => {
		console.log('user? ', userChoice.name, 'computer? ', computerChoice.name);
		if (userChoice.name === computerChoice.name) {
			return 'Draw';
		} else if (
			(userChoice.name === 'Rock' && computerChoice.name === 'Scissors') ||
			(userChoice.name === 'Scissors' && computerChoice.name === 'Paper') ||
			(userChoice.name === 'Paper' && computerChoice.name === 'Rock')
		) {
			return 'Win';
		} else {
			return 'Lose';
		}
	};

	render() {
		return (
			<div className='App'>
				{!this.state.username ? (
					<Container className='game-container'>
						<div className='register-user-choice'>
							<div className='register'>
								<h1>Rock Scissors Paper</h1>
								<form onSubmit={this.handleSubmit}>
									<label>
										username:
										<input
											type='text'
											placeholder='Your username'
											value={this.state.tempUsername}
											onChange={this.handleChange}
										/>
									</label>
								</form>
							</div>
						</div>
					</Container>
				) : (
					<Container className='game-container'>
						<h1 className='title'>Rock Scissors Paper</h1>
						<div className='user-choice'>
							{this.state.computerSelect ? (
								<>
									<BoxClass
										player={this.state.username}
										decision={this.state.userSelect}
										judge={this.state.result}
										basic={this.state.default1}
									/>
									<BoxClass
										player='Computer'
										decision={this.state.computerSelect}
										judge={this.state.result}
										basic={this.state.default2}
									/>
								</>
							) : (
								<>
									<BoxClass
										player={this.state.username}
										decision={null}
										judge={null}
										basic={this.state.default1}
									/>
									<BoxClass
										player='Computer'
										decision={null}
										judge={null}
										basic={this.state.default2}
									/>
								</>
							)}
						</div>
						<div className='btns'>
							{Object.keys(choices).map((option) => (
								<button key={option} onClick={() => this.playGame(option)}>
									{/* {choices[option].name} */}
									<img
										className='play-btn'
										src={choices[option].img}
										alt='buttons'
									/>
								</button>
							))}
						</div>
						<div className='exit-btn'>
							<button onClick={() => this.ExitGame()}>Exit Game</button>
						</div>
						<div className='restart-btn'>
							<button onClick={() => this.RestartGame()}>Restart</button>
						</div>
					</Container>
				)}
			</div>
		);
	}
}
