const isScriptIndluded = (scriptId: string): boolean => {
  const htmlScripts = document.querySelectorAll(
    'script',
  ) as NodeListOf<HTMLScriptElement>;
  return [...htmlScripts].some((script) => script.id === scriptId);
};

const loadScript = (src: string, async: boolean, scriptId: string) => {
  if (isScriptIndluded(scriptId)) return true;

  return new Promise(function (resolve, reject) {
    const script = document.createElement('script');
    script.src = src;
    script.id = scriptId;
    script.async = async;

    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error(`Script load error: ${src}`));

    document.head.append(script);
  });
};

export { loadScript };
