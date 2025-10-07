import React from 'react';
import cx from 'classnames';
import { Role } from './ChatWindow';

/**
 * PUBLIC_INTERFACE
 * MessageBubble component renders a chat message with appropriate styling based on the role.
 * 
 * @param role - The role of the message sender (user, assistant, or system)
 * @param children - The content to render inside the bubble
 */
export default function MessageBubble({ role, children }: { role: Role; children: React.ReactNode }) {
  return (
    <div className={cx('bubble', role)}>
      {children}
    </div>
  );
}
