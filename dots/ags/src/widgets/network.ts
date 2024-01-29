import { Timeout, type TimeoutBoolean } from 'src/utils';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Network from 'resource:///com/github/Aylur/ags/service/network.js';
import Variable from 'resource:///com/github/Aylur/ags/variable.js';

const wifiStrengthIcons = ['󰤯', '󰤟', '󰤢', '󰤥', '󰤨'];

const WiredWidget = () => Widget.Box();

const WirelessConnectedWidget = () =>
    Widget.Label({
        label: Network.wifi
            .bind('strength')
            .transform(
                (strength) =>
                    wifiStrengthIcons[Math.floor(strength / (100 / wifiStrengthIcons.length))]
            )
    });

const WirelessWidget = () => {
    const isOpen: TimeoutBoolean = { variable: Variable(false), timeout: null, duration: 5000 };

    return Widget.EventBox({
        on_primary_click: () => Timeout(isOpen),

        child: Widget.Box({
            children: [
                Widget.Stack({
                    items: [['connected', WirelessConnectedWidget()]],
                    shown: Network.wifi.bind('internet')
                }),

                Widget.Revealer({
                    reveal_child: isOpen.variable.bind(),
                    transition: 'slide_left',
                    child: Widget.Label({
                        label: Network.wifi
                            .bind('ssid')
                            .transform((wifi) => wifi ?? 'Not connected'),
                        css: 'margin-left: 8px'
                    })
                })
            ]
        })
    });
};

const NetworkWidget = () =>
    Widget.Stack({
        items: [
            ['wired', WiredWidget()],
            // @ts-ignore
            ['wifi', WirelessWidget()]
        ],

        shown: Network.bind('primary').transform((p) => p || 'wifi')
    });

export default NetworkWidget;
