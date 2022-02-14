export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const readFileContents = async (file: any) => {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.onload = (readerEvent) => {
      resolve(readerEvent!.target!.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  });
};

export const readAllFiles = async (AllFiles: any) => {
  const results = await Promise.all(
    AllFiles.map(async (file: any) => {
      const fileContents = await readFileContents(file);
      return fileContents;
    })
  );
  return results;
};
