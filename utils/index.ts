import axios from 'axios';

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

// upload mutil images to cloudary
export const uploadMutilImage = (files: File[]) => {
  const url = 'https://api.cloudinary.com/v1_1/vanba311200/image/upload';
  const filesMap = files.map(async (item) => {
    const formData = new FormData();
    formData.append('file', item);
    formData.append('upload_preset', 'images_tweet');
    const res = await axios.post(url, formData).catch((error) => {
      Promise.reject(error);
    });
    return res?.data.url;
  });
  return Promise.all(filesMap);
};

// validate [TYPE]Image -->
export const validateImage = (files: File[]) => {
  // list type validate
  const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
  let result: boolean = true;

  files.forEach((item) => {
    const fileType = item['type'];
    if (!validImageTypes.includes(fileType)) {
      result = false;
      return false;
    }
  });

  return result;
};

// show popup window center screen
export function popupwindow(url: string, w: number = 500, h: number = 600) {
  var y = window.outerHeight / 2 + window.screenY - h / 2;
  var x = window.outerWidth / 2 + window.screenX - w / 2;
  return window.open(
    url,
    '_self',
    'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=auto, resizable=no, copyhistory=no, width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      y +
      ', left=' +
      x
  );
}
