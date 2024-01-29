import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import SystemTray from 'resource:///com/github/Aylur/ags/service/systemtray.js';
import ClockWidget from './widgets/clock';
import NetworkWidget from './widgets/network';
import VolumeWidget from './widgets/volume';
import BatteryWidget from './widgets/battery';
import SysTrayWidget from './widgets/systray';

const top = Widget.Window({
    name: 'bar',
    anchor: ['top', 'left', 'right'],
    margins: [8, 0, 0, 0],
    exclusivity: 'exclusive',
    heightRequest: 42,
    child: Widget.Box({
        class_name: 'main',
        spacing: 8,
        children: [
            Widget.Box({
                class_name: 'variant-base card',
                hexpand: true
            }),

            Widget.Box({
                class_name: 'variant-base card all',
                spacing: 16,
                child: SysTrayWidget()
            }).bind('visible', SystemTray, 'items', (i) => i.length > 0),

            Widget.Box({
                class_name: 'variant-base card',
                spacing: 16,
                children: [VolumeWidget(), BatteryWidget(), NetworkWidget()]
            }),

            Widget.Box({
                class_name: 'variant-base card',
                child: ClockWidget()
            })
        ]
    })
});

export default { windows: [top] };
