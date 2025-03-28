import { toast } from 'react-toastify';


const defaultOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false
};

const ToastService = {
  success: (message, options = {}) => {
    toast.success(message, { ...defaultOptions, ...options });
  },
  
  error: (message, options = {}) => {
    toast.error(message, { ...defaultOptions, ...options });
  },
  
  info: (message, options = {}) => {
    toast.info(message, { ...defaultOptions, ...options });
  },
  
  warning: (message, options = {}) => {
    toast.warning(message, { ...defaultOptions, ...options });
  }
};

export default ToastService;