
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { LanguageProvider } from './LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}
