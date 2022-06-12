import styles from './Task.module.scss'
import { Trash } from 'phosphor-react'
import checkImage from '../assets/check.svg'
import unCheckImage from '../assets/unCheck.svg'

type Task = {
  id: string
  title:string
  isCompleted: boolean
}

type TaskProps = {
  task: Task
  onDeleteTask: (id: string) => void
  onUpdateTask: (id: string) => void
}

export function Task({task, onDeleteTask, onUpdateTask}: TaskProps) {

  function handleDeleteTask() {
    onDeleteTask(task.id)
  }

  function handleUpdateTask() {
    onUpdateTask(task.id)
  }

  return (
    <div className={styles.task}>
      {task.isCompleted ? (
        <button className={styles.checked} onClick={handleUpdateTask}>
          <img src={checkImage} alt="tarefa completada" />
        </button>
      ) : (
        <button className={styles.unChecked} onClick={handleUpdateTask}>
          <img src={unCheckImage} alt="tarefa não completada" />
        </button>
      )}
      <span className={ task.isCompleted ? styles.lineThrough : styles.lineNormal } >{task.title}</span>
      <button title="Deletar tarefa" onClick={handleDeleteTask} className={styles.trash}>
        <Trash size={24} />
      </button>
    </div>
  )
}