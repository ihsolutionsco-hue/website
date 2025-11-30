import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { ChatMessage, ChatRole } from '../types';
import { streamMessageToMake } from '../services/makeService';
import ReactMarkdown from 'react-markdown';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: ChatRole.MODEL, text: "Welcome to IHM Vacations! I'm your Digital Concierge. How can I help you plan your stay today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: ChatRole.USER, text: userMsg }]);
    setIsLoading(true);

    try {
      // Create a temporary message for the stream
      setMessages(prev => [...prev, { role: ChatRole.MODEL, text: '' }]);

      // Obtener el historial actualizado (incluyendo el mensaje del usuario que acabamos de agregar)
      const currentHistory = [...messages, { role: ChatRole.USER, text: userMsg }];
      
      const streamResult = streamMessageToMake(currentHistory, userMsg);
      
      let fullResponse = '';
      for await (const chunk of streamResult) {
          const chunkText = chunk.text();
          fullResponse += chunkText;
          
          // Update the last message with the accumulated text
          setMessages(prev => {
              const newHistory = [...prev];
              newHistory[newHistory.length - 1] = { role: ChatRole.MODEL, text: fullResponse };
              return newHistory;
          });
      }

    } catch (error) {
      console.error('Error en el chat:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "I'm having trouble connecting right now. Please try again later or call our support line.";
      setMessages(prev => {
        const newHistory = [...prev];
        // Si el último mensaje está vacío, reemplazarlo con el error
        if (newHistory[newHistory.length - 1]?.text === '') {
          newHistory[newHistory.length - 1] = { role: ChatRole.MODEL, text: errorMessage };
        } else {
          // Si no, agregar un nuevo mensaje de error
          newHistory.push({ role: ChatRole.MODEL, text: errorMessage });
        }
        return newHistory;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-slate-800 transition-all transform hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open Digital Concierge"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="ml-2 font-bold hidden sm:inline">Ask Concierge</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col max-h-[600px] overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <div className="bg-white/10 p-2 rounded-full">
                <Bot className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm">IHM Digital Concierge</h3>
                <div className="flex items-center text-xs text-slate-400">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    Online
                </div>
              </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 h-[400px]">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.role === ChatRole.USER 
                      ? 'bg-amber-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about tickets, pool heat..."
                disabled={isLoading}
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 p-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-2">
                AI can make mistakes. Contact support for urgent issues.
            </p>
          </div>
        </div>
      )}
    </>
  );
};