"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import type { GroupChat } from "@/data/group-chat/types";
import { formatDateTime } from "@/lib/datetime";
import { cn } from "@/lib/utils";

type ViewMessageModalProps = {
  open: boolean;
  chat: GroupChat | null;
  pending?: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
};

export function ViewMessageModal({
  open,
  chat,
  pending,
  onClose,
  onSend,
}: ViewMessageModalProps) {
  const [message, setMessage] = useState("");
  const messages = chat?.messages ?? [];

  useEffect(() => {
    if (!open) setMessage("");
  }, [open]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage("");
  }

  return (
    <Modal
      open={open}
      title={chat ? `View Message — ${chat.title}` : "View Message"}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div className="max-h-80 space-y-3 overflow-y-auto rounded-md border border-zinc-200 bg-zinc-50 p-4">
          {messages.length === 0 ? (
            <p className="py-6 text-center text-sm text-zinc-500">
              No conversation yet.
            </p>
          ) : (
            messages.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "max-w-[85%] rounded-lg px-3 py-2 text-sm shadow-sm",
                  item.sender === "trainer"
                    ? "ml-auto bg-[#042954] text-white"
                    : "mr-auto bg-white text-black",
                )}
              >
                <p className="mb-1 text-xs opacity-80">
                  {item.senderName} · {formatDateTime(item.sentAt)}
                </p>
                <p className="whitespace-pre-wrap">{item.text}</p>
              </div>
            ))
          )}
        </div>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="group-chat-message">Write message</Label>
            <Textarea
              id="group-chat-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type your message..."
              rows={3}
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending || !message.trim()}>
              {pending ? "Sending..." : "Send"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
