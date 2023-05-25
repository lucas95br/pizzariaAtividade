
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}


//Tipando os parametros de entrada do rest para reutolizar esse componente em qualquer input
export function Input({...rest}: InputProps){
    return(
        <input className={styles.input} {...rest}/>
        
    )
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}
//Tipando os parametros de entrada do rest para reutolizar esse componente em qualquer input

export function TextArea({...rest}: TextAreaProps){
    return(
        <textarea className={styles.input}{...rest}></textarea>
    )
}