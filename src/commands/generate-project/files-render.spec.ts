import { doesNotThrow } from "assert";
import { renderCommonFile } from "./files-render";
import { CommonFile } from "./types";

describe("[filesRender] specs", () => {
  it("Generates correct package.json. One variant of usage.", async () => {
    const result = renderCommonFile({
      type: CommonFile.PackageJson,
      values: {
        packageName: "test-pkg",
        main: "lib/test.js",
        types: "lib/test.d.ts",
        repoUrl: "git://zhopa.ru",
        isPackage: true,
        withTests: true,
      },
    });

    doesNotThrow(() => JSON.parse(result));
  });
});
