#!/usr/bin/env bash

PACKAGES="$(cat $HOME/packages.txt)"

# init keyring or smth
sudo pacman-key --init
sudo pacman-key --populate archlinux

# setup chaotic aur
sudo pacman-key --recv-key 3056513887B78AEB --keyserver keyserver.ubuntu.com
sudo pacman-key --lsign-key 3056513887B78AEB
sudo pacman -U 'https://cdn-mirror.chaotic.cx/chaotic-aur/chaotic-keyring.pkg.tar.zst' 'https://cdn-mirror.chaotic.cx/chaotic-aur/chaotic-mirrorlist.pkg.tar.zst'

echo "[chaotic-aur]" | sudo tee -a /etc/pacman.conf
echo "Include = /etc/pacman.d/chaotic-mirrorlist" | sudo tee -a /etc/pacman.conf

# install yay
sudo pacman -Syu --noconfirm yay powerpill
sudo pacman -Sy && sudo powerpill -Su && yay -Su
yay -S --noconfirm ${PACKAGES}

