import React , { useState, useEffect } from 'react'
import Axios from 'axios'
import Grupo from './Grupo'

export default function Board() {

    const [grupo, setGrupo] = useState([])
    const [atividade, setAtividade] = useState(null)
    const [drop, setDrop] = useState(false)
    
    useEffect(() => {
        Axios.get('https://taskcontrolapp.herokuapp.com/taskcontrol/grupo')
            .then(response => {
                setGrupo(response.data)
            }).catch(error => {
                console.log(error)
            })
    }, [grupo])

    function onDragOver(e){
        e.preventDefault()
    }
    
    function onDrop(id){
        console.log("grupo id: ", id)
        console.log("atividade que veio ", atividade)

        Axios.put('https://taskcontrolapp.herokuapp.com/taskcontrol/atividade',
            {   
                atividade_id: atividade.atividade_id,
                atividade_nome: atividade.atividade_nome,
                grupo: {
                    grupo_id: id
                }
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })

    }

    return (
        <div className="board">
            { grupo.map(g => (
                <div key={g.grupo_id} onDrop={() => onDrop(g.grupo_id)} onDragOver={(e) => onDragOver(e)}>
                    <Grupo 
                        id={g.grupo_id}
                        enviaAtividade={(atividade) => setAtividade(atividade)}
                    />
                </div>
            )) }
        </div>
    )
}
