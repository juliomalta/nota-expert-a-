import * as Dialog from '@radix-ui/react-dialog'
import {formatDistanceToNow} from 'date-fns'
import {ptBR} from 'date-fns/locale'
import { X } from 'lucide-react'

interface CardProps {
  content: string
  date: Date
}
// Quais são as informações que serão diferentes de uma nota para a outra? O conteúdo e a data.

export function Card(props: CardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className='flex flex-col text-left outline-none bg-slate-800 overflow-hidden rounded-md p-5 gap-3 relative hover:ring-2 hover:ring-green-600 focus-visible:ring-2 focus-visible:ring-lime-500'>
        {/* o hover:ring-2 adiciona um anel de 2px ao redor do elemento quando o mouse passa por cima, sem que a borda ocupe espaço e mova as divs ao redor. */}
        {/* para que o conteúdo do button fique alinhado a esquerda e no topo, tem que colocar o flex-col e o text-left. Lembrando que o space-y-valor funciona apenas para quando o display é grid. Tem que usar então o gap-valor. */}
        <span className='text-sm font-medium text-slate-300'>{props.date.toISOString()}</span>
        <p className='text-sm leading-6 text-slate-400 '>{props.content}</p>
        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none' /> 
        {/* // um degradê de preto para transparente no eixo y. */}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-slate-800/75' />
        <Dialog.Content className='fixed flex flex-col rounded-md left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-[40rem] w-full h-[60vh] bg-slate-700 outline-none overflow-hidden'>
          <Dialog.Close className='absolute top-0 right-0 p-5 text-slate-400 hover:text-rose-400'>
            <X size={20} />
          </Dialog.Close>
          <div className='flex flex-1 flex-col gap-3 p-5'>
            <span className='text-sm font-medium text-slate-300'>
              {formatDistanceToNow(props.date, { locale: ptBR, addSuffix: true})}</span>
            <p className='text-sm leading-6 text-slate-400 '>
              {props.content}</p>
          </div>
            <button 
              type='button' 
              className='text-center text-sm py-4 w-full font-semibold bg-slate-800 text-slate-300 outline-none group'>
                Deseja <span className='text-rose-400 group-hover:underline'>apagar permanentemente</span>?</button>
        </Dialog.Content>
      </Dialog.Portal>

    </Dialog.Root>
  )
}