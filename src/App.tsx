import { Header } from './components/Header'
import './global.scss'
import styles from './App.module.scss'
import { PlusCircle } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import {v4 as uuidv4} from 'uuid'

type Task = {
  id: string
  title:string
  isCompleted: boolean
}

export function App() {
  const [newTaskText, setNewTaskText] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])

  function handleNewTodoChange(event: FormEvent<HTMLInputElement>) {
    event.currentTarget.setCustomValidity('')
    setNewTaskText(event.currentTarget.value)
  }

  function handleCreateNewTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setTasks([...tasks, {id: uuidv4(), title: newTaskText, isCompleted: false}])
    setNewTaskText('')
    console.log(tasks)
  }

  function handleNewTodoInvalid(event: FormEvent<HTMLInputElement>) {
    event.currentTarget.setCustomValidity('Esse campo é obrigatório')
  }

  const isNewTaskEmpty = newTaskText.length === 0

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <form onSubmit={handleCreateNewTodo} >
          <input
            value={newTaskText}
            onChange={handleNewTodoChange}
            onInvalid={handleNewTodoInvalid}
            type="text"
            placeholder='Adicione uma nova tarefa'
            required
          />
          <button
            type="submit"
            disabled={isNewTaskEmpty}
          >
            Criar<PlusCircle size={16} weight="bold" />
          </button>
        </form>
      </div>
    </>
  )
}
