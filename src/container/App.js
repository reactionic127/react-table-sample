import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import ReactTable from "react-table";
import matchSorter from 'match-sorter'
import { makeData } from "../components/Utils";
import '../styles/App.css';
import "react-table/react-table.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: makeData()
		};
	}

	render() {
		const { data } = this.state;
		console.log(data)
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">React Table Filter&Sort</h1>
				</header>
				<div className="full-width margin-t-10">
					<ReactTable
						data={data}
						filterable
						defaultFilterMethod={(filter, row) =>
            				String(row[filter.id]) === filter.value}
						columns={
							[{
								columns: [
									{
										Header: "First Name",
										accessor: "firstName",
										sortMethod: (a, b) => {
											if (a.length === b.length) {
												return a > b ? 1 : -1;
											}
											return a.length > b.length ? 1 : -1;
										},
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, { keys: ["firstName"] }),
										filterAll: true
									},
									{
										Header: "Last Name",
										id: "lastName",
										accessor: d => d.lastName,
										sortMethod: (a, b) => {
											if (a === b) {
												return 0;
											}
											const aReverse = a.split("").reverse().join("");
											const bReverse = b.split("").reverse().join("");
											return aReverse > bReverse ? 1 : -1;
										},
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, { keys: ["lastName"] }),
										filterAll: true
									},
									{
										Header: "Age",
										id: "age",
										accessor: d => d.age,
										sortMethod: (a, b) => {
											if (a === b) {
												return 0;
											}
											const aReverse = a.split("").reverse().join("");
											const bReverse = b.split("").reverse().join("");
											return aReverse > bReverse ? 1 : -1;
										},
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, { keys: ["age"] }),
										filterAll: true
									},
									{
										Header: "Status",
										id: "status",
										accessor: d => d.status,
										sortMethod: (a, b) => {
											if (a === b) {
												return 0;
											}
											const aReverse = a.split("").reverse().join("");
											const bReverse = b.split("").reverse().join("");
											return aReverse > bReverse ? 1 : -1;
										},
										filterMethod: (filter, rows) =>
											matchSorter(rows, filter.value, { keys: ["status"] }),
										filterAll: true
									}
								]
							}]
						}
						defaultPageSize={15}
						className="-striped -highlight"
					/>
				</div>
			</div>
		);
	}
}

export default App;
