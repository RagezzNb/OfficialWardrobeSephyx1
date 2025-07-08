import { useState } from 'react';
import { CHATBOT_RESPONSES } from '../../lib/constants';
import { ChatMessage } from '../../types';
import { generateId } from '../../lib/crypto';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      text: "Welcome to the underground, initiate. What secrets do you seek?",
      isBot: true,
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');

  const getResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('fashion') || lowerInput.includes('clothes') || lowerInput.includes('style')) {
      return CHATBOT_RESPONSES.fashion[Math.floor(Math.random() * CHATBOT_RESPONSES.fashion.length)];
    } else if (lowerInput.includes('vault') || lowerInput.includes('unlock') || lowerInput.includes('access')) {
      return CHATBOT_RESPONSES.vault[Math.floor(Math.random() * CHATBOT_RESPONSES.vault.length)];
    } else if (lowerInput.includes('rank') || lowerInput.includes('xp') || lowerInput.includes('level')) {
      return CHATBOT_RESPONSES.rank[Math.floor(Math.random() * CHATBOT_RESPONSES.rank.length)];
    } else {
      return CHATBOT_RESPONSES.default[Math.floor(Math.random() * CHATBOT_RESPONSES.default.length)];
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      text: input,
      isBot: false,
      timestamp: Date.now()
    };

    const botResponse: ChatMessage = {
      id: generateId(),
      text: getResponse(input),
      isBot: true,
      timestamp: Date.now() + 1000
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-cyber-purple hover:bg-cyber-pink rounded-full flex items-center justify-center transition-all duration-300 animate-pulse"
      >
        <span className="text-cyber-black font-bold text-xs">AI</span>
      </button>
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 terminal-window p-4 font-space text-sm">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-cyber-cyan/30">
            <span className="text-cyber-green">SEPH_AI.exe</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-cyber-red hover:text-cyber-pink"
            >
              &times;
            </button>
          </div>
          <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className="text-cyber-cyan">
                <span className={message.isBot ? "text-cyber-purple" : "text-cyber-green"}>
                  {message.isBot ? "SEPH_AI:" : "USER:"}
                </span>{' '}
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your query..."
              className="flex-1 bg-cyber-dark border border-cyber-cyan/30 text-cyber-cyan px-2 py-1 text-xs focus:outline-none focus:border-cyber-purple"
            />
            <button 
              onClick={sendMessage}
              className="bg-cyber-purple hover:bg-cyber-pink text-cyber-black px-3 py-1 text-xs ml-2"
            >
              SEND
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
