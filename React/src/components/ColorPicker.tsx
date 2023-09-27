import React from "react";
import {Color, ColorChangeHandler, SketchPicker} from "react-color";

type props = {
    color: Color
    setColor: (color: string)=>void
}
export const ColorPicker: React.FC<props> = (props) =>{

    const onChange: ColorChangeHandler = (event) =>{
        console.log(event)
        props.setColor(event.hex)
    }

    return (<>
        <SketchPicker
            onChange={onChange}
            color={props.color}
        />
    </>)
}