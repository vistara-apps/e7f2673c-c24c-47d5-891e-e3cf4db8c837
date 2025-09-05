'use client';

import { useState, useEffect } from 'react';
import { X, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { NotificationBannerProps } from '@/lib/types';

export function NotificationBanner({ 
  variant, 
  message, 
  onClose, 
  autoClose = false 
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 5000); // Auto close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) {
    return null;
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'info':
        return {
          bgColor: 'bg-blue-900 bg-opacity-30',
          borderColor: 'border-blue-500',
          textColor: 'text-blue-200',
          iconColor: 'text-blue-400',
          icon: Info,
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-900 bg-opacity-30',
          borderColor: 'border-yellow-500',
          textColor: 'text-yellow-200',
          iconColor: 'text-yellow-400',
          icon: AlertTriangle,
        };
      case 'success':
        return {
          bgColor: 'bg-green-900 bg-opacity-30',
          borderColor: 'border-green-500',
          textColor: 'text-green-200',
          iconColor: 'text-green-400',
          icon: CheckCircle,
        };
      case 'error':
        return {
          bgColor: 'bg-red-900 bg-opacity-30',
          borderColor: 'border-red-500',
          textColor: 'text-red-200',
          iconColor: 'text-red-400',
          icon: XCircle,
        };
      default:
        return {
          bgColor: 'bg-gray-900 bg-opacity-30',
          borderColor: 'border-gray-500',
          textColor: 'text-gray-200',
          iconColor: 'text-gray-400',
          icon: Info,
        };
    }
  };

  const styles = getVariantStyles();
  const Icon = styles.icon;

  return (
    <div className={`
      ${styles.bgColor} 
      ${styles.borderColor} 
      border rounded-lg p-4 mb-4 
      animate-in slide-in-from-top-2 duration-300
    `}>
      <div className="flex items-start gap-3">
        <Icon size={20} className={`${styles.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <p className={`${styles.textColor} text-sm leading-relaxed`}>
            {message}
          </p>
        </div>
        {onClose && (
          <button
            onClick={handleClose}
            className={`${styles.iconColor} hover:text-white transition-colors flex-shrink-0`}
            aria-label="Close notification"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

// Toast notification system
interface ToastNotification {
  id: string;
  variant: NotificationBannerProps['variant'];
  message: string;
  autoClose?: boolean;
}

interface ToastContextType {
  notifications: ToastNotification[];
  addNotification: (notification: Omit<ToastNotification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

import { createContext, useContext, ReactNode } from 'react';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  const addNotification = (notification: Omit<ToastNotification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto remove after 5 seconds if autoClose is true
    if (notification.autoClose !== false) {
      setTimeout(() => {
        removeNotification(id);
      }, 5000);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const value: ToastContextType = {
    notifications,
    addNotification,
    removeNotification,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {notifications.map((notification) => (
          <NotificationBanner
            key={notification.id}
            variant={notification.variant}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
            autoClose={notification.autoClose}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Convenience hooks for different notification types
export function useNotifications() {
  const { addNotification } = useToast();

  return {
    showInfo: (message: string, autoClose = true) => 
      addNotification({ variant: 'info', message, autoClose }),
    showWarning: (message: string, autoClose = true) => 
      addNotification({ variant: 'warning', message, autoClose }),
    showSuccess: (message: string, autoClose = true) => 
      addNotification({ variant: 'success', message, autoClose }),
    showError: (message: string, autoClose = true) => 
      addNotification({ variant: 'error', message, autoClose }),
  };
}
