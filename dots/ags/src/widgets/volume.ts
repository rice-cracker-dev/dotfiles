import type { Stream } from 'types/service/audio';
import type Label from 'types/widgets/label';
import { ArrayGetIndex, ToPercentage } from 'src/utils';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Variable from 'resource:///com/github/Aylur/ags/variable.js';
import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';

const speakerIcons = ['󰕿', '', '󰕾'];
const speakerMutedIcon = '󰝟';

const microphoneIcon = '󰍬';
const microphoneMutedIcon = '󰍭';

type StreamType = 'speaker' | 'microphone';

const PercLabel = (type: StreamType) => {
    return Widget.Label({ css: 'font-size: 12px', xalign: 0 }).hook(
        Audio,
        (self) => {
            const stream = Audio[type];
            self.label = `${ToPercentage(stream?.volume, 1)}%`;
        },
        `${type}-changed`
    );
};

const DescLabel = (type: StreamType) => {
    return Widget.Label({
        css: 'font-size: 12px',
        xalign: 0,
        max_width_chars: 20
    }).hook(
        Audio,
        (self) => {
            const stream = Audio[type];
            self.label = stream?.description ?? 'Unknown';
        },
        `${type}-changed`
    );
};

const VolumeStreamWidget = (type: StreamType) => {
    const isOpen = Variable(false);
    const isNameShown = Variable(false);

    const labelHookCallback = (self: Label<unknown>) => {
        const stream = Audio[type];

        self.label = stream?.is_muted
            ? type === 'speaker'
                ? speakerMutedIcon
                : microphoneMutedIcon
            : type === 'speaker'
              ? speakerIcons[ArrayGetIndex(speakerIcons, stream?.volume, 1)]
              : microphoneIcon;
    };

    const eventBoxOnScrollCallback = () => {
        if (isOpen.value) {
            isNameShown.value = !isNameShown.value;
        }
    };

    return Widget.EventBox({
        on_primary_click: () => (isOpen.value = !isOpen.value),
        on_scroll_down: eventBoxOnScrollCallback,
        on_scroll_up: eventBoxOnScrollCallback,

        child: Widget.Box({
            children: [
                Widget.Label({ css: 'font-size: 16px' }).hook(
                    Audio,
                    labelHookCallback,
                    `${type}-changed`
                ),

                Widget.Revealer({
                    reveal_child: isOpen.bind(),
                    transition: 'slide_left',
                    vpack: 'center',
                    child: Widget.Box({
                        css: 'margin-left: 8px',
                        vertical: true,
                        children: [
                            Widget.Stack({
                                items: [
                                    ['perc', PercLabel(type)],
                                    ['desc', DescLabel(type)]
                                ],

                                shown: isNameShown.bind().transform((o) => (o ? 'desc' : 'perc')),
                                transition: 'slide_right',
                            }),

                            Widget.Slider({
                                on_change: ({ value }) => (Audio[type].volume = value),

                                class_name: 'variant-mauve scale',
                                draw_value: false,
                                hpack: 'fill',
                                max: 1
                            }).hook(
                                Audio,
                                (self) => (self.value = Audio[type].volume),
                                `${type}-changed`
                            )
                        ]
                    })
                })
            ]
        })
    });
};

const VolumeWdiget = () =>
    Widget.Box({
        spacing: 16,
        children: [VolumeStreamWidget('speaker'), VolumeStreamWidget('microphone')]
    });

export default VolumeWdiget;
