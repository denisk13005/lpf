import './globals.scss';
import UserContextProvider from 'context/UserContextProvider';
import styles from './page.module.scss';
import Header from '@/components/header/Header';



export const metadata = {
  title: 'la petite friperie',
  description: 'friperie solidaire',
};

/**
 * Root component for the application layout.
 * This component wraps the provided content as "children" in a basic HTML structure.
 *
 * @component
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child elements to be displayed in the layout.
 * @returns {JSX.Element} The root layout component.
 */
export default function RootLayout({ children }) {

  return (
    <html lang='fr'>
      <body className={styles.bodyContainer}>

        <UserContextProvider>
          <div className={styles.background}>


            <Header />
            <section className={styles.sectionContainer}>{children}</section>
          </div>
        </UserContextProvider>
      </body>
    </html>
  );
}
