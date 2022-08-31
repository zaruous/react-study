
function DiaryList(props){


    return (
        <div id="DiaryList">
            <table border='1px'>
                <thead>
                    <tr><th>제목</th><th>내용</th></tr>
                </thead>
                <tbody>
                {
                    props.diaryItem.map((a, index) =>{
                        return (
                        <tr key={index}>
                            <td>{a.title}</td>
                            <td>{a.content}</td>
                        </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}



export default DiaryList;