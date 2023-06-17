import { useState, useEffect, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import { remover, editar, alteraStatus } from '../../store/reducers/tarefas'
import * as S from './styles'

import TarefaClass from '../../models/Tarefa'
import { Botao, BotaoSalvar } from '../../styles'
import * as enums from '../../utils/enums/tarefa'

type Props = TarefaClass

const Tarefa = ({
  titulo,
  prioridade,
  status,
  descricao: decricaoOriginal,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (decricaoOriginal.length > 0) {
      setDescricao(decricaoOriginal)
    }
  }, [decricaoOriginal])
  function cancelarDescricao() {
    setEstaEditando(false)
    setDescricao(decricaoOriginal)
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    console.log(evento.target.checked)
    dispatch(
      alteraStatus({
        id,
        finalizado: evento.target.checked
      })
    )
  }

  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          checked={status === enums.Status.CONCLUIDO}
          onChange={alteraStatusTarefa}
        />
        <S.Titulo>
          {estaEditando && <em>Editando: </em>}

          {titulo}
        </S.Titulo>
      </label>

      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      <S.Descricao
        disabled={!estaEditando}
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
      />
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    descricao,
                    id,
                    prioridade,
                    status,
                    titulo
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>
            <S.BotaoCancelarRemover
              onClick={() => {
                cancelarDescricao()
              }}
            >
              Cancelar
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <S.BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Tarefa
