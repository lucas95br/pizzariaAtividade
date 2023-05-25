
import { ReactNode,ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading?: boolean, //propiedade opcional
    children: ReactNode, // oque tem dentro do componente no caso nome dentro do botão
}


export function Button({loading,children,...rest}: ButtonProps){
    return(
        <button className={styles.button}
        disabled = {loading}
        {...rest}
        >
        <a className =  {styles.buttonText}>{children}</a>

        </button>
    )
}