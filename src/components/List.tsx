import { uniqueId } from "lodash-es"

export const List = <T extends {title:string}[]>({items}:{items:T}) => {
    if(items.length===0){
        return <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>등록된 게시글이 없습니다</div>
    }

    return (
    <>
    {items.map(item=>
        <div style={{display:'flex'}} key={uniqueId()}>
            <div>
            {item.title}
            </div>
        
        </div>)}
        </>)
    
}