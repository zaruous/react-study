
const Hello  = (props)=>{
    return(
        
        <div>
            /* props.children은 태그안의 요소를 가리킴 */
            <div>안녕하세요 {props.children} 님.</div>
            /* 객체를 넘길떈 ... */
            <div>{props.name} {props.age}</div>
        </div>
    );

}

const profile = {
    name:'kim'
    ,age:13
}
function CChildren(){
    return(<div>
        <Hello {...profile}>
            x
        </Hello>
    </div>);
}
export default CChildren;

