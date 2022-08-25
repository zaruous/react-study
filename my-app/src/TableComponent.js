

function TableComponent(props){
    const obj = {
        header: ["품목", "가격(원)", "수량(개)"],
        data: [
          { fruit: "사과", price: "10000원", ea: "5" },
          { fruit: "딸기", price: "8000원", ea: "25" },
          { fruit: "복숭아", price: "15000원", ea: "6" },
          { fruit: "바나나", price: "3000원", ea: "1" },
          { fruit: "메론", price: "30000원", ea: "1" },
          { fruit: "수박", price: "22000원", ea: "1" },
          { fruit: "참외", price: "4000원", ea: "2" },
          { fruit: "체리", price: "6000원", ea: "30" },
          { fruit: "포도", price: "7000원", ea: "3" },
          { fruit: "배", price: "4000원", ea: "1" },
        ],
    };      
    return (
        <>
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
        </>
    );

}



export default TableComponent;