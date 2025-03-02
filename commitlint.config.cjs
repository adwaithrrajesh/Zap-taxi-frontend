module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
      "subject-case": [2, "always", "sentence-case"], // Ensures only the first letter is capitalized
      "type-enum": [
        2,
        "always",
        [
          "feat", // New feature
          "fix",  // Bug fix
          "docs", // Documentation changes
          "style", // Code style changes
          "refactor", // Refactoring
          "perf", // Performance improvements
          "test", // Adding tests
          "chore", // Other changes
        ],
      ],
    },
};