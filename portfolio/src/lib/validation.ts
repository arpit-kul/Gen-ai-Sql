import { z } from "zod";
import { API } from "./constants";

// Message schema for chat
export const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1).max(API.maxMessageLength),
});

export type Message = z.infer<typeof MessageSchema>;

// Chat request schema
export const ChatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(API.maxMessageLength),
      })
    )
    .max(API.maxMessages),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;

// Chat response schema
export const ChatResponseSchema = z.object({
  reply: z.string(),
});

export type ChatResponse = z.infer<typeof ChatResponseSchema>;

// Validate chat request with detailed error messages
export function validateChatRequest(body: unknown): {
  success: true;
  data: ChatRequest;
} | {
  success: false;
  error: string;
} {
  const result = ChatRequestSchema.safeParse(body);

  if (!result.success) {
    const errors = result.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`);
    return {
      success: false,
      error: `Validation failed: ${errors.join("; ")}`,
    };
  }

  return { success: true, data: result.data };
}
