import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import { useChatGPT } from './useChatGPT';
// import { useAnalytics } from '../../shared/hooks/useAnalytics';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '🦁 Привет! Я помощник зоопарка. Могу ответить на вопросы о животных, тарифах и услугах. Чем помочь?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { sendMessage } = useChatGPT();
  // const { trackEvent } = useAnalytics();

  // Автоскролл к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Открытие чатбота - отслеживаем событие
  const handleOpenChat = () => {
    setIsOpen(true);
    // trackEvent({
    //   event_type: 'chatbot_opened',
    //   page: window.location.pathname,
    //   timestamp: new Date(),
    // });
  };

  // Закрытие чатбота
  const handleCloseChat = () => {
    setIsOpen(false);
  };

  // Отправка сообщения
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Добавляем сообщение пользователя
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setLoading(true);

    // Отслеживаем событие поиска
    // trackEvent({
    //   event_type: 'chatbot_message_sent',
    //   message: inputValue,
    //   page: window.location.pathname,
    //   timestamp: new Date(),
    // });

    try {
      // Отправляем запрос к GigaChat
      const response = await sendMessage(inputValue);

      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Отслеживаем получение ответа
      trackEvent({
        event_type: 'chatbot_response_received',
        message_length: response.length,
        page: window.location.pathname,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: '❌ Извините, произошла ошибка. Попробуйте позже.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Enter для отправки
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* КНОПКА ОТКРЫТИЯ ЧАТБОТА */}
      {!isOpen && (
        <button
          className="chatbot-button"
          onClick={handleOpenChat}
          title="Открыть чатбота"
        >
          💬
        </button>
      )}

      {/* ПАНЕЛЬ ЧАТБОТА */}
      {isOpen && (
        <div className="chatbot-container">
          {/* HEADER */}
          <div className="chatbot-header">
            <h3>🦁 Помощник зоопарка</h3>
            <button
              className="chatbot-close-btn"
              onClick={handleCloseChat}
              title="Закрыть"
            >
              ✕
            </button>
          </div>

          {/* СООБЩЕНИЯ */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message message-${msg.sender}`}
              >
                <div className="message-bubble">
                  {msg.text}
                </div>
                <div className="message-time">
                  {msg.timestamp.toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))}

            {loading && (
              <div className="message message-bot">
                <div className="message-bubble">
                  <span className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="chatbot-input-container">
            <textarea
              className="chatbot-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напишите вопрос..."
              rows="3"
              disabled={loading}
            />
            <button
              className="chatbot-send-btn"
              onClick={handleSendMessage}
              disabled={loading || !inputValue.trim()}
              title="Отправить (Enter)"
            >
              ➤
            </button>
          </div>

          {/* ПОДСКАЗКИ */}
          <div className="chatbot-hints">
            <small>💡 Спросите про:</small>
            <div className="hints-grid">
              <button
                className="hint-btn"
                onClick={() => setInputValue('Какие животные живут в зоопарке?')}
              >
                Животные
              </button>
              <button
                className="hint-btn"
                onClick={() => setInputValue('Сколько стоят билеты?')}
              >
                Цены
              </button>
              <button
                className="hint-btn"
                onClick={() => setInputValue('Когда вы открыты?')}
              >
                Часы
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
