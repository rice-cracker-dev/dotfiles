/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
export type BoxProps<Child extends Gtk.Widget, Attr = unknown> = BaseProps<
    Box<Child, Attr>,
    Gtk.Box.ConstructorProperties & {
        child?: Child;
        children?: Child[];
        vertical?: boolean;
    },
    Attr
>;
export interface Box<Child, Attr> extends Widget<Attr> {}
export declare class Box<Child extends Gtk.Widget, Attr> extends Gtk.Box {
    constructor(props?: BoxProps<Child, Attr>);
    get child(): Child;
    set child(child: Child);
    get children(): Child[];
    set children(children: Child[]);
    get vertical(): boolean;
    set vertical(vertical: boolean);
}
export default Box;
