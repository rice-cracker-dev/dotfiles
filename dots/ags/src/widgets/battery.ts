import { ArrayGetIndex, Timeout, type TimeoutBoolean } from 'src/utils'
import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import Variable from 'resource:///com/github/Aylur/ags/variable.js'
import Battery from 'resource:///com/github/Aylur/ags/service/battery.js'

const batteryIcons = ['󰁺', '󰁻', '󰁼', '󰁽', '󰁾', '󰁿', '󰂀', '󰂁', '󰂂', '󰁹'];

const BatteryWidget = () => {
    const isOpen: TimeoutBoolean = { variable: Variable(false), timeout: null, duration: 5000 };
    
    return Widget.EventBox({
        on_primary_click: () => Timeout(isOpen),

        child: Widget.Box({
            children: [
                Widget.Label().hook(Battery, (label) => {
                    const index = ArrayGetIndex(batteryIcons, Battery.percent, 100);
                    label.label = batteryIcons[index]
                }),

                Widget.Revealer({
                    reveal_child: isOpen.variable.bind(),
                    transition: 'slide_left',
                    child: Widget.Label({ css: 'margin-left: 8px' }).hook(Battery, (self) => {
                        let builder = `${Battery.percent}%`;

                        if (Battery.charging) {
                            builder += ' (Charging)';
                        }

                        self.label = builder;
                   })
                })
            ]
        })
    })
}

export default BatteryWidget;
