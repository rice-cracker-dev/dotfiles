#!/usr/bin/env bash
source ./commons.sh

if ! [ -f /etc/pacman.d/chaotic-mirrorlist ]; then
    # reset pacman keyring
    sudo rm -rf /etc/pacman.d/gnupg/
    sudo pacman-key --init
    sudo pacman-key --populate archlinux

    # install chaotic aur
    sudo pacman-key --recv-key 3056513887B78AEB --keyserver keyserver.ubuntu.com
    sudo pacman-key --lsign-key 3056513887B78AEB
    sudo pacman -U 'https://cdn-mirror.chaotic.cx/chaotic-aur/chaotic-keyring.pkg.tar.zst' --noconfirm
    sudo pacman -U 'https://cdn-mirror.chaotic.cx/chaotic-aur/chaotic-mirrorlist.pkg.tar.zst' --noconfirm

    sudo cp $root/etc/pacman.conf /etc/pacman.conf

    sudo pacman -Syu yay powerpill --noconfirm
    sudo pacman -Sy --noconfirm && sudo powerpill -Su --noconfirm && yay -Su --noconfirm
fi

# install all packages in packages.txt
yay -S --noconfirm $(cat ./packages.txt)

# configure
bash ./configure.sh
