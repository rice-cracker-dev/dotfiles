local fts = {
    { ft = { "lua" }, formatter = { "stylua" } },
    { ft = { "sh" }, formatter = { "shfmt" } },
    { ft = { "css", "html", "scss" }, formatter = { "prettierd" } },
    { ft = { "javascript", "typescript" }, formatter = { "prettierd" } },
}

local formatters = {}
for _, ft in pairs(fts) do
    for _, formatter in pairs(ft.ft) do
        formatters[formatter] = ft.formatter
    end
end

local options = {
    lsp_fallback = true,

    formatters_by_ft = formatters,

    -- adding same formatter for multiple filetypes can look too much work for some
    -- instead of the above code you could just use a loop! the config is just a table after all!

    format_on_save = {
        -- These options will be passed to conform.format()
        timeout_ms = 500,
        lsp_fallback = true,
    },
}

require("conform").setup(options)
