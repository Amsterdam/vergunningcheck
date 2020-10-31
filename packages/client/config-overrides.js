const {
  removeModuleScopePlugin,
  override,
  babelInclude,
} = require("customize-cra");
const path = require("path");

// We need to also transform typescript from the imtr_client dependency
module.exports = override(
  removeModuleScopePlugin(),
  babelInclude([
    path.resolve("src"),
    path.resolve("../@vergunningcheck/imtr_client"),
  ])
);
