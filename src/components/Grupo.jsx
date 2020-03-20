import React, { useState, useEffect } from 'react'
import Atividade from './Atividade'
import Axios from 'axios'

export default function Grupo(props) {

    const [alterar, setAlterar] = useState(false)
    const [grupo, setGrupo] = useState({
        id: '',
        grupo_nome: '',
        atividades: []
    })

    useEffect(() => {
        console.log("component mounted")
        Axios.get(`https://taskcontrolapp.herokuapp.com/taskcontrol/grupo/${props.id}`)
            .then(response => {
                setGrupo(response.data)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    function handleAlterar(nome){
        setAlterar(true)
    }

    function handleValor(event){
        if(event.key === 'Enter'){
            setAlterar(false)
            console.log("atividades: ", grupo.atividades)
            const novoGrupo = { grupo_id: grupo.grupo_id, grupo_nome: event.target.value }
            console.log(novoGrupo)

            Axios.put('https://taskcontrolapp.herokuapp.com/taskcontrol/grupo',novoGrupo)
                .then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
        }
    }

    return (

        <div>
            { !alterar && <h3 onClick={() => handleAlterar(grupo.grupo_nome)}>{ grupo.grupo_nome }</h3> }
            { alterar && <input type="text" placeholder="Novo nome" onKeyDown={handleValor}></input> }
            <ul>
                { grupo.atividades.map(atividade => (
                    <li key={atividade.atividade_id}>
                        <Atividade 
                            atividade={atividade}
                        />
                    </li>
                )) }
            </ul>
        </div>
    )
}
