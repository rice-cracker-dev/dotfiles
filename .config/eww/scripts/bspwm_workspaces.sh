get_workspaces() {
  bspc query -D
}

get_focused_workspace() {
  bspc query -D -d .focused --names
}

to_eww() {
  buffered=""
  for i in $(seq 1 9); do
    class="workspace"
    if [[ $(get_focused_workspace) = $i ]]; then
      class+=" active"
    fi

    buffered+="(button :onclick \"bspc desktop -f ${i}\" :class \"${class}\" \"${i}\")"
  done

  echo "(box :valign \"fill\" :vexpand true ${buffered})"
}

to_eww
bspc subscribe desktop node_transfer | while read -r _; do
  to_eww 
done

