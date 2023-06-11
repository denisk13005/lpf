import './globals.css';
import UserContextProvider from 'context/UserContextProvider';
import styles from './page.module.css';
import Header from '@/components/header/Header';

export const metadata = {
  title: 'la petite friperie',
  description: 'friperie solidaire',
};

export default function RootLayout({ children }) {
  return (
    <html lang='fr'>
      <body className={styles.bodyContainer}>
        <UserContextProvider>
          <Header />
          <section className={styles.sectionContainer}>{children}</section>
        </UserContextProvider>
      </body>
    </html>
  );
}
