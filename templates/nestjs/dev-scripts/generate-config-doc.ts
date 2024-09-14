import { generateConfigDoc } from "@monkee/turbo-config";
import { AppConfig } from "../src/app.config";

generateConfigDoc(AppConfig, {
  title: "App config reference",
  writeToFile: "CONFIG_REFERENCE.MD",
});
