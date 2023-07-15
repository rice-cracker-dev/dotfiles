export GDK_BACKEND="wayland,x11"
export QT_QPA_PLATFORM="wayland;xcb"
export SDL_VIDEODRIVER=wayland
export CLUTTER_BACKEND=wayland
export XDG_CURRENT_DESKTOP=Hyprland
export XDG_SESSION_TYPE=wayland
export XDG_SESSION_DESKTOP=Hyprland
export QT_AUTO_SCREEN_SCALE_FACTOR=1
export QT_WAYLAND_DISABLE_WINDOWDECORATION=1
export QT_QPA_PLATFORMTHEME=qt5ct
export SSH_ASKPASS="/usr/bin/ksshaskpass"
export SSH_ASKPASS_REQUIRE=prefer
export HYPRSHOT_DIR="$HOME/Pictures/Screenshots"
export THEME_DIR="/usr/share/themes/Catppuccin-Macchiato-Standard-Mauve-dark/"
export TERMINAL=kitty
export EDITOR=code

# nvm
source /usr/share/nvm/init-nvm.sh

if [ $(tty) = "/dev/tty1" ]; then
  exec Hyprland
else
  # i use arch btw
  pfetch
fi
