import type { TrayItem } from 'types/service/systemtray';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import SystemTray from 'resource:///com/github/Aylur/ags/service/systemtray.js';

const SysTrayItemWidget = (item: TrayItem) =>
    Widget.Button({
        child: Widget.Icon().bind('icon', item, 'icon'),
        class_name: 'variant-ghost-light btn square',
        tooltip_markup: item.bind('tooltip_markup'),
        on_primary_click: (_, event) => item.activate(event),
        on_secondary_click: (_, event) => item.openMenu(event)
    });

const SysTrayWidget = () =>
    Widget.Box({ spacing: 2 }).bind('children', SystemTray, 'items', (i) =>
        i.map(SysTrayItemWidget)
    );

export default SysTrayWidget;
