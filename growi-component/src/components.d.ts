/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface GrowiComponent {
        /**
          * The name
         */
        "name": string;
        /**
          * The parametar1
         */
        "params1": string;
        /**
          * The parametar2
         */
        "params2": string;
    }
}
declare global {
    interface HTMLGrowiComponentElement extends Components.GrowiComponent, HTMLStencilElement {
    }
    var HTMLGrowiComponentElement: {
        prototype: HTMLGrowiComponentElement;
        new (): HTMLGrowiComponentElement;
    };
    interface HTMLElementTagNameMap {
        "growi-component": HTMLGrowiComponentElement;
    }
}
declare namespace LocalJSX {
    interface GrowiComponent {
        /**
          * The name
         */
        "name"?: string;
        /**
          * The parametar1
         */
        "params1"?: string;
        /**
          * The parametar2
         */
        "params2"?: string;
    }
    interface IntrinsicElements {
        "growi-component": GrowiComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "growi-component": LocalJSX.GrowiComponent & JSXBase.HTMLAttributes<HTMLGrowiComponentElement>;
        }
    }
}
