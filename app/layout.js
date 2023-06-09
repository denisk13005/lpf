import './globals.css'
import { Inter } from 'next/font/google'

import styles from './page.module.css'
import Header from '@/components/header/Header'


export const metadata = {
  title: 'la petite friperie',
  description: 'friperie solidaire',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.bodyContainer}>
        <Header/>
        <section className={styles.sectionContainer}>

        {children}
        </section>
        </body>
    </html>
  )
}
