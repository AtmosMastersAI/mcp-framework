import { ExampleResource } from '../../examples/resources/ExampleResource.js';
import { describe, test, expect, beforeEach } from '@jest/globals';

describe('ExampleResource', () => {
  let resource: ExampleResource;

  beforeEach(() => {
    resource = new ExampleResource();
  });

  describe('Resource Properties', () => {
    it('should have correct name', () => {
      expect(resource.name).toBe('example_resource');
    });

    it('should have correct description', () => {
      expect(resource.description).toBe('An example resource that demonstrates the framework capabilities');
    });
  });

  describe('resourceDefinition', () => {
    it('should return correct resource definition', () => {
      const definition = resource.resourceDefinition;

      expect(definition.uri).toBe('example://');
      expect(definition.name).toBe('example_resource');
      expect(definition.description).toBe('An example resource that demonstrates the framework capabilities');
    });
  });

  describe('read', () => {
    it('should return multiple resource contents', async () => {
      const contents = await resource.read();

      expect(contents).toHaveLength(2);
      
      const configContent = contents.find(content => content.uri === 'example://config');
      expect(configContent).toBeDefined();
      expect(configContent?.mimeType).toBe('application/json');
      expect(configContent?.text).toBeDefined();

      const dataContent = contents.find(content => content.uri === 'example://data');
      expect(dataContent).toBeDefined();
      expect(dataContent?.mimeType).toBe('text/plain');
      expect(dataContent?.text).toBeDefined();
    });
  });

  describe('readResource', () => {
    it('should read config resource correctly', async () => {
      const result = await resource.readResource('example://config');

      expect(result.uri).toBe('example://config');
      expect(result.mimeType).toBe('application/json');
      expect(result.text).toBeDefined();

      const config = JSON.parse(result.text!);
      expect(config.name).toBe('Example MCP Server');
      expect(config.version).toBe('1.0.0');
      expect(config.features).toEqual(['tools', 'prompts', 'resources']);
      expect(config.settings).toBeDefined();
      expect(config.settings.debug).toBe(false);
      expect(config.settings.timeout).toBe(30000);
    });

    it('should read data resource correctly', async () => {
      const result = await resource.readResource('example://data');

      expect(result.uri).toBe('example://data');
      expect(result.mimeType).toBe('text/plain');
      expect(result.text).toBeDefined();
      expect(result.text).toContain('This is example data from the MCP Framework boilerplate');
      expect(result.text).toContain('This resource demonstrates how to:');
      expect(result.text).toContain('- Define multiple resource URIs');
      expect(result.text).toContain('- Return different content types');
      expect(result.text).toContain('- Provide structured data');
    });

    it('should throw error for unknown resource URI', async () => {
      await expect(resource.readResource('example://unknown')).rejects.toThrow('Unknown resource URI: example://unknown');
    });

    it('should throw error for invalid URI format', async () => {
      await expect(resource.readResource('invalid-uri')).rejects.toThrow('Unknown resource URI: invalid-uri');
    });

    it('should throw error for empty URI', async () => {
      await expect(resource.readResource('')).rejects.toThrow('Unknown resource URI: ');
    });
  });
});
