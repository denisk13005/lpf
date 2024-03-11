import Header from '@/components/header/Header';
import UserContextProvider from 'context/UserContextProvider';
import './globals.scss';
import styles from './page.module.scss';



export const metadata = {
  manifest: '/manifest.json',
  title: 'Frip Boutique Ambulante',
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

      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2120864365107584"
          crossorigin="anonymous"></script>
      </head>
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
