import { IPlugin } from '../interfaces/IPlugin';
import { IFormattingRule } from '../interfaces/IFormattingRule';

/**
 * Abstract base plugin class
 * Follows Open/Closed Principle - plugins extend without modifying core
 */
export abstract class BasePlugin implements IPlugin {
  abstract readonly name: string;
  abstract readonly version: string;

  abstract getRules(): IFormattingRule[];
}
