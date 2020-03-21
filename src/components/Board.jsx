import React , { useState, useEffect, useReducer } from 'react'
import Axios from 'axios'
import Grupo from './Grupo'


const initialGrupoState = {
    loading: true,
    error: '',
    grupo: []
}

const reducerGrupo = (state, action) => {
    switch(action.type){
        case 'FETCH_GRUPO_SUCCESS': 
            return {
                loading: false,
                grupo: action.payload,
                error: ''
            }
        case 'FETCH_GRUPO_ERROR':
            return {
                loading: false,
                grupo: [],
                error: 'Something went wrong!'
            }

        default: 
            return state
    }
}

export default function Board() {
    const [state, dispatch] = useReducer(reducerGrupo, initialGrupoState)

    const [atividade, setAtividade] = useState()

    useEffect(() => {
        const fetchData = async () => {
            await Axios.get('https://taskcontrolapp.herokuapp.com/taskcontrol/grupo')
                .then(response => {
                    dispatch({type: 'FETCH_GRUPO_SUCCESS', payload: response.data})
                })
                .catch(error => {
                    dispatch({type: 'FETCH_GRUPO_ERROR'})
                })
        }

        fetchData()
    }, [state.grupo])

    function onDragOver(e){
        e.preventDefault()
    }
    
    function putData(atv, id){
        Axios.put('https://taskcontrolapp.herokuapp.com/taskcontrol/atividade',
            {   
                atividade_id: atv.atividade_id,
                atividade_nome: atv.atividade_nome,
                grupo: {
                    grupo_id: id
                }
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
    }
    const onDrop = (event, id) => {
        const card_id = event.dataTransfer.getData("id")
        
        const card = document.getElementById(card_id)

        card.style.display = 'block'


        const fetchData = async () => {
            Axios.get(`https://taskcontrolapp.herokuapp.com/taskcontrol/atividade/${card_id}`)
                .then(response => {
                    putData(response.data, id)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        fetchData()

        event.target.appendChild(card)

    }

    return (
        <div className="board">
            {state.loading ? (
                <div>...loading</div>
            ) : (
                state.grupo.map(g => (
                    <div key={g.grupo_id} onDrop={(e) => onDrop(e, g.grupo_id)} onDragOver={(e) => onDragOver(e)}>
                        <Grupo 
                            id={g.grupo_id}
                            enviaAtividade={(atividade) => setAtividade(atividade)}
                        />
                    </div>
                ))
            )}
            
        </div>
    )
}
