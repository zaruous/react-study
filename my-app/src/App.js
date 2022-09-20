import './App.css';
import Category from "./Category";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DiaryWrite from "./DiaryWrite";
import DiaryList from "./DiaryList";
import NotFound from "./NotFound";
import News from "./News";
import UserList from "./UserList";
import StartPage from "./StartPage";
function App() {


  
const diaryItem = [
    {
        title:'hello',
        content : 'hello'
    },
    {
        title:'hello2',
        content : 'hello2'
    }
];
  
//  diaryItem={this.state.diaryItem}

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
                <Route path="/" element={<StartPage/>} ></Route>
                <Route path="/diary-write" element={ <DiaryWrite diaryItem={diaryItem}/> }></Route>
                <Route path="/diary-list" element={ <DiaryList diaryItem={diaryItem}/> }></Route>
                <Route path="/news" element={ <News/> }></Route>
                <Route path="/userList" element={ <UserList/> }></Route>
                <Route path="*" element={ <NotFound/> }></Route>
            </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
