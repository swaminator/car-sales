'use client'

import { Amplify } from 'aws-amplify';
import { generateClient } from "aws-amplify/api";
import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../../amplify_outputs.json";
import { Schema } from "../../amplify/data/resource";
import React from 'react';
import ReactMarkdown from 'react-markdown';

Amplify.configure(outputs)
const client = generateClient<Schema>({authMode: "userPool"});
const { useAIConversation } = createAIHooks(client);

export default function Page() {
    const [
      {
        data: { messages },
        isLoading,
      },
      handleSendMessage,
    ] = useAIConversation('chat');
    // 'chat' is based on the key for the conversation route in your schema.
  
    return (
      <div className="h-screen flex items-end pb-8 pl-8 pr-8">
        <AIConversation
          messages={messages}
          messageRenderer={{
            text: ({ text }) => <ReactMarkdown>{text}</ReactMarkdown>
          }}
          isLoading={isLoading}
          handleSendMessage={handleSendMessage}
        />
        </div>
    );
  }
  