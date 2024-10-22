import React from "react";
import {Tooltip} from "antd";
import css from './index.module.css'
import {cn} from "@/lib/utils";
import {rgba} from "@react-spring/shared";


interface TextWithDescProps {
    text: string;
    desc?: string;
    type?: 'h2' | 'h3' | 'text'
}


export default function TextWithDesc({
    text,
    type = 'text',
    desc = ''
                                     } : TextWithDescProps) {
    return (
        <Tooltip color={'rgba(0,0,0,0.4)'} placement={'right'} title={desc}>
        <span className={cn(desc ? css.dot : '')}>{text}</span>
        </Tooltip>
    )
}