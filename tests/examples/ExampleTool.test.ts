import { ExampleTool } from '../../examples/tools/ExampleTool.js';
import { describe, test, expect, beforeEach } from '@jest/globals';

describe('ExampleTool', () => {
  let tool: ExampleTool;

  beforeEach(() => {
    tool = new ExampleTool();
  });

  describe('Tool Properties', () => {
    it('should have correct name', () => {
      expect(tool.name).toBe('example_tool');
    });

    it('should have correct description', () => {
      expect(tool.description).toBe('An example tool that demonstrates the framework capabilities');
    });

    it('should have correct schema', () => {
      expect((tool as any).schema).toBeDefined();
      expect((tool as any).schema.message).toBeDefined();
      expect((tool as any).schema.count).toBeDefined();
    });
  });

  describe('execute', () => {
    it('should process message with default count', async () => {
      const input = { message: 'Hello World' };
      const result = await tool.execute(input);

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toBe('Processed message: Hello World');
    });

    it('should process message with custom count', async () => {
      const input = { message: 'Test', count: 3 };
      const result = await tool.execute(input);

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toBe('Processed message: Test Test Test');
    });

    it('should handle count of 0', async () => {
      const input = { message: 'Test', count: 0 };
      const result = await tool.execute(input);

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toBe('Processed message: ');
    });

    it('should handle empty message', async () => {
      const input = { message: '', count: 2 };
      const result = await tool.execute(input);

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toBe('Processed message:  ');
    });
  });
});
