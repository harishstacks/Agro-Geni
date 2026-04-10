import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Header } from "../components/header";
import { AlertTriangle, Home } from "lucide-react";

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  // Default to English if hook fails or before provider mounts (should be fine here)
  const lang = "en"; 

  let title = "Oops! Something went wrong.";
  let message = "An unexpected error has occurred.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "404 - Page Not Found";
      message = "The page you are looking for doesn't exist or has been moved.";
    } else {
      title = `${error.status} - ${error.statusText}`;
      message = error.data?.message || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-lg border border-border max-w-lg w-full flex flex-col items-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">{title}</h1>
          <p className="text-muted-foreground text-lg mb-8">{message}</p>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
