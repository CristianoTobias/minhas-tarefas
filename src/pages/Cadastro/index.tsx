import BarraLateral from '../../containers/BarraTarefas'
import Formulario from '../../containers/Formulario'

const Cadastro = () => (
  <>
    {/* barra lateral */}
    <BarraLateral mostrarFiltros={false} />
    <Formulario />
  </>
)

export default Cadastro
