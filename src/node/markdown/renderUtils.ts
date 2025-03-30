export function renderTagAttributes (info: string) {
  const parts = info.trim().split(' ');
  const collected = {
    classes: [] as string[],
    id: '',
  }
  parts.forEach(a => {
    if (a.length === 0) {
      return;
    }

    if (a[0] === '.') {
      collected.classes.push(a.substring(1));
      return;
    }

    if (a[0] === '#') {
      collected.id = a.substring(1)
    }
  });

  let result = '';
  if (collected.id) {
    result += ` id="${collected.id}"`;
  }
  if (collected.classes.length > 0) {
    result += ` class="${collected.classes.join(' ')}"`;
  }
  return result;
}
