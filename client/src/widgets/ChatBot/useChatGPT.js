import { useState, useCallback } from 'react';
 //Хук для работы с SberGigaChat API
 
 //Использование:
 //const { sendMessage, loading, error } = useChatGPT();
 //const response = await sendMessage('Привет!');
 

export function useChatGPT() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // СИСТЕМА ПРОМПТОВ для разных типов запросов
  const SYSTEM_PROMPTS = {
    animal: `Ты помощник в зоопарке "Урюпинский зоопарк". 
    Помогаешь посетителям узнать о животных, их поведении, питании, среде обитания.
    Будь дружелюбным, информативным и интересным.
    Если не знаешь информацию - скажи честно.`,
    
    tariff: `Ты помощник в зоопарке. Помогаешь ответить на вопросы о ценах на билеты.
    Билеты стоят: будни 500 рублей, выходные 750 рублей.
    Есть скидки для студентов, инвалидов и пенсионеров.`,
    
    schedule: `Ты помощник в зоопарке. Помогаешь с информацией о часах работы.
    Зоопарк работает каждый день с 10:00 до 18:00.
    Касса закрывается в 17:00.`,
    
    general: `Ты помощник в зоопарке "Урюпинский зоопарк". 
    Помогаешь посетителям с любыми вопросами о зоопарке.
    Будь вежлив, информативен и полезен.`,
  };

  // Определяем тип запроса
  const getSystemPrompt = useCallback((message) => {
    const messageLower = message.toLowerCase();

    if (messageLower.includes('животн') || messageLower.includes('зверь') || 
        messageLower.includes('лев') || messageLower.includes('обезьян')) {
      return SYSTEM_PROMPTS.animal;
    }
    
    if (messageLower.includes('цена') || messageLower.includes('билет') || 
        messageLower.includes('стоит') || messageLower.includes('рублей')) {
      return SYSTEM_PROMPTS.tariff;
    }
    
    if (messageLower.includes('открыт') || messageLower.includes('закрыт') || 
        messageLower.includes('час') || messageLower.includes('время')) {
      return SYSTEM_PROMPTS.schedule;
    }

    return SYSTEM_PROMPTS.general;
  }, []);

  // Основная функция отправки сообщения к GigaChat
  const sendMessage = useCallback(async (message) => {
    setLoading(true);
    setError(null);

    try {
      // ⚠️ ВАЖНО: Замени на свой GigaChat API ключ!
      const GIGACHAT_API_KEY = import.meta.env.REACT_APP_GIGACHAT_API_KEY;; // MDE5YWM3ZWUtZDE2MS03M2NhLThjYzItMDE0Y2EyOWNhMWUyOjAwYjQ4ZGQwLWRiZDUtNDViMi05Yzc1LTlhZGZiZmNhODYyMA==

      if (!GIGACHAT_API_KEY) {
        throw new Error('GigaChat API ключ не установлен. Добавь REACT_APP_GIGACHAT_API_KEY в .env');
      }

      const systemPrompt = getSystemPrompt(message);

      // Запрос к GigaChat API
      const response = await fetch('https://gigachat.devices.sberbank.ru/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GIGACHAT_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'GigaChat:latest',
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Ошибка GigaChat API');
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content;

      if (!aiResponse) {
        throw new Error('Пустой ответ от GigaChat');
      }

      return aiResponse;
    } catch (err) {
      console.error('❌ Ошибка в useChatGPT:', err);
      setError(err.message);
      
      // Fallback ответ если API не работает
      return `😊 Извините, сейчас не могу подключиться к ИИ помощнику. 
      Но я могу ответить вам по основным вопросам:
      
      📞 Позвоните нам: +7 (800) 555-35-35
      📧 Напишите: info@zoo.ru
      🌐 Сайт: www.zoo.ru`;
    } finally {
      setLoading(false);
    }
  }, [getSystemPrompt]);

  return {
    sendMessage,
    loading,
    error,
  };
}

