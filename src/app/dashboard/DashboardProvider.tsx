'use client';

import { CopilotKit } from '@copilotkit/react-core';

// CopilotKit is only loaded on the dashboard page, not globally
// This reduces bundle size on other pages

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      {children}
    </CopilotKit>
  );
}
