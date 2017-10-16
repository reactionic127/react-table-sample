import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../styles/App.css';
import '../styles/fixed-data-table.css';
const { Table, Column, Cell } = require('fixed-data-table-2');
const FakeObjectDataListStore = require('../components/FakeObjectDataListStore');
const { TextCell } = require('../components/cells');

class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data.getObjectAt(
      this._indexMap[index],
    );
  }
}

class App extends Component {
	constructor(props) {
		super(props);

		this._dataList = new FakeObjectDataListStore(2000);
		this.state = {
			filteredDataList: this._dataList,
		};

		this._onFilterFirstNameChange = this._onFilterFirstNameChange.bind(this);
		this._onFilterLastNameChange = this._onFilterLastNameChange.bind(this);
		this._onFilterStreetChange = this._onFilterStreetChange.bind(this);
		this._onFilterZipCodeChange = this._onFilterZipCodeChange.bind(this);
		this._onFilterCityChange = this._onFilterCityChange.bind(this);
	}

	_onFilterFirstNameChange(e) {
		if (!e.target.value) {
		this.setState({
			filteredDataList: this._dataList,
		});
		}

		var filterBy = e.target.value.toLowerCase();
		var size = this._dataList.getSize();
		var filteredIndexes = [];
		for (var index = 0; index < size; index++) {
		var {firstName} = this._dataList.getObjectAt(index);
		if (firstName.toLowerCase().indexOf(filterBy) !== -1) {
			filteredIndexes.push(index);
		}
		}

		this.setState({
		filteredDataList: new DataListWrapper(filteredIndexes, this._dataList),
		});
	}

	_onFilterLastNameChange(e) {
		if (!e.target.value) {
		this.setState({
			filteredDataList: this._dataList,
		});
		}

		var filterBy = e.target.value.toLowerCase();
		var size = this._dataList.getSize();
		var filteredIndexes = [];
		for (var index = 0; index < size; index++) {
		var {lastName} = this._dataList.getObjectAt(index);
		if (lastName.toLowerCase().indexOf(filterBy) !== -1) {
			filteredIndexes.push(index);
		}
		}

		this.setState({
		filteredDataList: new DataListWrapper(filteredIndexes, this._dataList),
		});
	}

	_onFilterCityChange(e) {
		if (!e.target.value) {
			this.setState({
				filteredDataList: this._dataList,
			});
		}

		var filterBy = e.target.value.toLowerCase();
		var size = this._dataList.getSize();
		var filteredIndexes = [];
		for (var index = 0; index < size; index++) {
			var {city} = this._dataList.getObjectAt(index);
			if (city.toLowerCase().indexOf(filterBy) !== -1) {
				filteredIndexes.push(index);
			}
		}

		this.setState({
		filteredDataList: new DataListWrapper(filteredIndexes, this._dataList),
		});
	}

	_onFilterStreetChange(e) {
		if (!e.target.value) {
		this.setState({
			filteredDataList: this._dataList,
		});
		}

		var filterBy = e.target.value.toLowerCase();
		var size = this._dataList.getSize();
		var filteredIndexes = [];
		for (var index = 0; index < size; index++) {
		var {street} = this._dataList.getObjectAt(index);
		if (street.toLowerCase().indexOf(filterBy) !== -1) {
			filteredIndexes.push(index);
		}
		}

		this.setState({
		filteredDataList: new DataListWrapper(filteredIndexes, this._dataList),
		});
	}

	_onFilterZipCodeChange(e) {
		if (!e.target.value) {
		this.setState({
			filteredDataList: this._dataList,
		});
		}

		var filterBy = e.target.value.toLowerCase();
		var size = this._dataList.getSize();
		var filteredIndexes = [];
		for (var index = 0; index < size; index++) {
		var {zipCode} = this._dataList.getObjectAt(index);
		if (zipCode.toLowerCase().indexOf(filterBy) !== -1) {
			filteredIndexes.push(index);
		}
		}

		this.setState({
		filteredDataList: new DataListWrapper(filteredIndexes, this._dataList),
		});
	}

	render() {
		const {filteredDataList} = this.state;
		let width = document.body.clientWidth;
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
					<Table
						rowHeight={50}
						rowsCount={filteredDataList.getSize()}
						headerHeight={50}
						width={width}
						height={500}
						className="custom-table"
						{...this.props}>
						<Column
							columnKey="id"
							header={<Cell>ID</Cell>}
							cell={<TextCell data={filteredDataList} />}
							fixed={true}
							width={width/10}
						/>
						<Column
							columnKey="firstName"
							header={<Cell>First Name</Cell>}
							cell={<TextCell data={filteredDataList} />}
							fixed={true}
							width={width/6}
						/>
						<Column
							columnKey="lastName"
							header={<Cell>Last Name</Cell>}
							cell={<TextCell data={filteredDataList} />}
							fixed={true}
							width={width/6}
						/>
						<Column
							columnKey="city"
							header={<Cell>City</Cell>}
							cell={<TextCell data={filteredDataList} />}
							width={width/6}
						/>
						<Column
							columnKey="street"
							header={<Cell>Street</Cell>}
							cell={<TextCell data={filteredDataList} />}
							width={width/6}
						/>
						<Column
							columnKey="zipCode"
							header={<Cell>Zip Code</Cell>}
							cell={<TextCell data={filteredDataList} />}
							width={width/6}
						/>
					</Table>
				</div>
			</div>
		);
	}
}

export default App;
