import React, { useState } from 'react'
import Axios from 'axios'
function NovoGrupo() {

    const [flagGrupo, setFlagGrupo] = useState(false)

    function handleInputGrupo(){
        setFlagGrupo(true)
    }

    function handleNovoGrupo(event){
        if(event.key === 'Enter'){
            console.log(event.target.value)
            setFlagGrupo(false)
            Axios.post('https://taskcontrolapp.herokuapp.com/taskcontrol/grupo', { grupo_nome: event.target.value })
                .then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
        }
    }

    return (
        <div>
            { !flagGrupo && <button onClick={handleInputGrupo}>Novo Grupo</button> }
            { flagGrupo && <input type="text" placeholder="Digite o nome do grupo" onKeyDown={handleNovoGrupo}/>}
        </div>
    )
}

export default NovoGrupo
