export const flattenArray = (arr: any) => {
  const result: any = [];
  arr.forEach((item: any) => {
    result.push({ name: item.name, isFolder: item.isFolder, id: item.id });
    if (item.children) result.push(...flattenArray(item.children));
  });
  return result;
};

export const getLastId = (treeData: any) => {
  const reversedArray = [...treeData].sort((a, b) => b.id - a.id);
  if (reversedArray.length > 0) {
    return reversedArray[0].id;
  }
  return 0;
};

export const searchTree = (
  element: any,
  matchingTitle: string
): string | null => {
  if (element.name == matchingTitle) {
    return element.id;
  } else if (element.children != null) {
    var i;
    var result = null;
    for (i = 0; result == null && i < element.children.length; i++) {
      result = searchTree(element.children[i], matchingTitle);
    }
    return result;
  }
  return null;
};

export const addDataToId = (arr: any, id: string, children: any) => {
  arr.forEach((i: any) => {
    if (i.id == id) {
      i.children = [...(i.children || []), ...children];
    } else {
      addDataToId(i.children || [], id, children);
    }
  });
};
