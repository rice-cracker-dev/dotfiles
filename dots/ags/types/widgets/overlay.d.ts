/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
export type OverlayProps<
    Child extends Gtk.Widget,
    Attr = unknown,
    Self = Overlay<Child, Attr>,
> = BaseProps<
    Self,
    Gtk.Overlay.ConstructorProperties & {
        pass_through?: boolean;
        overlays?: Child[];
        overlay?: Child;
    },
    Attr
>;
export interface Overlay<Child, Attr> extends Widget<Attr> {}
export declare class Overlay<Child extends Gtk.Widget, Attr> extends Gtk.Overlay {
    constructor(props?: OverlayProps<Child, Attr>);
    private _updatePassThrough;
    get pass_through(): boolean;
    set pass_through(passthrough: boolean);
    get overlay(): Child;
    set overlay(overlay: Child);
    get overlays(): Child[];
    set overlays(overlays: Child[]);
}
export default Overlay;
