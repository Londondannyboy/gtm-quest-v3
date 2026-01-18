import {
  CopilotRuntime,
  GoogleGenerativeAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";

// GoogleGenerativeAIAdapter reads GOOGLE_API_KEY from env
const serviceAdapter = new GoogleGenerativeAIAdapter({
  model: "gemini-2.0-flash",
});

// Configure remote endpoint for Pydantic AI backend
const AGENT_URL = process.env.AGENT_URL || "http://localhost:8000/copilotkit";

const runtime = new CopilotRuntime({
  remoteEndpoints: [
    {
      url: AGENT_URL,
    },
  ],
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
