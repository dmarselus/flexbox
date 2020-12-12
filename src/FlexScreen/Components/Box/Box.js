import React from 'react';
import './Box.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Box({ text = 'aa', isSelected, onClick }) {
	return (
		<Card onClick={onClick} style={{ borderWidth: 5, borderColor: isSelected ? 'red' : 'transparent' }}>
			{text}
		</Card>
	);
}
