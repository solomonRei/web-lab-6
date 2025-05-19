interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function toast(props: ToastProps) {
  console.log(`Toast: ${props.title} - ${props.description}`);
  
  const toastContainer = document.getElementById('toast-container');
  
  if (toastContainer) {
    const toastElement = document.createElement('div');
    toastElement.className = `fixed top-4 right-4 p-4 rounded-md shadow-md transition-all transform z-50 
      ${props.variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-white border'}`;
    
    const titleElement = document.createElement('div');
    titleElement.className = 'font-semibold';
    titleElement.textContent = props.title || '';
    
    const descriptionElement = document.createElement('div');
    descriptionElement.className = 'text-sm';
    descriptionElement.textContent = props.description || '';
    
    toastElement.appendChild(titleElement);
    toastElement.appendChild(descriptionElement);
    toastContainer.appendChild(toastElement);
    
    setTimeout(() => {
      toastElement.classList.add('opacity-0');
      setTimeout(() => toastElement.remove(), 300);
    }, 3000);
  } else {
    alert(`${props.title}: ${props.description}`);
  }
} 