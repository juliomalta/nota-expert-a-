import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface AddNoteProps {
  handleAddNote: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export default function AddNote({handleAddNote}: AddNoteProps) {
  const [shouldShowWelcome, setShouldShowWelcome] = useState(true)
  const [isRecording, setIsRecording]= useState(false)
  const [content, setContent] = useState('')

  function handleEditor() {
    setShouldShowWelcome(false)
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if (event.target.value === '') {
    setShouldShowWelcome(true)
    }
    // Usando generics para tipar/especificar o evento como HTMLTextAreaElement, pois o ChangeEvent aceita qualquer tipo de evento.
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    if (content === '') {
      toast.error('Você não pode salvar uma nota vazia!')
      return
    }

    handleAddNote(content)

    setContent('')
    setShouldShowWelcome(true)

    toast.success('Nota salva com sucesso!')

  }

  function handleStartRecording() {
    setIsRecording(true)
    setShouldShowWelcome(false)

    const isSpeechRecognitionSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionSupported) {
      toast.error('Seu navegador não suporta gravação de áudio.')
      return
    }

    // const isSupported = window.SpeechRecognition || window.webkitSpeechRecognition
    const speechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new speechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      // console.log(event.results)

      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.log(event.error)
    }

    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)
    speechRecognition?.stop()
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className='flex flex-col bg-slate-700 rounded-md p-5 gap-3 text-left outline-none hover:ring-2 hover:ring-green-600 focus-visible:ring-2 focus-visible:ring-lime-500'>
      <span className='text-sm font- text-slate-200'>Adicionar nota</span>
      <p className='text-sm leading-6 text-slate-400 '>Grave uma nota em áudio para convertê-la para texto automaticamente.</p>
    </Dialog.Trigger>

    <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-slate-800/75' />
        <Dialog.Content className='fixed flex flex-col rounded-md left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-[40rem] w-full h-[60vh] bg-slate-700 outline-none overflow-hidden'>
          <Dialog.Close className='absolute top-0 right-0 p-5 text-slate-400 hover:text-rose-400'>
            <X size={20} />
          </Dialog.Close>
          <form className='flex flex-1 flex-col'>
            <div className='flex flex-1 flex-col gap-3 p-5'>
              <span className='text-lg font-medium text-slate-300'>
                Adicionar nota
              </span>

              {shouldShowWelcome ? (
              <p className='text-sm leading-6 text-slate-400 '>
                Comece <button type='button' onClick={handleStartRecording} className='font-medium text-lime-400 hover:text-lime-500'>gravando uma nota</button> para não esquecer de nada! (ou se preferir, <button type='button' onClick={handleEditor} className='font-medium text-lime-400 hover:text-lime-500'>apenas texto</button>.)
              </p>
              ) : (
                <textarea 
                  onChange={handleContentChange}
                  autoFocus
                  className='h-1/2 bg-transparent text-slate-400 resize-none outline-none' placeholder='Digite sua nota aqui...' 
                  value={content}
                  />
              )}
            </div>

            {isRecording ? (
              <button 
                type='button' 
                onClick={handleStopRecording}
                className='flex items-center justify-center gap-2 text-center text-sm py-4 w-full font-semibold bg-lime-900 text-lime-200 outline-none hover:text-lime-100'>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                  </span>
                  Parar gravação
                  <div className='animate-bounce'>.</div>
                  <div className='animate-bounce'>.</div>
                  <div className='animate-bounce'>.</div>
              </button>

            ): (
              <button 
                type='button' 
                onClick={handleSaveNote} 
                className='text-center text-sm py-4 w-full font-semibold bg-lime-400 text-lime-950 outline-none hover:bg-lime-500'>
                  Salvar nota
              </button>
            ) }
              {/* <button 
                type='submit' 
                className='text-center text-sm py-4 w-full font-semibold bg-lime-400 text-lime-950 outline-none hover:bg-lime-500'>
                  Salvar nota
              </button> */}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
  </Dialog.Root>
  )
}