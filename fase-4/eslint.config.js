import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import neostandard from "neostandard";

export default [
  { ignores: ["dist"] },
  ...neostandard({
    ts: true,
    env: ["browser"],
    // Formatação (aspas, ponto e vírgula, indentação) fica com o Prettier —
    // ver .prettierrc — para não ter duas ferramentas brigando pelo mesmo
    // estilo de código.
    noStyle: true,
    semi: true,
  }),
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
