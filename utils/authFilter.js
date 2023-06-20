function showNested(explorer, hierarchy, level) {
  let table = "";

  if (explorer.isFolder) {
    if (explorer.visibility) {
      table += `<tr><td style="padding-left: ${level * 20}px;">${hierarchy}${
        explorer.name
      }</td></tr>`;
    }

    if (explorer.items) {
      for (const item of explorer.items) {
        const nestedHierarchy = `${hierarchy}${explorer.name} > `;
        table += showNested(item, nestedHierarchy, level + 1);
      }
    }
  } else {
    if (explorer.visibility) {
      table += `<tr><td style="padding-left: ${level * 20}px;">${hierarchy}${
        explorer.name
      }</td></tr>`;
    }
  }

  return table;
}

module.exports = {
  showNested,
};
