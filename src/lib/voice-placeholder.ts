import { useCallback, useState } from "react";

/**
 * ElevenLabs voice integration placeholder.
 *
 * TODO: install `@elevenlabs/react`, connect the ElevenLabs connector, then
 * replace this hook with `useConversation()` — mint a conversation token in a
 * server function and call `startSession({ conversationToken, connectionType: "webrtc" })`.
 */
export type VoiceState = "idle" | "listening" | "speaking";

export function useVoicePlaceholder() {
  const [state, setState] = useState<VoiceState>("idle");

  const toggle = useCallback(() => {
    // TODO: startSession() / endSession() via the ElevenLabs React SDK.
    setState((prev) => (prev === "idle" ? "listening" : "idle"));
  }, []);

  return { state, toggle, isAvailable: false as const };
}
