import prettierConfig from "../.prettierrc.json" with { type: "json" }

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    ...prettierConfig,

    // https://github.com/trivago/prettier-plugin-sort-imports
    plugins: ["@trivago/prettier-plugin-sort-imports"],
    importOrder: ["^[./]"],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
}

export default config
