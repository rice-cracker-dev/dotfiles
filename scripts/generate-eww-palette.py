from dataclasses import fields
from catppuccin import Flavour

flavour = Flavour.mocha()

mainSurfaceColor = "base"
altSurfaceColor = "crust"
mainTextColor = "text"

colorBuilder = ""
colorBuilderFormat = "${0}: {1};\n"

bgBuilder = ""
bgBuilderFormat = ".bg-{0} {{ background-color: {1}; }}\n"

textBuilder = ""
textBuilderFormat = ".text-{0} {{ color: {1}; }}\n"

variantBuilder = ""
variantBuilderFormat = """.variant-{0} {{
    background-color: {1};
    color: {2};

    &.btn:hover {{
        background-color: {3};
        color: {4};
    }} 

    &.btn:active {{
        background-color: {5};
        color: {6};
    }} 

    &.bordered {{
        border: 1px solid $surface0;
    }}
}}

.scale.variant-{0} {{
    background-color: transparent;

    & trough {{
        background-color: {7};

        & highlight, progress {{ background-color: {8} }}
    }}
}}\n"""

customVariants = {
    "ghost-light": [
        "rgba(255, 255, 255, 0)", f"${mainTextColor}",
        "rgba(255, 255, 255, 0.1)", f"${mainTextColor}",
        "rgba(255, 255, 255, 0.2)", f"${mainTextColor}",
        "rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)",
    ],
    "ghost-dark": [
        "rgba(0, 0, 0, 0)", f"${mainSurfaceColor}",
        "rgba(0, 0, 0, 0.1)", f"${mainSurfaceColor}",
        "rgba(0, 0, 0, 0.2)", f"${mainSurfaceColor}",
        "rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)",
    ],
}

# build everything
for field in fields(flavour):
    color = getattr(flavour, field.name)
    colorBuilder += colorBuilderFormat.format(field.name, f"#{color.hex}")
    textBuilder += textBuilderFormat.format(field.name, f"${field.name}")
    bgBuilder += bgBuilderFormat.format(field.name, f"${field.name}")

    isSurfaceColor = any(t in field.name for t in ["base", "mantle", "crust", "surface", "overlay"])
    bgColor = f"${field.name}"
    textColor = f"${mainTextColor if isSurfaceColor else mainSurfaceColor}"

    if "text" in field.name:
        continue

    variantBuilder += variantBuilderFormat.format(
        field.name,
        bgColor, textColor,
        f"shade({bgColor}, 0.95)", textColor,
        f"shade({bgColor}, 0.9)", textColor,
        f"${altSurfaceColor}", bgColor)

# add custom variants
for name, variant in customVariants.items():
    variantBuilder += variantBuilderFormat.format(name, *variant)

builder = f"""/* inspired by the Tailwind Framework & Skeleton UI Toolkit :) */

/* Colors */
{colorBuilder}

/* Background colors */
{bgBuilder}

/* Text colors */
{textBuilder}

/* Variants */
{variantBuilder}"""

print(builder)

