'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Trash2, ChevronDown, ChevronUp, Send, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import './ChatBot.css';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

interface ChatResponse {
  response: string;
  conversation_id: string;
  model_used: string;
  processing_time: number;
  tokens_used?: number;
}

interface ChatBotProps {
  apiUrl?: string;
  businessName?: string;
  welcomeMessage?: string;
  placeholder?: string;
  className?: string;
  theme?: 'light' | 'dark' | 'cyberlion';
}

const ChatBot: React.FC<ChatBotProps> = ({
  apiUrl = 'https://chatbot-api-production-29fd.up.railway.app',
  businessName = 'Cyberlion Web Solutions',
  welcomeMessage = 'Hello! I\'m here to help with web development, cybersecurity, and AI solutions. How can I assist you today?',
  placeholder = 'Ask about our services, pricing, or technical solutions...',
  className = '',
  theme = 'cyberlion'
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: welcomeMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversation_id: conversationId,
          conversation_history: messages.slice(-6) // Send last 6 messages for context
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data: ChatResponse = await response.json();
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString()
      };

      setMessages([...updatedMessages, assistantMessage]);
      setConversationId(data.conversation_id);

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment or contact us directly at jordan@cyberlion.com.',
        timestamp: new Date().toISOString()
      };
      setMessages([...updatedMessages, errorMessage]);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([{ role: 'assistant', content: welcomeMessage }]);
    setConversationId(null);
    setError(null);
  };

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`chatbot-container ${className} ${isMinimized ? 'minimized' : ''}`}>
      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-title">
          <div className="chatbot-avatar">
            <Bot className="size-5" />
          </div>
          <div>
            <h3>{businessName}</h3>
            <span className={`status ${error ? 'error' : 'online'}`}>
              {error ? 'Connection Issue' : 'Online'}
            </span>
          </div>
        </div>
        <div className="chatbot-controls">
          <Button
            variant="ghost"
            size="icon-sm"
            className="control-btn clear-btn"
            onClick={clearConversation}
            title="Clear conversation"
            disabled={isLoading}
          >
            <Trash2 className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="control-btn minimize-btn"
            onClick={toggleMinimized}
            title={isMinimized ? 'Expand chat' : 'Minimize chat'}
          >
            {isMinimized ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </Button>
        </div>
      </div>

      {/* Messages Container */}
      {!isMinimized && (
        <div className="chatbot-body">
          <div className="messages-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
              >
                <div className="message-content">
                  {message.content}
                </div>
                {message.timestamp && (
                  <div className="message-time">
                    {formatTime(message.timestamp)}
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="message assistant-message">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chatbot-input">
            <div className="input-container">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                className="message-input"
                disabled={isLoading}
                maxLength={1000}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="send-button"
                size="icon"
                title="Send message (Enter)"
              >
                {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              </Button>
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle className="size-3 inline-block mr-1" />
                {error}
              </div>
            )}

            <div className="chatbot-footer">
              <span>Powered by Cyberlion AI • Secure & Private</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;