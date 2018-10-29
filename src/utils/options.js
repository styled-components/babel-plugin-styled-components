const getOption = (name, defaultValue = true) => ({ opts }) => {
  return opts[name] === undefined || opts[name] === null
    ? defaultValue
    : opts[name] 
}

export const useDisplayName = getOption('displayName');
export const useSSR = getOption('ssr', true);
export const useFileName = getOption('fileName');
export const useMinify = getOption('minify');
export const useTranspileTemplateLiterals = getOption('transpileTemplateLiterals');
export const usePureAnnotation = getOption('pure', false);
