import { z } from 'zod';
import { MCPTool, ToolInput, ToolInputSchema } from '@tools/BaseTool.js';

interface ExampleToolInput {
  message: string;
  count?: number;
}

const ExampleToolInputSchema: ToolInputSchema<ExampleToolInput> = {
  message: {
    type: z.string(),
    description: 'The message to process'
  },
  count: {
    type: z.number().optional(),
    description: 'Number of times to repeat the message (default: 1)'
  }
};

export class ExampleTool extends MCPTool<ExampleToolInput> {
  name = 'example_tool';
  description = 'An example tool that demonstrates the framework capabilities';
  protected schema = ExampleToolInputSchema;

  async execute(input: ToolInput<typeof ExampleToolInputSchema>) {
    const { message, count = 1 } = input;
    
    const result = Array(count).fill(message).join(' ');
    
    return {
      content: [
        {
          type: 'text' as const,
          text: `Processed message: ${result}`
        }
      ]
    };
  }
}
