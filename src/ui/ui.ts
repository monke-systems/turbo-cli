import * as inquirer from "inquirer";
import { Command } from "../types";

export const askCommand = async (): Promise<Command> => {
  const res = await inquirer.prompt([
    {
      name: "command",
      type: "list",
      message: "What can i do for you, druzhok?",
      choices: [
        { name: "Initialize new project", value: Command.GenerateProject },
        { name: "Who am i?", value: Command.Whoami },
      ],
    },
  ]);

  return res.command as Command;
};
