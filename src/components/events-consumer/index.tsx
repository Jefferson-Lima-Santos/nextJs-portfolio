'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSubscription, ApolloProvider } from '@apollo/client';
import { apolloClient } from '../../lib/apollo-client';
import { NOTIFICATION_SUBSCRIPTION, NotificationCreatedSubscription } from '../../graphql/subscriptions';

interface ConnectionStatus {
  isConnected: boolean;
  isSubscribed: boolean;
  lastNotification?: string;
  error?: string;
}

interface EventMessage {
  id: string;
  type: 'connection' | 'notification' | 'error' | 'info';
  content: string;
  timestamp: string;
  data?: any;
}

const NotificationSubscriber: React.FC = () => {
  const [messages, setMessages] = useState<EventMessage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: false,
    isSubscribed: false
  });

  const addMessage = useCallback((content: string, type: EventMessage['type'], data?: any) => {
    const message: EventMessage = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      content,
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      data
    };

    setMessages(prev => [...prev.slice(-49), message]); // Manter apenas os últimos 50 mensagens
  }, []);

  const { data, loading, error } = useSubscription<NotificationCreatedSubscription>(
    NOTIFICATION_SUBSCRIPTION,
    {
      onData: ({ data }) => {
        if (data.data?.notificationCreated) {
          const notification = data.data.notificationCreated;
          setConnectionStatus(prev => ({
            ...prev,
            lastNotification: new Date().toLocaleTimeString('pt-BR')
          }));

          addMessage(
            `Nova notificação: ${notification.name} (ID: ${notification.notificationId})`,
            'notification',
            notification
          );
        }
      },
      onComplete: () => {
        addMessage('Subscription finalizada', 'info');
        setConnectionStatus(prev => ({ ...prev, isSubscribed: false }));
      },
      onError: (error) => {
        addMessage(`Erro na subscription: ${error.message}`, 'error', error);
        setConnectionStatus(prev => ({
          ...prev,
          isSubscribed: false,
          error: error.message
        }));
      }
    }
  );

  useEffect(() => {
    if (loading) {
      addMessage('Conectando à subscription...', 'connection');
      setConnectionStatus(prev => ({
        ...prev,
        isConnected: true,
        isSubscribed: true,
        error: undefined
      }));
    }
  }, [loading, addMessage]);

  useEffect(() => {
    if (error) {
      addMessage(`Erro de conexão: ${error.message}`, 'error', error);
      setConnectionStatus(prev => ({
        ...prev,
        isConnected: false,
        isSubscribed: false,
        error: error.message
      }));
    }
  }, [error, addMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const getStatusColor = () => {
    if (connectionStatus.error) return 'text-red-600 bg-red-100';
    if (connectionStatus.isSubscribed) return 'text-green-600 bg-green-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  const getStatusText = () => {
    if (connectionStatus.error) return '❌ Erro';
    if (loading) return '🔄 Conectando...';
    if (connectionStatus.isSubscribed) return '✅ Subscription Ativa';
    return '⚠️ Desconectado';
  };

  const getMessageTypeColor = (type: EventMessage['type']) => {
    switch (type) {
      case 'connection': return 'bg-blue-50 border-blue-200';
      case 'notification': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-gray-50 border-gray-200';
      case 'error': return 'bg-red-50 border-red-200';
      default: return 'bg-white border-gray-200';
    }
  };

  const getMessageTypeIcon = (type: EventMessage['type']) => {
    switch (type) {
      case 'connection': return '🔗';
      case 'notification': return '🔔';
      case 'info': return 'ℹ️';
      case 'error': return '❌';
      default: return '📨';
    }
  };

  const getSeverityText = (severity: number) => {
    switch (severity) {
      case 1: return '🟢 Baixa';
      case 2: return '🟡 Média';
      case 3: return '🟠 Alta';
      case 4: return '🔴 Crítica';
      default: return '⚪ Desconhecida';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            🔔 Consumidor de Notificações GraphQL
          </h1>

          <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </div>

          {connectionStatus.lastNotification && (
            <div className="mt-2 text-sm text-gray-600">
              Última notificação: {connectionStatus.lastNotification}
            </div>
          )}

          {connectionStatus.error && (
            <div className="mt-2 text-sm text-red-600">
              Erro: {connectionStatus.error}
            </div>
          )}
        </div>

        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={clearMessages}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Limpar Mensagens
            </button>

            <div className="text-sm text-gray-600 flex items-center">
              Status: {loading ? 'Carregando...' : connectionStatus.isSubscribed ? 'Escutando notificações' : 'Não conectado'}
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📬 Notificações Recebidas ({messages.length})
          </h3>

          <div className="h-96 overflow-y-auto border border-gray-200 rounded-md">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                Aguardando notificações...
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-md border ${getMessageTypeColor(message.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getMessageTypeIcon(message.type)}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            [{message.timestamp}] {message.content}
                          </div>
                          {message.data && message.type === 'notification' && (
                            <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                              <div className="grid grid-cols-2 gap-2">
                                <div><strong>Tipo:</strong> {message.data.eventType}</div>
                                <div><strong>Severidade:</strong> {getSeverityText(message.data.severity)}</div>
                                <div><strong>Data Início:</strong> {new Date(message.data.startDate).toLocaleString('pt-BR')}</div>
                                <div><strong>Data Fim:</strong> {new Date(message.data.endDate).toLocaleString('pt-BR')}</div>
                                <div className="col-span-2"><strong>Mensagem:</strong> {message.data.message}</div>
                                <div className="col-span-2"><strong>Sistemas:</strong> {message.data.systems.join(', ')}</div>
                              </div>
                              <details className="mt-2">
                                <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                                  Ver dados completos
                                </summary>
                                <pre className="mt-2 p-2 bg-white rounded text-xs overflow-x-auto border">
                                  {JSON.stringify(message.data, null, 2)}
                                </pre>
                              </details>
                            </div>
                          )}
                          {message.data && message.type !== 'notification' && (
                            <details className="mt-2">
                              <summary className="cursor-pointer text-xs text-gray-600 hover:text-gray-800">
                                Ver dados
                              </summary>
                              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                                {JSON.stringify(message.data, null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 capitalize">
                        {message.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const EventsConsumer: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <NotificationSubscriber />
    </ApolloProvider>
  );
};

export default EventsConsumer;
