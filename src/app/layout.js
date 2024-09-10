import "./globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { QCProvider } from "../providers/QCProvider";
import { CustomEventsProvider } from "../providers/CustomEventsProvider";
import { ToastContainer } from "react-toastify";
export const metadata = {
  title: "Sync",
  description: "Get synced with you friends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QCProvider>
          <CustomEventsProvider>{children}</CustomEventsProvider>
        </QCProvider>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
