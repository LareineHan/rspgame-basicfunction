import React, { Component } from 'react';

export default class BoxClass extends Component {
	getResult = () => {
		const { player, judge } = this.props;
		if (judge == null) {
			return 'Choose';
		} else if (player === 'Computer' && judge !== 'Draw') {
			return judge === 'Win' ? 'Lose' : 'Win';
		} else {
			return judge;
		}
	};

	render() {
		const { player, decision, basic } = this.props;
		console.log(
			'it is BoxClass.js-> user did ',
			this.getResult(),
			'basic . img? ',
			basic.img
		);
		return (
			<div className='box-container '>
				<div className={`box-${this.getResult().toLowerCase()}`}>
					<h1>{player}</h1>
					<img
						className={`rsp-img animate-${this.getResult().toLowerCase()}`}
						src={decision ? decision.img : basic.img}
						alt={player}
					/>
					<h2>{this.getResult()}</h2>
				</div>
			</div>
		);
	}
}
