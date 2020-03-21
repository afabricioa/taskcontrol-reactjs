import React, { useState, useEffect } from 'react'
import Atividade from './Atividade'
import Axios from 'axios'
import Popup from './Popup'

export default function Grupo(props) {

    const [flag, setFlag] = useState(0)
    const [alterar, setAlterar] = useState(false)
    const [grupo, setGrupo] = useState({
        id: '',
        grupo_nome: '',
        atividades: []
    })

    const [showModal, setShowModal] = useState(false)

    function handleAlterar(nome){
        setAlterar(true)
    }
    useEffect(() => {
        console.log("component mounted")
        Axios.get(`https://taskcontrolapp.herokuapp.com/taskcontrol/grupo/${props.id}`)
            .then(response => {
                setGrupo(response.data)
            }).catch(error => {
                console.log(error)
            })
    }, [flag])

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
        <div className="grupo">
            { !alterar && <h3 onClick={() => handleAlterar(grupo.grupo_nome)}>{ grupo.grupo_nome }</h3> }
            { alterar && <input type="text" placeholder="Novo nome" onKeyDown={handleValor}></input> }
            { grupo.atividades.map(atividade => (
            <div className="atividade" key={atividade.atividade_id} draggable onDragStart={ ()=> props.enviaAtividade(atividade) }>
                <Atividade 
                    atividade={atividade}
                    grupo={grupo}
                />
            </div>
            )) }
            <button className="newCard" onClick={() => setShowModal(true)}> Novo Card + </button>
            { showModal && <Popup closePopup={() => setShowModal(false)} id={grupo.grupo_id} show={showModal} flag={1}>Cadastrar Nova Atividade</Popup> }
        </div>
    )
}
