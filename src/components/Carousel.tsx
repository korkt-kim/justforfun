import { ComponentProps, useEffect, useRef, useState } from "react"

interface CarouselProps extends ComponentProps<'div'>{
    images: string[],
    duration?: number //ms
    
}

const Carousel = ({images,duration=3000,style, ...props}:CarouselProps) => {
    const [currentImage,setCurrentImage] = useState(0);
    const ref = useRef<number>(0)

    const onClickArrowButton = (type:'l' | 'r') => {
        window.clearInterval(ref.current)
     
        
        ref.current = window.setInterval(()=>{
            setCurrentImage(prev=>{
           
                return (prev+1) % images.length
            })
        },duration)

        setCurrentImage(prev=>{
                
            return type === 'l' ?  (prev-1+images.length) % images.length : (prev+1) % images.length
        })

    }

    useEffect(()=>{
        ref.current = window.setInterval(()=>{
            setCurrentImage(prev=>{
           
                return (prev+1) % images.length
            })
        },duration)

        return ()=>window.clearInterval(ref.current)
    },[duration, images])

    return (
        <div style={{position:'relative',...style}} {...props}>
            <button style={{position:'absolute', top:'50%', left:0}} onClick={()=>onClickArrowButton('l')}>{'<'}</button>
            <img style={{height:'100%'}}alt={`img-${currentImage}`} src={images[currentImage]}/>
            <button style={{position:'absolute', top:'50%', right:0}} onClick={()=>onClickArrowButton('r')}>{'>'}</button>
        </div>
    )
}

export default Carousel