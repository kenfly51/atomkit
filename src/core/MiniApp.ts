// MiniApp.ts
import { IMiniApp } from '@core/types/IMiniApp';
import { IEventBus } from '@core/types/IEventBus';
import { EventType } from 'src/contants/EventType';

export abstract class MiniApp extends HTMLElement implements IMiniApp {
  protected eventBus: IEventBus;
  private cssContent: string;
  private name: string;

  constructor(name: string, cssContent: string, eventBus: IEventBus) {
    super();
    this.name = name;
    this.eventBus = eventBus;
    this.cssContent = cssContent;
    // Attach shadow DOM in 'open' mode so that styles and structure are isolated
    this.attachShadow({ mode: 'open' });
  }

  abstract initialize(): void;

  protected abstract render(mountPoint: HTMLElement): void;

  connectedCallback() {
    this.attachCssStyle();
    this.createAndAttachDOM();
  }

  // Method to handle the logic for creating and attaching DOM to the shadow DOM
  private createAndAttachDOM(): void {
    if (this.shadowRoot) {
      const mountPoint = document.createElement('div');
      mountPoint.style.height = "100%";
      this.shadowRoot.appendChild(mountPoint);
      this.render(mountPoint); // Call the abstract render method with the mount point
    }
  }

  private attachCssStyle(): void {
    const styleElement = document.createElement("style");
    styleElement.textContent = this.cssContent;

    this.shadowRoot?.prepend(styleElement);
  }

  communicate(data: any): void {
    this.eventBus.publish(EventType.MINI_APP_MESSAGE, data);
  }

  protected listen(event: string, callback: (data: any) => void): void {
    this.eventBus.subscribe(event, callback);
  }
}