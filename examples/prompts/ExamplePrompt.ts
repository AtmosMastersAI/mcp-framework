import { z } from 'zod';
import { MCPPrompt, PromptArgumentSchema } from '@prompts/BasePrompt.js';

interface ExamplePromptArgs {
  topic: string;
  style?: string;
}

const ExamplePromptArgsSchema: PromptArgumentSchema<ExamplePromptArgs> = {
  topic: {
    type: z.string(),
    description: 'The topic to write about',
    required: true
  },
  style: {
    type: z.string().optional(),
    description: 'The writing style (formal, casual, technical)',
    required: false
  }
};

export class ExamplePrompt extends MCPPrompt<ExamplePromptArgs> {
  name = 'example_prompt';
  description = 'An example prompt that demonstrates the framework capabilities';
  protected schema = ExamplePromptArgsSchema;

  protected async generateMessages(args: ExamplePromptArgs) {
    const { topic, style = 'casual' } = args;
    
    const prompt = `Write a ${style} article about ${topic}. 
    
Please include:
- An engaging introduction
- Key points about the topic
- A conclusion that summarizes the main ideas

Topic: ${topic}
Style: ${style}`;

    return [
      {
        role: 'user',
        content: {
          type: 'text',
          text: prompt
        }
      }
    ];
  }
}
