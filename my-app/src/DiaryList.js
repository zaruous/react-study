
import TableComponent from "./TableComponent";
import raw from './testdata.json';

function DiaryList(){

    const items = raw.diaryItemList;

    return (
        <div id="DiaryList">
            <TableComponent></TableComponent>
        </div>
    );
}

function readFromFile(){
    fetch(raw)
    .then(r => r.json())
    .then(r =>{
        console.log(r.diaryItemList);
    });
}

export default DiaryList;