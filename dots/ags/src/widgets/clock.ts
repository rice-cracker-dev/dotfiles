import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Variable from 'resource:///com/github/Aylur/ags/variable.js';

const clockPoll = Variable('', {
    poll: [1000, 'date +%H:%M:%S']
});

const ClockWidget = () =>
    Widget.Box({
        spacing: 8,
        children: [
            Widget.Label({
                class_name: 'text-mauve',
                label: '󰥔'
            }),

            Widget.Label().bind('label', clockPoll)
        ]
    });

export default ClockWidget;
