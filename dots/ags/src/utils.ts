import type { Variable } from 'types/variable';
import Utils from 'resource:///com/github/Aylur/ags/utils.js';
import GLib from 'gi://GLib';

export interface TimeoutBoolean {
    variable: Variable<boolean>;
    timeout: number | null;
    duration: number;
}

export const Timeout = (timeout: TimeoutBoolean, toggle = true) => {
    if (timeout.variable.value && timeout.timeout) {
        GLib.source_remove(timeout.timeout);
        timeout.timeout = null;
        timeout.variable.value = !toggle;
        return;
    }

    timeout.timeout = Utils.timeout(timeout.duration, () => (timeout.variable.value = !toggle));

    timeout.variable.value = toggle;
};

export const ArrayGetIndex = <T = any>(arr: T[], value: number, max: number) => {
    let index = Math.trunc(value / (max / arr.length));

    if (index >= arr.length) {
        index = arr.length - 1;
    }

    return index;
};

export const ToPercentage = (value: number, max: number) => Math.trunc((value / max) * 100);
