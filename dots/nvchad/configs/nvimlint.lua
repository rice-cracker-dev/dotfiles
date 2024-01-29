local fts = {
    { ft = { "css", "html", "scss" }, linter = { "eslint_d" } },
    { ft = { "javascript", "typescript" }, linter = { "eslint_d" } },
}

local linters = {}
for _, ft in pairs(fts) do
    for _, linter in pairs(ft.ft) do
        linters[linter] = ft.linter
    end
end

local options = {
    linters_by_ft = linters,
}

require("lint").setup(options)

