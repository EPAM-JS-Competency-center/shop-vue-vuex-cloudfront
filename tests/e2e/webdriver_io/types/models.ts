import { ChainablePromiseArray, ChainablePromiseElement } from 'webdriverio';

export type WdioElement = ChainablePromiseElement<Promise<WebdriverIO.Element>>;
export type WdioElements = ChainablePromiseArray<WebdriverIO.Element[]>;
