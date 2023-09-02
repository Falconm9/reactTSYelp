'use client'
import styles from './page.module.css'
import Resturants from '@/containers/restaurants'

export default function Home() {
  return (
    <main className={styles.main}>
      <Resturants />
    </main>
  )
}
