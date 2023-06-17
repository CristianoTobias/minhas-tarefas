import BotaoAdicionar from '../../components/BotaoAdicionar'
import BarraLateral from '../../containers/BarraTarefas'
import ListaDeTarefas from '../../containers/ListaDeTarefas'

const Home = () => (
  <>
    <BarraLateral mostrarFiltros />
    <ListaDeTarefas />
    <BotaoAdicionar />
  </>
)

export default Home
