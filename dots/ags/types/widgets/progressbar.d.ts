/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
export type ProgressBarProps<Attr> = BaseProps<
    ProgressBar<Attr>,
    Gtk.ProgressBar.ConstructorProperties & {
        vertical?: boolean;
        value?: number;
    },
    Attr
>;
export interface ProgressBar<Attr> extends Widget<Attr> {}
export declare class ProgressBar<Attr> extends Gtk.ProgressBar {
    constructor(props?: ProgressBarProps<Attr>);
    get value(): number;
    set value(value: number);
    get vertical(): boolean;
    set vertical(vertical: boolean);
}
export default ProgressBar;
