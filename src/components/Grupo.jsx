import React, { useState, useEffect } from 'react'
import Atividade from './Atividade'
import Axios from 'axios'

export default function Grupo(props) {
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

    return (

        <div>
            <h3> {grupo.grupo_nome }</h3>
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
