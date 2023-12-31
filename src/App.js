// 1:54:00
import "./App.css";
import { Footer } from "./components/Footer";
import Header from "./components/Header";
import { Todos } from "./components/Todos";
import React, { useEffect, useState } from "react";
import { AddTodo } from "./components/AddTodo";
import { BrowserRouter as Router,  Route, Link } from "react-router-dom";
import { About } from "./components/About";

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("I'm onDelete of todo ", todo);

    // Deleting this way in react doesn't work
    // let index = todos.indexOf(todo)
    // todos.splice(index, 1)

    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );

    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const addTodo = (title, desc) => {
    console.log("i'm adding this todo to list", title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 1;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  };

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar={true} />

        
          <Route exact path="/" render= {() => {
            return(
            <>
            <AddTodo addTodo={addTodo} />
           <Todos todos={todos} onDelete={onDelete} />
            </>
            )
          }}>
            
          </Route>
          <Route exact path="/about">
            <About />
          </Route>     
       

        <Footer />
      </Router>
    </>
  );
}

export default App;
