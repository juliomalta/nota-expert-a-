import { ChangeEvent, useState } from 'react';
import logo from './assets/logo1.jpg';
import AddNote from './components/add-note';
import { Card } from './components/card';

interface Note {
  id: string
  date: Date
  content: string

}

export default function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const localNotes = localStorage.getItem('notes')

    if (localNotes) {
      return JSON.parse(localNotes)
    }

    return []
  })

  function handleAddNote(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]
    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
    // const newNote = {
    //   id: notes.length + 1,
    //   date: new Date(),
    //   content: 'Nova nota'
    // }
    // setNotes([...notes, newNote])
  }
  
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value
    setSearch(query)
  }

  const filteredNotes = search !== '' 
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes

    // Lembrar de tratar a string para lowercase, para que a busca não seja case sensitive.

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'> 
    {/* o space-y-6 é um espaçamento entre todos os elementos do eixo y de dentro da div. */}
      <img src={logo} alt='Logo' height={80} width={80}/>
      <form className='w-full '>
        <input 
          type="text" 
          placeholder="Busque em suas notas" 
          className='w-full bg-transparent text-3xl outline-none font-semibold tracking-tight placeholder:text-slate-500' 
          onChange={handleSearch}
        />
      </form>

      <div className='h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent' /> 
      {/* uma linha horizontal de 1px de altura. */}

      <div className='grid grid-cols-3 gap-6 auto-rows-[16rem]'> 
      {/* grid com 3 colunas e altura de 250px. */}
        <AddNote handleAddNote={handleAddNote} />
        {filteredNotes.map(note => {
          return <Card key={note.id} id={note.id} date={note.date} content={note.content} />
        })}
        
      </div>
    </div>
  )
}