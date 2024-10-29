export interface IShell {
  loadMiniApp(tagName: string, scriptUrl: string, cssUrl?: string): void;
  unloadMiniApp(tagName: string): void;
  communicateBetweenMiniApps(event: string, data: any): void;
}