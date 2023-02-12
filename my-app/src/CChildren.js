
const Hello  = (props)=>{
    return(
        
        <div>
            <div>리액트를 학습하기 위한 페이지.</div>
            <div>안녕하세요 {props.children} 님.</div>
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

