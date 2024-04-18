import { useState } from 'react';
import logo from './assets/logo1.jpg';
import AddNote from './components/add-note';
import { Card } from './components/card';

interface Note {
  id: string
  date: Date
  content: string

}

export default function App() {
  const [notes, setNotes] = useState<Note[]>([])

  function handleAddNote(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }
    setNotes([newNote, ...notes])
    // const newNote = {
    //   id: notes.length + 1,
    //   date: new Date(),
    //   content: 'Nova nota'
    // }
    // setNotes([...notes, newNote])
  }
  
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
        <AddNote handleAddNote={handleAddNote} />
        {notes.map(note => {
          return <Card key={note.id} id={note.id} date={note.date} content={note.content} />
        })}
        
      </div>
    </div>
  )
}