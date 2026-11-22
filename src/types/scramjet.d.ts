/// <reference types="vite/client" />

declare function $scramjetLoadController(): {
  ScramjetController: new (config: {
    files: {
      wasm: string;
      all: string;
      sync: string;
    };
    prefix?: string;
    wisp?: string;
    codec?: unknown;
  }) => {
    init: () => Promise<void>;
    modifyConfig: (config: Record<string, unknown>) => Promise<void>;
    encodeUrl: (url: string | URL) => string;
    decodeUrl: (url: string | URL) => string;
    createFrame: (frame?: HTMLIFrameElement) => {
      frame: HTMLIFrameElement;
      go: (url: string) => void;
      back: () => void;
      forward: () => void;
      reload: () => void;
    };
  };
};

declare function $scramjetLoadWorker(): {
  ScramjetServiceWorker: new () => {
    loadConfig: () => Promise<void>;
    route: (event: FetchEvent) => boolean;
    fetch: (event: FetchEvent) => Promise<Response>;
  };
};

declare namespace BareMux {
  class BareMuxConnection {
    constructor(workerPath: string);
    setTransport(path: string, args: unknown[]): Promise<void>;
    getTransport(): Promise<string>;
  }
}
