'use client';

import { CopilotKit } from '@copilotkit/react-core';
import { AuthProvider } from './AuthProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CopilotKit runtimeUrl="/api/copilotkit">
        {children}
      </CopilotKit>
    </AuthProvider>
  );
}
