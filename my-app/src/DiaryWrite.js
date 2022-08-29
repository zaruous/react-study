import './DiaryWrite.css';
//import './DraftEditor';

function DiaryWrite(){

    const btnDiaryWriteWriteClick = ()=>{
        alert('글작성');
    };

    return(
    <div className="DiaryWrite">
        <div className='div-DiaryWrite-btnbox'>
            <button id='btn-DiaryWrite-write' onClick={btnDiaryWriteWriteClick}>작성</button>
        </div>
        <div>
            <span>Title : </span>
            <input type='text' id="txt-DiaryWrite-title"></input>
        </div>
        <div>Content</div>
        <div><textarea id="textarea-DiaryWrite-content" rows={10}></textarea></div>
        <div id='myeditor-container'></div>
    </div>
    );
}


export default DiaryWrite;