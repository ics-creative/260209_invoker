// CommandEventの型を定義
export interface CommandEvent extends Event {
  readonly command: string;
  readonly source: HTMLElement;
}

// InterestEventの型を定義
export interface InterestEvent extends Event {
  readonly source: HTMLElement;
}

// ReactのHTMLAttributesを拡張してcommand属性とpopover属性を追加
declare module "react" {
  interface ButtonHTMLAttributes {
    command?: string;
    commandfor?: string;
  }

  interface HTMLAttributes {
    popover?: "auto" | "manual" | "";
  }
}

// HTMLElementにPopover APIメソッドを追加
declare global {
  interface HTMLElement {
    showPopover?: () => void;
    hidePopover?: () => void;
    togglePopover?: (force?: boolean) => void;
  }

  interface HTMLElementEventMap {
    command: CommandEvent;
    interest: InterestEvent;
    toggle: ToggleEvent;
  }

  // CSSStyleDeclarationにCSS Anchor Positioningプロパティを追加
  interface CSSStyleDeclaration {
    anchorName: string;
    positionAnchor: string;
  }
}

// ToggleEventの型を定義
export interface ToggleEvent extends Event {
  readonly newState: "open" | "closed";
  readonly oldState: "open" | "closed";
}
