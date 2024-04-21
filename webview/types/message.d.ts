/* eslint-disable @typescript-eslint/no-explicit-any */

type MessageCommand = 'showMessage';

interface Message<T = any> {
  command: MessageCommand;
  data: T;
}

type ShowMessageMessage = Message<{
  type: 'info' | 'error' | 'warning';
  message: string;
}>;

interface MessageListener<T = any> {
  (e: Message<T>): any;
}
