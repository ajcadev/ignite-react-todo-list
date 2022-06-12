import { Header } from './components/Header'
import './global.scss'
import styles from './App.module.scss'
import { PlusCircle } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import clipboardImage from '../src/assets/clipboard.svg'
import { Task } from './components/Task'

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

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setTasks([...tasks, {id: uuidv4(), title: newTaskText, isCompleted: false}])
    setNewTaskText('')
  }

  function handleNewTodoInvalid(event: FormEvent<HTMLInputElement>) {
    event.currentTarget.setCustomValidity('Esse campo é obrigatório')
  }

  function handleDeleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => task.id !== id)
    setTasks(tasksWithoutDeletedOne)
  }

  function handleUpdateTask(id: string) {
    const tasksUpdated = tasks.map(task => {
      if(task.id === id) {
        return {...task, isCompleted: !task.isCompleted}
      }
      return task
    })
    setTasks(tasksUpdated)
  }

  function countIsCompleted() {
    return tasks.reduce((acc, current) => Number(current.isCompleted) + acc, 0)
  }

  const isNewTaskEmpty = newTaskText.length === 0
  const numberOfTasks = tasks.length
  const numberOfTasksCompleted = countIsCompleted()

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
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
        <div className={styles.tasksInfo}>
          <div className={styles.tasksCreated}>
            <p>Tarefas criadas</p>
            <span>{numberOfTasks}</span>
          </div>
          <div className={styles.tasksCompleted}>
            <p>Concluidas</p>
            <span>{ numberOfTasks ? `${ numberOfTasksCompleted } de ${ numberOfTasks }` : '0' }</span>
          </div>
        </div>
        {numberOfTasks ?
          (<div>
            {tasks.map(task => {
              return(
                <Task
                  key={task.id}
                  task={task}
                  onDeleteTask={handleDeleteTask}
                  onUpdateTask={handleUpdateTask}
                />
              )
            })}
          </div>) :
          (<div className={styles.noTasks}>
            <img src={clipboardImage} alt="imagem de um clipboard" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>)
        }
      </div>
    </>
  )
}
