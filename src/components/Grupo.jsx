import React, { useState, useEffect, useReducer } from 'react'
import Atividade from './Atividade'
import Axios from 'axios'
import Popup from './Popup'

const initialState = {
    error: '',
    flag: 0,
    grupo: {
        grupo_id: null,
        grupo_nome: '',
        atividades: []
    }
}

const reducer = (state, action) => {
    switch(action.type){
        case 'FETCH_SUCCESS': 
            return {
                grupo: action.payload,
                error: ''
            }
        case 'FETCH_ERROR':
            return {
                grupo: [],
                error: 'Something went wrong!'
            }

        default: 
            return state
    }
}

export default function Grupo(props) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const [alterar, setAlterar] = useState(false)

    const [showModal, setShowModal] = useState(false)

    function handleAlterar(nome){
        setAlterar(true)
    }
    useEffect(() => {
        const fetchData = () => {
            Axios.get(`https://taskcontrolapp.herokuapp.com/taskcontrol/grupo/${props.id}`)
                .then(response => {
                    dispatch({type: 'FETCH_SUCCESS', payload: response.data})
                })
                .catch(error => {
                    dispatch({type: 'FETCH_ERROR'})
                })
        }
        fetchData()
    }, [state.flag])


    function handleValor(event){
        if(event.key === 'Enter'){
            state.flag = state.flag + 1
            setAlterar(false)
            const novoGrupo = { grupo_id: state.grupo.grupo_id, grupo_nome: event.target.value }

            const putData = () => {
                Axios.put('https://taskcontrolapp.herokuapp.com/taskcontrol/grupo',novoGrupo)
            }
            
            putData()
        }
    }

    const onDragStart = e =>{
        const target = e.target
        e.dataTransfer.setData("id", target.id)

        setTimeout(() => {
            target.style.display = 'none'
        }, 0)
        
    }

    return (
        <div className="grupo">
            <div className="titulo">{ !alterar && <h3 onClick={() => handleAlterar(state.grupo.grupo_nome)}>{ state.grupo.grupo_nome }</h3> }</div>
            { alterar && <input type="text" placeholder="Novo nome" onKeyDown={handleValor}></input> }
            { state.grupo.atividades.map(atividade => (
            <div className="atividade" key={atividade.atividade_id} id={atividade.atividade_id} draggable onDragStart={(e) => onDragStart(e)}>
                <Atividade 
                    atividade={atividade}
                    grupo={state.grupo}
                />
            </div>
            )) }
            <button className="newCard" onClick={() => setShowModal(true)}> Novo Card + </button>
            { showModal && <Popup closePopup={() => setShowModal(false)} id={state.grupo.grupo_id} show={showModal} flag={1}>Cadastrar Nova Atividade</Popup> }
        </div>
    )
}
