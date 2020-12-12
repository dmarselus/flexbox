import React, { useState } from 'react';
import { Button, Container, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FlexScreen.css';
import { Box } from './Components';
import * as Constant from './Constants/Constants';
import NumericInput from 'react-numeric-input';
let containerStyle = {};
export default function FlexScreen() {
	const [ flexDirection, setFlexDirection ] = useState('row');
	const [ flexWrap, setFlexWrap ] = useState('nowrap');
	const [ justifyContent, setJustifyContent ] = useState('flex-start');
	const [ alignItems, setAlignItems ] = useState('flex-start');
	const [ boxCount, setBoxCount ] = useState(1);
	const [ renderObject, setRenderObject ] = useState([ 1 ]);
	const [ isSelected, setIsSelected ] = useState(0);

	function renderInput(title, options, state, setState) {
		return (
			<Dropdown>
				<Dropdown.Toggle>{title}</Dropdown.Toggle>
				<Dropdown.Menu>
					{options.map((item) => (
						<Dropdown.Item
							eventKey={item}
							active={state === item}
							onSelect={(selected) => setState(selected)}
						>
							{item}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
		);
	}

	function renderNumericInput(title, min, max, state, setState) {
		return (
			<div>
				<p>{title}</p>
				<NumericInput min={min} max={max} value={state} onChange={(num) => setState(num)} />
			</div>
		);
	}

	function generateStyle() {
		let arr = [];
		for (let i = 1; i <= boxCount; i++) {
			arr.push(i);
		}
		setRenderObject(arr);
		containerStyle = {
			flexDirection,
			flexWrap,
			justifyContent,
			alignItems
		};
	}

	function renderGeneralInput() {
		return(
		<>
			{renderInput('Flex Direction', Constant.FLEX_DIRECTION, flexDirection, setFlexDirection)}
			{renderInput('Flex Wrap', Constant.FLEX_WRAP, flexWrap, setFlexWrap)}
			{renderInput('Justify Content', Constant.JUSTIFY_CONTENT, justifyContent, setJustifyContent)}
			{renderInput('Align Items', Constant.ALIGN_ITEMS, alignItems, setAlignItems)}
			{renderNumericInput('Box Count', 1, 100, boxCount, setBoxCount)}
			</>
		)
	}

	function renderSelectedInput() {
		return(
			<div>
				<p>asd</p>
			</div>
		)
	}
	return (
		<div>
			<h2>Flex Box</h2>
			{renderGeneralInput()}
			{isSelected && renderSelectedInput()}
			<Button onClick={generateStyle}>Generate</Button>
			<Container style={{ display: 'flex', ...containerStyle }}>
				{renderObject.map((item, index) => {
					let selected = item === isSelected;
					return (
						<Box
							isSelected={selected}
							key={index}
							text={item}
							onClick={() => setIsSelected(selected ? 0 : item)}
						/>
					);
				})}
			</Container>
		</div>
	);
}
