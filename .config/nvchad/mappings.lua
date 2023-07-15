---@type MappingsTable
local M = {}

M.general = {
  n = {
    [";"] = { ":", "enter command mode", opts = { nowait = true } },
  },
}

M.editor = {
  i = {
    ["<A-Up>"] = { "<cmd>move -2<CR>", "move a line up" },
    ["<A-Down>"] = { "<cmd>move +1<CR>", "move a line down" }
  }
}

-- more keybinds!

return M
