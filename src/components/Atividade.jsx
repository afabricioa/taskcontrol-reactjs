import React, { useState } from 'react'
import Popup from './Popup'

export default function Atividade(props) {
    const [showModal, setShowModal] = useState(false)
    return (
        <span onClick={() => setShowModal(true)} className="atividade">
            { props.atividade.atividade_nome }
            { showModal && <Popup closePopup={() => setShowModal(false)} id_atividade={props.atividade.atividade_id} id_grupo={props.grupo.grupo_id} show={showModal} flag={2}>Alterar Atividade</Popup> }
        </span>
    )
}
