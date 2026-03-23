function isString(val) {
  return typeof val === "string" || val instanceof String;
}

function isNullOrUndefined(val) {
  return typeof val === "undefined" || val === null;
}

/**
 * @see: http://stackoverflow.com/a/36643177/3753724
 */
function getClassName(instance) {
  if ("name" in instance.constructor) {
    return instance.constructor.name;
  }
  return null;
}

export {
  getClassName,
  isNullOrUndefined,
  isString
};
