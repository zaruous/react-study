

function TableComponent(props){
    const obj = {
        header: ["품목", "가격(원)", "수량(개)"],
        data: [
          { fruit: "사과", price: "10000원", ea: "5" },
          { fruit: "딸기", price: "8000원", ea: "25" },
          { fruit: "복숭아", price: "15000원", ea: "6" },

        ],
    };      
    return (
        <div className='TableComponent'>
            <table border='1px'>
                <thead>
                    {
                        obj.header.map( a =>{
                            return (
                                <th>{a}</th>
                            );
                        })
                    }
                   
                </thead>
                <tbody>
                    {
                        obj.data.map( a=>{
                            return(
                                <tr>
                                    
                                    <td>{a.fruit}</td>
                                    <td>{a.price}</td>
                                    <td>{a.ea}</td>
                                </tr>
                            );
                        })
                    }
                 
                   
                </tbody>
            </table>
        </div>
    );

}



export default TableComponent;