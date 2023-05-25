
import { createContext , ReactNode, useState,useEffect} from "react";
// IMPORT DE CRIAÇÃO DE CONTEXTO
//IMPORT PARA CRIAÇÃO DE TIPAGEM NO REACT

import {destroyCookie,setCookie,parseCookies} from 'nookies'
import Router from "next/router";
import { api } from "../services/apiClient"
import {toast} from 'react-toastify'


//CRIANDO A TIPAGEM PARA PASSAR PRO createContext SEGUIR  COMO PADRÃO DE CRIAÇÃO DESSE OBJETO
type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    //FUNÇÃO DE LOGIN QUE CHAMA O TYPE SIGNINPROPS ABAIXO
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}


//ATRIBUTOS E  FUNÇÕES QUE O USERPROPS IRÁ RECEBER
// E DEPOIS PASSADO COMO ATRIBUTO PARA O AUTHCONTEXTDATA
//PARAINICIAR O CONTEXTO
type UserProps = {
    id: string;
    name: string;
    email: string;
    
}


//ATRIBUTOS E  FUNÇÕES QUE O  SIGNINPROPS IRÁ RECEBER
// E DEPOIS PASSADO COMO ATRIBUTO PARA O AUTHCONTEXTDATA
//PARA SER CHAMADA NA FUNÇÃO DE LOGIN E DEPOIS PASSADO COMO PARAMETRO PARA AUTHCONTEXTDATA
type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps ={
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

//CRIANDO O CONTEXTO, QUE IRÁ OBEDECER A TIPAGEM CRIADA AUTHCONTEXTDATA
export const AuthContext = createContext({} as AuthContextData)

//FUNÇÃO PARA DESLOGAR USUARIOS
export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    }catch{
        console.log('erro ao deslogar')
    }
}


//FUNÇÃO QUE IRÁ PROVER AS INFORMAÇÕES DE LOGIN, CADASTRO
export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(()=>{
        
        //tentar pegar algo no cookie
        const {'@nextauth.token': token} = parseCookies();
        if(token){
            api.get('/me').then(response =>{
                const{id, name, email} = response.data;
                
                setUser({
                    id,
                    name,
                    email
                })
            })
            .catch(() =>{

                //Se deu erro deslogar usuario
                signOut();
            })
        }
    
    },[])

    async  function signIn({email,password}: SignInProps){
       try {
            const response = await api.post('/session',{
                email,
                password
            })
            //console.log(response.data)
            const {id, name, token}  = response.data
            
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 *24 *30, // EXPIRAR EM UM MES
                path: "/" //QUAIS CAMINHOS TERÃO ACESSO AO TOKEN
            })

            setUser({
                id,
                name,
                email,
            })

            //PASSAR PARA AS PROXIMAS REQUISIÇÕES O NOSSO TOKEN
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Bem vindo!')

            //REDIRECIONAR O USUARIO PARA DASHBOARD
            Router.push('/dashboard')

       }catch(err){
        toast.error("Erro ao acessar, usuario ou senha inválidos")
        console.log("Erro ao Acessar", err)

       }
    }

    async function signUp({name,email, password}: SignUpProps){
        try{
            const response = await api.post('/users',{
                name,
                email,
                password
            })
        
        toast.success("Conta criada com sucesso!")
        console.log("Cadastrado com sucesso")
        Router.push('/')

        }catch(err){
            toast.error("Erro ao cadastrar")
            console.log("Erro ao cadastrar ", err)
        }
    }

    return(
        <AuthContext.Provider value = {{user, isAuthenticated,signIn,signOut,signUp}}>
            {children}
        </AuthContext.Provider>
    )

}

