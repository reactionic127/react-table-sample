import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import ReactTable from "react-table";
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
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">React Table Filter&Sort</h1>
				</header>
				<div className="full-width margin-t-10">
					<input
						className="custom-input"
						onChange={this._onFilterFirstNameChange}
						placeholder="Filter by First Name"
					/>
					<input
						className="custom-input"
						onChange={this._onFilterLastNameChange}
						placeholder="Filter by Last Name"
					/>
					<input
						className="custom-input"
						onChange={this._onFilterCityChange}
						placeholder="Filter by City"
					/>
					<input
						className="custom-input"
						onChange={this._onFilterStreetChange}
						placeholder="Filter by Street"
					/>
					<input
						className="custom-input"
						onChange={this._onFilterZipCodeChange}
						placeholder="Filter by Zip Code"
					/>
					<br />
					<ReactTable
						data={data}
						columns={[
							{
							Header: "Name",
							columns: [
								{
								Header: "First Name (Sorted by Length, A-Z)",
								accessor: "firstName",
								sortMethod: (a, b) => {
									if (a.length === b.length) {
									return a > b ? 1 : -1;
									}
									return a.length > b.length ? 1 : -1;
								}
								},
								{
								Header: "Last Name (Sorted in reverse, A-Z)",
								id: "lastName",
								accessor: d => d.lastName,
								sortMethod: (a, b) => {
									if (a === b) {
									return 0;
									}
									const aReverse = a.split("").reverse().join("");
									const bReverse = b.split("").reverse().join("");
									return aReverse > bReverse ? 1 : -1;
								}
								}
							]
							},
							{
							Header: "Info",
							columns: [
								{
								Header: "Age",
								accessor: "age"
								}
							]
							}
						]}
						defaultPageSize={10}
						className="-striped -highlight"
						/>
				</div>
			</div>
		);
	}
}

export default App;
