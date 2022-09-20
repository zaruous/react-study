import './DiaryWrite.css';
//import './DraftEditor';

function DiaryWrite(props){

    const btnDiaryWriteWriteClick = ()=>{
        
        let txtTitle = document.getElementById('txt-DiaryWrite-title').value;
        let txtContent = document.getElementById('textarea-DiaryWrite-content').value;
       

        props.diaryItem.push({
            title:txtTitle,
            content:txtContent
        });
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