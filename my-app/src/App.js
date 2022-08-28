import logo from './logo.svg';
import './App.css';
import './TableComponent';
import TableComponent from './TableComponent';
import Category from "./Category";
import {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TableComponent2 from "./TableComponent2";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <header className="App-header">
                <a
                    className="home-link"
                    href="./"
                    target="_self"
                >Home</a>
            </header>
            <Category></Category>
            <Routes>
                <Route path="/" element={ <TableComponent/> }></Route>
                <Route path="/diary-write" element={ <TableComponent/> }></Route>
                <Route path="/diary-list" element={ <TableComponent2/> }></Route>
            </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
