import React from 'react'
import { useState } from 'react'
import Axios from 'axios'

function Popup(props) {
    
    const [atividade, setAtividade] = useState('')

    function handleAtividadeName(event){
        setAtividade(event.target.value)
    }

    function onSubmitHandler(e){
        console.log("id ", props.id)
        console.log("atividade: ", atividade)
        if(props.flag === 1){
            Axios.post('https://taskcontrolapp.herokuapp.com/taskcontrol/atividade',
                {
                    atividade_nome: atividade,
                    grupo: {
                        grupo_id: props.id
                    }
                }).then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
        }else if(props.flag === 2){
            Axios.put('https://taskcontrolapp.herokuapp.com/taskcontrol/atividade',
                {   
                    atividade_id: props.id_atividade,
                    atividade_nome: atividade,
                    grupo: {
                        grupo_id: props.id_grupo
                    }
                }).then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
        }
        
    }

    return (
        <div className="modal">
            <div>
                <h4>{props.children}</h4>
                <form onSubmit={onSubmitHandler}>
                    <input type="text" onChange={handleAtividadeName}></input>
                    <button type="submit">Salvar</button>
                    <button onClick={props.closePopup}>
                        Fechar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Popup
