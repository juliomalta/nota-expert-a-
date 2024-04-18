# Projeto de estudo prático do tailwind: site de notas, com uso de transformação de áudio pra texto
O projeto trabalha os principais pontos do react: componente, propriedade e estado.

## Estrutura de criação do site:
Primeiro: criei a interface toda no app.tsx, configurei o index.css para uso do tailwind; importei a logo para o cabeçalho e também pro favico, estilizei um form para e criei dois cards, o de adicionar nota, e o das notas em si. O segundo, transformei em um button, já que executará funções através do modal.
Trabalhei a parte das propriedades dos cards, criando a interface seguida do uso dos props em cada situação.
Lembrando que o conteúdo individual será passado dentro do app, quando chama o componente.

Segundo: Criação do modal. instalei o radix dialog (npm install @radix-ui/react-dialog) e dentro do radix, tem as informações de uso do dialog. Isso é, colocar um Root envolvendo tudo do retorno da função card. Nesse caso importei * as Dialog, e envolvi com <Dialog.Root>. 
Uma vez com o radix-dialog, posso trocar o <button> pelo <Dialog.Trigger>. Esse trigger é o que fará abrir o modal, então tenho que colocar no elemento que irá abri-lo.
<Dialog.Portal> para abrir o conteúdo na tela toda, e não na ordem de aparição, e dentro, o <Dialog.Content>, que será o conteúdo do modal.
Pra centralizar o modal, tem o esquema de colocar -translate-x-1/2 e -translate-y-1/2.
isntalar e importar do date-fns formatDistanceToNow e ptBR do date-fns/locale.
criei o button com um span, e colocando na cn do button group, para dentro do span, conseguir utilizar o group-hover:underline.
instalar o lucide-react (pacote de item), importar o X e colocar dentro do Dialog.Close.
Finalizar agora o form: envolvi toda a div abaixo do close até embaixo do botão (ou seja, o modal em si) em um <form>, criei as funções *handleSaveNote, handleContentChanged e handleEditor*, e duas constantes, const [shouldShowWelcome, setShouldShowWelcome] = useState(true) e const [content, setContent] = useState('').
A *handleEditor*, faz o uso do setShouldShowWelcome(false): transforma o estado que era verdadeiro pra falso. É usado para habilitar o editor de texto do form, após clicarem no botão uso de voz ou uso de texto.
A *handleContentChange* eu recebo as informações/mudanças de estado do form. Com o typescript, precisamos tipar essa informação recebida e usar generics para especificar de onde ela vem: f handleContentChange(event:ChangeEvent<HTMLTextAreaElement>). Dentro fiz um condicional de se apagarem tudo de uma nota, seta o setShouldShowWelcome de volta pra true, retornando pra tela inicial, e passo o conteúdo pelo setContent(event.target.value)
O handleSaveNote recebe como parâmetro event:FormEvent. Lembrar de colocar event.preventDefault() para não recarregar a página ao clicar no botão submit, e salva o conteúdo digitado.
Instalei o sonner para controlar os toaster, importo e coloco abaixo do App em main.tsx

Terceiro: Preciso receber as informações das notas salvas, e dentro do app, pra fazer a alteração de estado, criei a const [notes, setNotes] = useState([]), ou seja, um array com as notas, contendo id, date e content cada. E chamo as notas com um map que percorre esse array e retorna um <Card> com os dados todos (e uma key, obrigatória em mapping).
Agora preciso acessar esse setNotes dentro do add-note, ou seja, salvar a nota em si criada.
Pra isso, criei uma função handleAddNote que recebe (content: string), e dentro possui uma const newNote, com suas propriedades, no final apenas content (que virá do add-note) e um setNotes([newNote, ...notes]) que adiciona a nota seguida das outras já possuídas. Após isso, designo a função como algo a ser recebido do <AddNote> através de handleAddNote={handleAddNote}
Dentro do add-note, por ter colocado que ele tem que passar essas informações, criei uma interface dele, que passe handleAddNote: (content: string) => void;
Dentro da função principal, coloquei a tipagem {handleAddNote}: AddNoteProps e dentro da função handleSaveNote, chamei a função que recebe o conteúdo, handleAddNote(content), que agora será renderizado no app, terminando assim a integração do add note (uma forma de comunicação básica entre componente pai e filho ou filho e pai).
Dentro do App, eu passei a tipagem do useState através de generics, <Note[]>, de uma interface Note que criei para especificar.

Quarto:

Refinações: 
1.Voltar estado: dentro do add-note, em handleSaveNote, reseto o conteúdo quando clicarem no botão, e volto para o estado true, para escolherem qual forma da nota. Pra isso preciso colocar no <textarea> value = {content}, que faz com que o textarea não só atualize o estado mas também seja atualizado.

2. Salvar na localstorage: Colocar dentro do app, dentro do handleAddNote, um localStorage.setItem('notes', JSON.stringify( o array de notas ))
2.1 Acessar essa localstorage e devolver para o aplicativo o conteúdo: no useState dentro do App, passei o generics que recebe um array de nota, mas declarei que ele começa com um array vazio em: ([]) ; Pra acessar e recuperar essas notas da storage, preciso substituir esse array vazio por uma a.func, que tem dentro uma constante, que armazena as notas de dentro do localStorage, através de um localStorage.getItem, e dentro uma condicional, se tiver nota, return JSON.parse(localNotes). O parse é o caminho inverso do stringify. Se não tiver, retorna um array vazio

3. Implementar o search: como quero observar uma informação, através de um input do usuário, preciso utilizar então um estado, [search, setSearch] que vem de uma string vazia.
Passo um onChange no input do form, que recebe a função handleSearch.
*** Lembrando apenas que, quando uma função recebe um evento, precisa de tipagem, então eu vejo na descrição da propriedade que quero passar a função (neste caso onChange), o que vem antes do Handler, neste caso, ChangeEvent. E o ChangeEvent em si, precisa do generics especificando o que vai vir.
Dentro do handleSearch, atualizo o valor da search pelo conteúdo do usuário: setSearch(event.target.value)
Em seguida, uma constante pra armazenar as notas pesquisadas/filtradas, junto da condicional: se tiver conteúdo na searchbar, devolver o valor procurado, se não, todas as notas.
*** Lembrar de atualizar então o map feito dentro da função principal para o filteredNotes, já que criamos a condicional.