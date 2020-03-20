import React , { useState, useEffect } from 'react'
import Axios from 'axios'
import Grupo from './Grupo'

export default function Board() {

    const [grupo, setGrupo] = useState([])
    
    useEffect(() => {
        Axios.get('https://taskcontrolapp.herokuapp.com/taskcontrol/grupo')
            .then(response => {
                setGrupo(response.data)
            }).catch(error => {
                console.log(error)
            })
    }, [grupo])

    return (
        <div className="board">
            { grupo.map(g => (
                <div key={g.grupo_id}>
                    <Grupo id={g.grupo_id}/>
                </div>
            )) }
        </div>
    )
}
