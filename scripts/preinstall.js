if (!/pnpm/.test(process.env.npm_execpath || "")) {
  console.warn(
    `\u001b[33m这个项目必须使用pnpm来进行包管理 ` +
      `请使用pnpm重新进行下载.\u001b[39m\n`
  );
  process.exit(1);
}
