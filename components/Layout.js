// components/Layout.js
import Navbar from './Navbar';

export default function Layout({ children, user, logout }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <Navbar user={user} logout={logout} />
      <main className="container mx-auto py-4 px-2">
        {children}
      </main>
      <footer className="bg-white dark:bg-gray-800 dark:text-white p-4 text-center border-t dark:border-gray-700">
        <p>© {new Date().getFullYear()} 간단한 SNS</p>
      </footer>
    </div>
  );
}