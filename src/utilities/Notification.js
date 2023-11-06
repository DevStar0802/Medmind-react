import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (type, txt) => {
  switch (type) {
    case "info":
      toast.info(txt);
      break;
    case "success":
      toast.success(txt);
      break;
    case "warning":
      toast.warn(txt);
      break;
    case "error":
      toast.error(txt);
      break;
    default:
      toast(txt);
      break;
  }
};

const Notification = () => {
  return <ToastContainer autoClose={5000} closeOnClick />;
};

export default Notification;
