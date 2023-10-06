import {Component} from "react";

import './App.css';
import AppInfo from "./components/app-info/app-info";
import SearchPanel from "./components/search-panel/search-panel";
import AppFilter from "./components/app-filter/app-filter";
import EmployeesList from "./components/employees-list/employees-list";
import EmployeesAddForm from "./components/employees-add-form/employees-add-form";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John', salary: 1200, increase: false, rise:true, id: 1},
                {name: 'Sam', salary: 800, increase: true, rise:false, id: 2},
                {name: 'Bob', salary: 1650, increase: false, rise:false, id: 3},
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4
    }

    deleteItem = (id) => {
       this.setState(({data}) => {
           return {
               data: data.filter(item => item.id !== id)
           }
       })
    }

    addEmployee = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'salary':
                return items.filter(item => item.salary > 1000)
            default:
                return items

        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

  render() {
        const {data, term, filter} = this.state
        const employees = this.state.data.length
        const increased = this.state.data.filter(item => item.increase).length
      const visibleData = this.filterPost(this.searchEmp(data, term), filter)

        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    increased={increased}
                />
                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <EmployeesList
                    data={visibleData}
                    onDelete={id => this.deleteItem(id)}
                    onToggleProp={this.onToggleProp}
                />
                <EmployeesAddForm
                    onAdd={this.addEmployee}
                />
            </div>
            );
  }
}

export default App;
