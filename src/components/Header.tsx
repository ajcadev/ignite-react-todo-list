import styles from './Header.module.scss'
import logoImage from '../assets/logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logoImage} alt="logotipo" />
      <h1>to<span>do</span></h1>
    </header>
  )
}