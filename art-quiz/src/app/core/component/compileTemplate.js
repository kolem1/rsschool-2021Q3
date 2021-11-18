export default function compileTemplate(template, data) {
  let resultTemplate = template;

  if (data) {
    resultTemplate = resultTemplate.replace(/{{(.*?)}}/g, (str, key) => data[key.trim()] || '');
  }

  return resultTemplate;
}
