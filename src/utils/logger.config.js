import log4js from "log4js";

log4js.configure({
  appenders: { 
    appLog: {
      type: "dateFile",
      filename: "app.log",
      pattern: "yyyy-MM-dd",
      numBackups: 14,
      keepFileExt: true
    },
    console: { type: "console" }
  },
  categories: { 
    default: { appenders: ["appLog", "console"], level: "all" } 
  }
});

const logger = log4js.getLogger();

export { logger };