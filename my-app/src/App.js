import './App.css';
import './TableComponent';
import TableComponent from './TableComponent';
import Category from "./Category";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DiaryWrite from "./DiaryWrite";
import DiaryList from "./DiaryList";
import News from "./News";
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
                <Route path="/diary-write" element={ <DiaryWrite/> }></Route>
                <Route path="/diary-list" element={ <DiaryList/> }></Route>
                <Route path="/news" element={ <News/> }></Route>
            </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
