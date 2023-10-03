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
                {name: 'John', salary: 1200, increase: true, id: 1},
                {name: 'Sam', salary: 800, increase: false, id: 2},
                {name: 'Bob', salary: 1650, increase: false, id: 3},
            ]
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
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

  render() {
      return (
          <div className="app">
              <AppInfo/>
              <div className="search-panel">
                  <SearchPanel/>
                  <AppFilter/>
              </div>
              <EmployeesList
                  data={this.state.data}
                  onDelete={id => this.deleteItem(id)}
              />
              <EmployeesAddForm
                  onAdd={this.addEmployee}
              />
          </div>
      );
  }
}

export default App;
