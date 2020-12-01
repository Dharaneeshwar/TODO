import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {

  constructor(props) {
    super(props);
    const local = localStorage.getItem('data');
    this.state = local?JSON.parse(local):{
      newItem: "",
      list: [],
      isCollapsePending: false,
      isCollapseDone: false
    };
  }
  updateToLocalStorage(){
    localStorage.setItem('data', JSON.stringify(this.state));
  }
  addItem(todoValue) {
    if (todoValue !== "") {
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false
      };
      const list = [...this.state.list];
      list.push(newItem);
      this.setState({
        list,
        newItem: ""
      },() => {this.updateToLocalStorage();});
    }
  }

  deleteItem(id) {
    const list = [...this.state.list];
    const updatedList = list.filter(item => item.id !== id);
    this.setState({
      list: updatedList
    },() => {this.updateToLocalStorage();})
  }

  updatedInput(input) {
    this.setState({
      newItem: input
    });
  }

  checkItem(id) {
    const list = [...this.state.list];
    list.forEach(ele => {
      if (ele.id === id) {
        ele.isDone = !ele.isDone;
      }
    });
    this.setState({
      list
    },() => {this.updateToLocalStorage();});
  }

  editItem(id, value) {
    const list = [...this.state.list];
    if (!value.length) {
      const updatedList = list.filter(item => item.id !== id);
      this.setState({
        list: updatedList
      },() => {this.updateToLocalStorage();})
    }
    // TODO check on click outside
    if (value.length) {
      list.forEach(ele => {
        if (ele.id === id) {
          ele.value = value;
        }
      });
      this.setState({
        list
      },() => {this.updateToLocalStorage();});
    }
  }

  render() {
    return (
      <div className="container mx-auto pb-3">
        <div className="d-flex mt-3">
          <img src={logo} width="100" className="mx-auto" height="100" alt="logo" />
        </div>
        <p className="text-center title-text">ToDo<span className="sub"> by <a href="https://daranip.com" target="_blank" rel="noopener noreferrer">Dharaneeshwar</a></span></p>
        <div className="col-12 col-md-6 mx-auto">
          <div className="input-group mb-3 d-flex flex-column">
            <form className="d-flex"
              onSubmit={() => this.addItem(this.state.newItem)}
            >
              <input type="text"
                className="form-control"
                placeholder="Add To Do"
                value={this.state.newItem}
                onChange={e => this.updatedInput(e.target.value)}
                onSubmit={() => this.addItem(this.state.newItem)}
              />
              <div className="input-group-append ml-2">
                <button
                  className="btn btn-primary button"
                  type="submit"
                  onClick={() => this.addItem(this.state.newItem)}
                  disabled={!this.state.newItem.length}
                >Add</button>
              </div>
            </form>
          </div>
          <p className="complete text-muted mt-2"   
          >Pending</p>
          <div className="list">
            {this.state.list.map(item => {
              if (!item.isDone && !this.state.isCollapsePending) {
                return (
                  <div className="input-group mb-2" key={item.id}>
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <input
                          type="checkbox"
                          name="isDone"
                          checked={item.isDone}
                          onChange={() => { this.checkItem(item.id) }}
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      value={item.value} 
                      onChange={e => { this.editItem(item.id, e.target.value) }}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-danger"
                        type="button" onClick={() => this.deleteItem(item.id)}
                      >Delete</button>
                    </div>
                  </div>
                );
              } else {
                return("");
              }
            })}
          </div>
          <p className="complete text-muted mt-2">Completed</p>
          <div className="list">
            {this.state.list.map(item => {
              if (item.isDone && (!this.state.isCollapseDone)) {
                return (
                  <div className="input-group mb-2" key={item.id}>
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <input
                          type="checkbox"
                          name="isDone"
                          checked={item.isDone}
                          onChange={() => { this.checkItem(item.id) }}
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      value={item.value}
                      onChange={e => { this.editItem(item.id, e.target.value) }}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-danger"
                        type="button" onClick={() => this.deleteItem(item.id)}
                      >Delete</button>
                    </div>
                  </div>
                );
              } else {
                return("");
              }
            })}
          </div>
        </div>
        <footer>
          &copy; Copyright 2020 <span className="text-primary">todo.daranip.com</span>
        </footer>
      </div>
    );
  }
}

export default App;
