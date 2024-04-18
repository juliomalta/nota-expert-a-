import logo from './assets/logo1.jpg';
import AddNote from './components/add-note';
import { Card } from './components/card';

export default function App() {
  
  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'> 
    {/* o space-y-6 é um espaçamento entre todos os elementos do eixo y de dentro da div. */}
      <img src={logo} alt='Logo' height={80} width={80}/>
      <form className='w-full '>
        <input type="text" placeholder="Busque em suas notas" className='w-full bg-transparent text-3xl outline-none font-semibold tracking-tight placeholder:text-slate-500' />
      </form>

      <div className='h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent' /> 
      {/* uma linha horizontal de 1px de altura. */}

      <div className='grid grid-cols-3 gap-6 auto-rows-[16rem]'> 
      {/* grid com 3 colunas e altura de 250px. */}
        <AddNote />
        <Card date={new Date()} content='teste'/>
        <Card date={new Date()} content='teste'/>
        <Card date={new Date()} content='teste'/>
        
      </div>
    </div>
  )
}