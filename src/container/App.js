import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../styles/App.css';
import '../styles/fixed-data-table.css';
const { Table, Column, Cell } = require('fixed-data-table-2');
const FakeObjectDataListStore = require('../components/FakeObjectDataListStore');
const { TextCell } = require('../components/cells');

const SortTypes = {
	ASC: 'ASC',
	DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
	return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

class SortHeaderCell extends React.Component {
	constructor(props) {
		super(props);
	
		this._onSortChange = this._onSortChange.bind(this);
	}
  
	render() {
	  var {onSortChange, sortDir, children, ...props} = this.props;
	  return (
		<Cell {...props}>
			<a onClick={this._onSortChange}>
				{children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
			</a>
		</Cell>
	  );
	}
  
	_onSortChange(e) {
		e.preventDefault();
	
		if (this.props.onSortChange) {
			this.props.onSortChange(
			this.props.columnKey,
			this.props.sortDir ?
				reverseSortDirection(this.props.sortDir) :
				SortTypes.DESC
			);
		}
	}
}

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
		this._defaultSortIndexes = [];
		var size = this._dataList.getSize();
		for (var index = 0; index < size; index++) {
			this._defaultSortIndexes.push(index);
		}
		this.state = {
			filteredDataList: this._dataList,
			sortedDataList: this._dataList,
			colSortDirs: {},
		};

		this._onFilterFirstNameChange = this._onFilterFirstNameChange.bind(this);
		this._onFilterLastNameChange = this._onFilterLastNameChange.bind(this);
		this._onFilterStreetChange = this._onFilterStreetChange.bind(this);
		this._onFilterZipCodeChange = this._onFilterZipCodeChange.bind(this);
		this._onFilterCityChange = this._onFilterCityChange.bind(this);
		this._onSortChange = this._onSortChange.bind(this);
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

	_onSortChange(columnKey, sortDir) {
		var sortIndexes = this._defaultSortIndexes.slice();
		sortIndexes.sort((indexA, indexB) => {
			var valueA = this._dataList.getObjectAt(indexA)[columnKey];
			var valueB = this._dataList.getObjectAt(indexB)[columnKey];
			var sortVal = 0;
			if (valueA > valueB) {
				sortVal = 1;
			}
			if (valueA < valueB) {
				sortVal = -1;
			}
			if (sortVal !== 0 && sortDir === SortTypes.ASC) {
				sortVal = sortVal * -1;
			}

			return sortVal;
		});
	
		this.setState({
			sortedDataList: new DataListWrapper(sortIndexes, this._dataList),
			colSortDirs: {
				[columnKey]: sortDir,
			},
		});
	}

	render() {
		const {filteredDataList, colSortDirs} = this.state;
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
							header={
								<SortHeaderCell
									onSortChange={this._onSortChange}
									sortDir={colSortDirs.id}>
									ID
								</SortHeaderCell>
							}
							cell={<TextCell data={filteredDataList} />}
							fixed={true}
							width={width/10}
						/>
						<Column
							columnKey="firstName"
							header={
								<SortHeaderCell
									onSortChange={this._onSortChange}
									sortDir={colSortDirs.firstName}>
									First Name
								</SortHeaderCell>
							}
							cell={<TextCell data={filteredDataList} />}
							fixed={true}
							width={width/6}
						/>
						<Column
							columnKey="lastName"
							header={
								<SortHeaderCell
									onSortChange={this._onSortChange}
									sortDir={colSortDirs.lastName}>
									Last Name
								</SortHeaderCell>
							}
							cell={<TextCell data={filteredDataList} />}
							fixed={true}
							width={width/6}
						/>
						<Column
							columnKey="city"
							header={
								<SortHeaderCell
									onSortChange={this._onSortChange}
									sortDir={colSortDirs.city}>
									City
								</SortHeaderCell>
							}
							cell={<TextCell data={filteredDataList} />}
							width={width/6}
						/>
						<Column
							columnKey="street"
							header={
								<SortHeaderCell
									onSortChange={this._onSortChange}
									sortDir={colSortDirs.street}>
									Street
								</SortHeaderCell>
							}
							cell={<TextCell data={filteredDataList} />}
							width={width/6}
						/>
						<Column
							columnKey="zipCode"
							header={
								<SortHeaderCell
									onSortChange={this._onSortChange}
									sortDir={colSortDirs.zipCode}>
									Zip Code
								</SortHeaderCell>
							}
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
