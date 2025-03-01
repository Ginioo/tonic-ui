import get from './get';
import { toCSSVariable } from './css-vars';

// Check if a value is a simple CSS variable
// e.g. var(--tonic-spacing-1)
const isSimpleCSSVariable = (value) => {
  const re = /^var\(\s*([a-zA-Z0-9\-_]+)\s*\)$/;
  return re.test(String(value ?? '').trim());
};

// Negate the value, handling CSS variables and numeric values
const toNegativeValue = (scale, absoluteValue, options) => {
  const theme = options?.props?.theme;
  const n = getter(scale, absoluteValue, options);

  // Handle CSS variables for negative values
  if (!!theme?.cssVariables && isSimpleCSSVariable(n)) {
    // https://stackoverflow.com/questions/49469344/using-negative-css-custom-properties
    return `calc(0px - ${n})`;
  }

  // Handle numeric value
  if (typeof n === 'number' && Number.isFinite(n)) {
    return n * -1;
  }

  return `-${n}`;
};

export const getter = (scale, value, options) => {
  const result = get(scale, value);
  if (result === undefined) {
    return value; // fallback to value if result is undefined
  }

  const theme = options?.props?.theme;
  // FIXME: `theme.config.prefix` and `theme.__cssVariableMap` are deprecated and will be removed in the next major release
  const hasCSSVariables = !!(theme?.cssVariables ?? theme?.__cssVariableMap);
  if (hasCSSVariables) {
    const cssVariablePrefix = (theme?.cssVariablePrefix) ?? (theme?.config?.prefix);
    const cssVariables = (theme?.cssVariables) ?? (theme?.__cssVariableMap);
    const contextScale = options?.context?.scale;
    const cssVariable = toCSSVariable(
      // | contextScale | value     |
      // | ------------ | --------- |
      // | colors       | 'blue:50' |
      // | space        | 0         |
      [contextScale, String(value ?? '')].filter(Boolean).join('.'), // => 'colors.blue:50'
      { prefix: cssVariablePrefix, delimiter: '-' },
    ); // => '--tonic-colors-blue-50'
    const cssVariableValue = cssVariables?.[cssVariable]; // => '#578aef'
    if (cssVariableValue !== undefined) {
      // => Replace '#578aef' with 'var(--tonic-colors-blue-50)'
      return String(result ?? '').replaceAll(cssVariableValue, `var(${cssVariable})`);
    }
    // fallback to the original result
  }

  return result;
};

export const positiveOrNegative = (scale, value, options) => {
  /**
   * Scale object
   *
   * ```js
   * {
   *   '1x': '0.25rem',
   *   '2x': 8,
   * }
   * ```
   *
   * Example
   *
   * ```jsx
   * <Box margin="1x" />
   * // => margin: 0.25rem
   * <Box margin="2x" />
   * // => margin: 8px
   * <Box margin="-1x" />
   * // => margin: -0.25rem
   * <Box margin="-2x" />
   * // => margin: -8px
   * ```
   */
  if (typeof value === 'string') {
    const absoluteValue = (value.startsWith('+') || value.startsWith('-')) ? value.slice(1) : value;
    const isNonNegative = !value.startsWith('-');

    // Return the result if the value is non-negative or if the scale object does not contain the absolute value
    if (isNonNegative || !Object.prototype.hasOwnProperty.call(scale, absoluteValue)) {
      return getter(scale, value, options);
    }

    return toNegativeValue(scale, absoluteValue, options);
  }

  /**
   * Scale object
   *
   * ```js
   * {
   *   4: '0.25rem',
   *   8: 8,
   * }
   * ```
   *
   * Example
   *
   * ```jsx
   * <Box margin={4} />
   * // => margin: 0.25rem
   * <Box margin={8} />
   * // => margin: 8px
   * <Box margin={-4} />
   * // => margin: -0.25rem
   * <Box margin={-8} />
   * // => margin: -8px
   * ```
   */
  if (typeof value === 'number' && Number.isFinite(value)) {
    const absoluteValue = Math.abs(value);
    const isNonNegative = !(value < 0);

    // Return the result if the value is non-negative or if the scale object does not contain the absolute value
    if (isNonNegative || !Object.prototype.hasOwnProperty.call(scale, absoluteValue)) {
      return getter(scale, value, options);
    }

    return toNegativeValue(scale, absoluteValue, options);
  }

  return getter(scale, value, options);
};
