"use client";

import { useChat } from '@ai-sdk/react';
import { useRegion } from "@/contexts/RegionContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function AIChat() {
  const { region, industry } = useRegion();
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      region,
      industry
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card className="w-full max-w-2xl mx-auto my-12 border-border shadow-sm flex flex-col h-[500px]">
      <CardHeader className="bg-primary text-primary-foreground py-4 rounded-t-lg">
        <CardTitle className="text-xl flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Technical Sales Assistant
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground my-8">
            <p>Hello! I am your Taiguo Boiler technical sales representative.</p>
            <p className="text-sm mt-2">Ask me about boiler capacities, thermal efficiency, or recommendations for the {industry} sector in {region}.</p>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                m.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-card border border-border text-foreground rounded-lg p-3 max-w-[80%]">
              <p className="text-sm animate-pulse">Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      <div className="p-4 bg-background border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about WNS or DZL boiler specs..."
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading} size="icon" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
