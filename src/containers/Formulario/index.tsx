import { FormEvent, useState } from 'react'
import { MainContainer, Titulo, Campo, BotaoSalvar } from '../../styles'
import { Form, Opcoes, Opcao } from './styles'
import { useDispatch } from 'react-redux'
import * as enums from '../../utils/enums/tarefa'
import { cadastrar } from '../../store/reducers/tarefas'
import { useNavigate } from 'react-router-dom'

const Formulario = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.NORMAL)

  const cadastrarTarefa = (evento: FormEvent) => {
    evento.preventDefault()
    dispatch(
      cadastrar({
        titulo,
        prioridade,
        status: enums.Status.PENDENTE,
        descricao
      })
    )
    navigate('/')
  }

  return (
    <MainContainer>
      <Titulo>Nova tarefa</Titulo>
      <Form onSubmit={cadastrarTarefa}>
        <Campo
          value={titulo}
          type="text"
          placeholder="Titulo"
          onChange={({ target }) => setTitulo(target.value)}
        />
        <Campo
          value={descricao}
          as="textarea"
          placeholder="Descrição da tarefa"
          onChange={({ target }) => setDescricao(target.value)}
        />
        <Opcoes>
          <p>Prioridade</p>
          {Object.values(enums.Prioridade).map((prioridade) => (
            <Opcao key={prioridade}>
              <input
                value={prioridade}
                name="prioridade"
                type="radio"
                id={prioridade}
                defaultChecked={prioridade === enums.Prioridade.NORMAL}
                onChange={({ target }) =>
                  setPrioridade(target.value as enums.Prioridade)
                }
              />{' '}
              <label htmlFor={prioridade}>{prioridade}</label>
            </Opcao>
          ))}
        </Opcoes>
        <BotaoSalvar type="submit">Cadastrar</BotaoSalvar>
      </Form>
    </MainContainer>
  )
}

export default Formulario
