import { ExamplePrompt } from '../../examples/prompts/ExamplePrompt.js';
import { describe, test, expect, beforeEach } from '@jest/globals';

describe('ExamplePrompt', () => {
  let prompt: ExamplePrompt;

  beforeEach(() => {
    prompt = new ExamplePrompt();
  });

  describe('Prompt Properties', () => {
    it('should have correct name', () => {
      expect(prompt.name).toBe('example_prompt');
    });

    it('should have correct description', () => {
      expect(prompt.description).toBe('An example prompt that demonstrates the framework capabilities');
    });

    it('should have correct schema', () => {
      expect((prompt as any).schema).toBeDefined();
      expect((prompt as any).schema.topic).toBeDefined();
      expect((prompt as any).schema.style).toBeDefined();
    });
  });

  describe('getMessages', () => {
    it('should generate prompt with default style', async () => {
      const args = { topic: 'Artificial Intelligence' };
      const result = await prompt.getMessages(args);

      expect(result).toHaveLength(1);
      expect(result[0].role).toBe('user');
      expect(result[0].content.type).toBe('text');
      expect(result[0].content.text).toContain('Write a casual article about Artificial Intelligence');
      expect(result[0].content.text).toContain('Topic: Artificial Intelligence');
      expect(result[0].content.text).toContain('Style: casual');
    });

    it('should generate prompt with custom style', async () => {
      const args = { topic: 'Machine Learning', style: 'technical' };
      const result = await prompt.getMessages(args);

      expect(result).toHaveLength(1);
      expect(result[0].role).toBe('user');
      expect(result[0].content.type).toBe('text');
      expect(result[0].content.text).toContain('Write a technical article about Machine Learning');
      expect(result[0].content.text).toContain('Topic: Machine Learning');
      expect(result[0].content.text).toContain('Style: technical');
    });

    it('should include required content structure', async () => {
      const args = { topic: 'Data Science', style: 'formal' };
      const result = await prompt.getMessages(args);

      const promptText = result[0].content.text;
      expect(promptText).toContain('engaging introduction');
      expect(promptText).toContain('Key points about the topic');
      expect(promptText).toContain('conclusion that summarizes');
    });

    it('should handle empty topic gracefully', async () => {
      const args = { topic: '' };
      const result = await prompt.getMessages(args);

      expect(result[0].content.text).toContain('Topic: ');
    });
  });
});
