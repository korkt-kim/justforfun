import { PropsWithChildren } from "react"
import { Link, LinkProps } from "react-router-dom"



const GNB = ({children}: PropsWithChildren) => {
    return <nav style={{display:'flex', justifyContent:'center', alignItems:'center',gap:"10px"}}>
        {children}
    </nav>
}

const Item = (props: LinkProps) =>{
   return <li style={{listStyle:'none'}}><Link {...props}/></li>
       
}

GNB.Item = Item

export default GNB